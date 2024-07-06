from django.urls import path, include
from rest_framework.routers import DefaultRouter
from game.views import PlayerViewSet, PropertyViewSet, StockViewSet, BankViewSet, BoardViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'banks', BankViewSet)
router.register(r'board', BoardViewSet)  

urlpatterns = [
    path('', include(router.urls)),
]
