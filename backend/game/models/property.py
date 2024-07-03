from django.db import models
from game.models.player import Player

class Property(models.Model):
    COLOR_GROUP_CHOICES = [
        ('Brown', 'Brown'),
        ('Light Blue', 'Light Blue'),
        ('Pink', 'Pink'),
        ('Orange', 'Orange'),
        ('Red', 'Red'),
        ('Yellow', 'Yellow'),
        ('Green', 'Green'),
        ('Dark Blue', 'Dark Blue'),
    ]

    name = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True, blank=True)
    houses = models.IntegerField(default=0)
    hotel = models.BooleanField(default=False)
    color_group = models.CharField(max_length=20, choices=COLOR_GROUP_CHOICES, default='Brown')

    def __str__(self):
        return self.name
