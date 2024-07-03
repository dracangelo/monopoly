from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from game.models import Property, Player, Stock, Bank
from game.serializers import PlayerSerializer, PropertySerializer, StockSerializer, BankSerializer
from game.utils.game_logic import (buy_house, buy_hotel, charge_rent, trade_properties, random_gambling,
                                   buy_stock, sell_stock, player_turn, pay_jail_bail, pay_tax,
                                   borrow_from_bank, pay_mortgage)

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=True, methods=['post'])
    def take_turn(self, request, pk=None):
        player = Player.objects.get(id=pk)
        steps = request.data['steps']
        success, message = player_turn(player, steps)
        if success:
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def pay_bail(self, request, pk=None):
        player = Player.objects.get(id=pk)
        success, message = pay_jail_bail(player)
        if success:
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def pay_tax(self, request, pk=None):
        player = Player.objects.get(id=pk)
        tax_amount = request.data['tax_amount']
        success, message = pay_tax(player, tax_amount)
        if success:
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
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def borrow_from_bank(self, request, pk=None):
        player = Player.objects.get(id=pk)
        amount = request.data['amount']
        success, message = borrow_from_bank(player, amount)
        if success:
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
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
