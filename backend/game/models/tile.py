from django.db import models
from .property import Property

class Tile(models.Model):
    TILE_TYPE_CHOICES = [
        ('go', 'GO'),
        ('property', 'Property'),
        ('community_chest', 'Community Chest'),
        ('chance', 'Chance'),
        ('tax', 'Tax'),
        ('corner', 'Corner'),
        ('special', 'Special'),
        ('casino', 'Casino'),
        ('stocks', 'Stocks'),
    ]

    position = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    tile_type = models.CharField(max_length=20, choices=TILE_TYPE_CHOICES)
    property = models.ForeignKey(Property, null=True, blank=True, on_delete=models.SET_NULL, related_name='tiles')

    def __str__(self):
        return f"{self.name} ({self.position})"
