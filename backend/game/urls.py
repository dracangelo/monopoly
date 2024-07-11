from django.urls import path, include
from rest_framework.routers import DefaultRouter
from game.views import PlayerViewSet, PropertyViewSet, StockViewSet, BankViewSet, BoardView

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'banks', BankViewSet)

# Define the URL patterns
urlpatterns = [
    path('', include(router.urls)),  
    path('board/', BoardView.as_view(), name='board'),  
]
