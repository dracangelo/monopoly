from django.db import models

class Bank(models.Model):
    total_money = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return "Bank"
