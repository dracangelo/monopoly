from django.db import models

class Property(models.Model):
    name = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey('Player', on_delete=models.SET_NULL, null=True, blank=True)
    houses = models.IntegerField(default=0)
    hotel = models.BooleanField(default=False)

    def __str__(self):
        return self.name
