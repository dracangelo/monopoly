from django.core.management.base import BaseCommand
from game.models import Property, Tile

class Command(BaseCommand):
    help = 'Create sample properties for the Monopoly game'

    def handle(self, *args, **kwargs):
        properties_data = [
            {"name": "Mediterranean Avenue", "value": 60, "rent": 2, "house_cost": 50, "hotel_cost": 50, "position": 1},
            {"name": "Baltic Avenue", "value": 60, "rent": 4, "house_cost": 50, "hotel_cost": 50, "position": 3},
            # Add more properties as needed
        ]

        for property_data in properties_data:
            property_obj, created = Property.objects.get_or_create(
                name=property_data["name"],
                defaults={
                    "value": property_data["value"],
                    "rent": property_data["rent"],
                    "house_cost": property_data["house_cost"],
                    "hotel_cost": property_data["hotel_cost"]
                }
            )
            Tile.objects.get_or_create(
                name=property_data["name"],
                position=property_data["position"],
                tile_type='property',
                property=property_obj
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Property "{property_data["name"]}" created successfully'))
            else:
                self.stdout.write(self.style.WARNING(f'Property "{property_data["name"]}" already exists'))
