from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet, PropertyViewSet, BankViewSet, StockViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'banks', BankViewSet)
router.register(r'stocks', StockViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
