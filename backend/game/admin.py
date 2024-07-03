from django.contrib import admin
from .models import Player, Property, Stock, Bank

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'balance', 'position', 'in_jail')
    search_fields = ('name',)

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'color_group', 'price', 'owner', 'house_count', 'hotel_count')
    search_fields = ('name',)
    list_filter = ('color_group',)

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'owner')
    search_fields = ('name',)

@admin.register(Bank)
class BankAdmin(admin.ModelAdmin):
    list_display = ('id', 'balance')
