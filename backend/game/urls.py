from django.urls import path, include
from rest_framework.routers import DefaultRouter
from game.views import PlayerViewSet, PropertyViewSet, StockViewSet, BankViewSet, BoardView, TileViewSet
from .views import roll_dice
from game.routes.tile_routes import TileListView

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'banks', BankViewSet)
router.register(r'tiles', TileViewSet)

# Define the URL patterns
urlpatterns = [
    path('', include(router.urls)),  
    path('board/', BoardView.as_view(), name='board'),
    path('roll_dice/', roll_dice, name='roll_dice'),
    path('tiles/', TileListView.as_view(), name='tile-list'),
]
