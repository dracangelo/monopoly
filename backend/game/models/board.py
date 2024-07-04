from django.db import models
from game.models.tile import Tile

class Board(models.Model):
    tiles = models.ManyToManyField(Tile)

    def __str__(self):
        return "Monopoly Board"
