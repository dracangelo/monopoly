from django.urls import path, include
from rest_framework.routers import DefaultRouter
from game.views import PlayerViewSet, PropertyViewSet, StockViewSet, BankViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'bank', BankViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
