from rest_framework import viewsets, status 
from rest_framework.decorators import action 
from rest_framework.response import Response 
from game.models import Property, Player, Stock, Bank, Tile
from game.serializers import PlayerSerializer, PropertySerializer, StockSerializer, BankSerializer, BoardSerializer, TileSerializer
from game.utils.game_logic import (buy_house, buy_hotel, charge_rent, trade_properties, random_gambling,
                                   buy_stock, sell_stock, player_turn, pay_jail_bail, pay_tax,
                                   borrow_from_bank, pay_mortgage)
from rest_framework.views import APIView 
from asgiref.sync import async_to_sync 
from channels.layers import get_channel_layer
from django.views import View
from django.http import JsonResponse
import random
from django.shortcuts import get_object_or_404

def send_game_update(message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'game_updates',
        {
            'type': 'send_game_update',
            'message': message
        }
    )

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=True, methods=['post'])
    def take_turn(self, request, pk=None):
        player = Player.objects.get(id=pk)
        steps = request.data['steps']
        success, message = player_turn(player, steps)
        if success:
            send_game_update({
                'type': 'turn_update',
                'player_id': player.id,
                'steps': steps,
                'position': player.position,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def pay_bail(self, request, pk=None):
        player = Player.objects.get(id=pk)
        success, message = pay_jail_bail(player)
        if success:
            send_game_update({
                'type': 'balance_update',
                'player_id': player.id,
                'balance': player.balance,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def pay_tax(self, request, pk=None):
        player = Player.objects.get(id=pk)
        tax_amount = request.data['tax_amount']
        success, message = pay_tax(player, tax_amount)
        if success:
            send_game_update({
                'type': 'balance_update',
                'player_id': player.id,
                'balance': player.balance,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def buy_house(self, request, pk=None):
        player = Player.objects.get(id=pk)
        property_id = request.data['property_id']
        property = Property.objects.get(id=property_id)
        success, message = buy_house(player, property)
        if success:
            send_game_update({
                'type': 'property_update',
                'player_id': player.id,
                'property_id': property.id,
                'houses': property.houses,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def buy_hotel(self, request, pk=None):
        player = Player.objects.get(id=pk)
        property_id = request.data['property_id']
        property = Property.objects.get(id=property_id)
        success, message = buy_hotel(player, property)
        if success:
            send_game_update({
                'type': 'property_update',
                'player_id': player.id,
                'property_id': property.id,
                'hotels': property.hotel,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def buy_stock(self, request, pk=None):
        player = Player.objects.get(id=pk)
        stock_id = request.data['stock_id']
        amount = request.data['amount']
        stock = Stock.objects.get(id=stock_id)
        success, message = buy_stock(player, stock, amount)
        if success:
            send_game_update({
                'type': 'stock_update',
                'player_id': player.id,
                'stock_id': stock.id,
                'amount': amount,
                'balance': player.balance,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def sell_stock(self, request, pk=None):
        player = Player.objects.get(id=pk)
        stock_id = request.data['stock_id']
        amount = request.data['amount']
        stock = Stock.objects.get(id=stock_id)
        success, message = sell_stock(player, stock, amount)
        if success:
            send_game_update({
                'type': 'stock_update',
                'player_id': player.id,
                'stock_id': stock.id,
                'amount': -amount,  # Negative amount for selling
                'balance': player.balance,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def borrow_from_bank(self, request, pk=None):
        player = Player.objects.get(id=pk)
        amount = request.data['amount']
        success, message = borrow_from_bank(player, amount)
        if success:
            send_game_update({
                'type': 'balance_update',
                'player_id': player.id,
                'balance': player.balance,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def pay_mortgage(self, request, pk=None):
        player = Player.objects.get(id=pk)
        property_id = request.data['property_id']
        property = Property.objects.get(id=property_id)
        success, message = pay_mortgage(player, property)
        if success:
            send_game_update({
                'type': 'balance_update',
                'player_id': player.id,
                'balance': player.balance,
            })
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

def roll_dice(request):
    if request.method == 'GET':
        dice_1 = random.randint(1, 6)
        dice_2 = random.randint(1, 6)
        result = {
            'dice_1': dice_1,
            'dice_2': dice_2,
            'total': dice_1 + dice_2
        }
        return JsonResponse(result)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
def player_detail(request, player_id):
    player = get_object_or_404(Player, id=player_id)
    data = {
        'name': player.name,
        'balance': player.balance,
        'position': player.position,
        'properties': list(player.properties.values()),
        'mortgagedProperties': list(player.mortgaged_properties.values())
    }
    return JsonResponse(data)
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BoardView(View):
    def get(self, request):
        tiles = Tile.objects.all().values()
        tiles_list = list(tiles)
        return JsonResponse(tiles_list, safe=False)
    
class TileViewSet(viewsets.ModelViewSet):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer