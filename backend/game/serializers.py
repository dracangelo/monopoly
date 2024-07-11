from rest_framework import serializers
from game.models import Player, Property, Stock, Bank, Board, Space, Tile

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'

class SpaceSerializer(serializers.ModelSerializer):
    property = PropertySerializer()

    class Meta:
        model = Space
        fields = '__all__'

class BoardSerializer(serializers.ModelSerializer):
    spaces = SpaceSerializer(many=True)

    class Meta:
        model = Board
        fields = '__all__'

class TileSerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True)

    class Meta:
        model = Tile
        fields = '__all__'