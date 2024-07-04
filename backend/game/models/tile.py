from django.db import models

class Tile(models.Model):
    name = models.CharField(max_length=255)
    position = models.IntegerField(unique=True)  # Position on the board (0-39 for standard Monopoly)
    tile_type = models.CharField(max_length=50)  # e.g., 'property', 'chance', 'community_chest', 'go', etc.
    property = models.OneToOneField('Property', null=True, blank=True, on_delete=models.SET_NULL)  # Only for property tiles

    def __str__(self):
        return f"{self.position}: {self.name} ({self.tile_type})"
