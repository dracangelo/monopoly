from django.db import models
from game.models.property import Property

class Board(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Space(models.Model):
    SPACE_TYPES = [
        ('GO', 'GO'),
        ('PROPERTY', 'Property'),
        ('CHANCE', 'Chance'),
        ('COMMUNITY_CHEST', 'Community Chest'),
        ('TAX', 'Tax'),
        ('JAIL', 'Jail'),
        ('FREE_PARKING', 'Free Parking'),
        ('GO_TO_JAIL', 'Go to Jail'),
        ('UTILITY', 'Utility'),
        ('RAILROAD', 'Railroad')
    ]

    board = models.ForeignKey(Board, related_name='spaces', on_delete=models.CASCADE)
    position = models.PositiveIntegerField()  # Position on the board
    space_type = models.CharField(max_length=20, choices=SPACE_TYPES)
    name = models.CharField(max_length=255, blank=True, null=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return f"{self.position}: {self.name or self.space_type}"
