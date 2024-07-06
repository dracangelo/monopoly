from django.db import models
from game.models.board import Board

class Space(models.Model):
    name = models.CharField(max_length=100)
    position = models.IntegerField()
    board = models.ForeignKey(Board, related_name='spaces', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
