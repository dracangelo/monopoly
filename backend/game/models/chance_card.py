from django.db import models

class ChanceCard(models.Model):
    description = models.CharField(max_length=255)
    effect = models.CharField(max_length=255)  # This will store the effect, e.g., "gain_money", "lose_money"
    value = models.DecimalField(max_digits=10, decimal_places=2)  # This can be the amount of money gained or lost

    def __str__(self):
        return self.description
