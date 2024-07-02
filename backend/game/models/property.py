from django.db import models

class Property(models.Model):
    name = models.CharField(max_length=100)
    color_group = models.CharField(max_length=50)
    purchase_price = models.IntegerField()
    base_rent = models.IntegerField()
    house_cost = models.IntegerField()
    hotel_cost = models.IntegerField()
    owner = models.ForeignKey('Player', on_delete=models.SET_NULL, null=True, blank=True)
    houses = models.IntegerField(default=0)
    hotels = models.IntegerField(default=0)

    def calculate_rent(self):
        if self.hotels > 0:
            return self.base_rent * 5  # Example: rent increases 5x with a hotel
        elif self.houses > 0:
            return self.base_rent * (1 + self.houses)  # Rent increases with each house
        else:
            return self.base_rent

    def __str__(self):
        return self.name
