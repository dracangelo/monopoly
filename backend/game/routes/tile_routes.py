from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from game.models.tile import Tile
from game.serializers import TileSerializer

class TileListView(APIView):
    def get(self, request):
        tiles = Tile.objects.all().order_by('position')
        serializer = TileSerializer(tiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
