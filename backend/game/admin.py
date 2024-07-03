from django.contrib import admin
from game.models.player import Player
from game.models.property import Property
from game.models.stock import Stock
from game.models.bank import Bank

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'balance', 'position', 'in_jail', 'debt')
    search_fields = ('name',)

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'value', 'rent', 'owner', 'color_group', 'houses', 'hotel')
    search_fields = ('name',)
    list_filter = ('owner', 'color_group')

    def owner(self, obj):
        return obj.owner.name if obj.owner else None

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')
    search_fields = ('name',)

@admin.register(Bank)
class BankAdmin(admin.ModelAdmin):
    list_display = ('id', 'balance', 'interest_rate', 'mortgage_rate')
