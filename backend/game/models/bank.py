from django.db import models

class Bank(models.Model):
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=50000)
    interest_rate = models.FloatField(default=0.05)
    mortgage_rate = models.FloatField(default=0.04)

    def __str__(self):
        return "Bank"
