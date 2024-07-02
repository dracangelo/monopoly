from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models.player import Player
from .models.property import Property
from .models.bank import Bank
from .models.stock import Stock
from .serializers import PlayerSerializer, PropertySerializer, BankSerializer, StockSerializer
import random

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=True, methods=['post'])
    def gamble(self, request, pk=None):
        player = self.get_object()
        outcome = random.choices(['win', 'lose'], weights=[0.3, 0.7], k=1)[0]
        amount = random.randint(50, 500)
        if outcome == 'win':
            player.balance += amount
            description = f'Gambling win of ${amount}'
        else:
            player.balance -= amount
            description = f'Gambling loss of ${amount}'
        player.save()
        return Response({'outcome': outcome, 'amount': amount})

#property
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

#bank
class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

#stock
class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer