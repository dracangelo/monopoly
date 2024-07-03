from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=1500)
    position = models.IntegerField(default=0)
    in_jail = models.BooleanField(default=False)
    debt = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # New field for borrowing

    def __str__(self):
        return self.name
