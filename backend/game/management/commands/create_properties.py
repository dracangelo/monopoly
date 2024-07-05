from django.core.management.base import BaseCommand
from game.models import Property, Tile

class Command(BaseCommand):
    help = 'Create sample properties for the Monopoly game'

    def handle(self, *args, **kwargs):
        properties_data = [
            {"name": "Mediterranean Avenue", "value": 60, "rent": 2, "house_cost": 50, "hotel_cost": 50, "position": 1},
            {"name": "Baltic Avenue", "value": 60, "rent": 4, "house_cost": 50, "hotel_cost": 50, "position": 3},
            {"name": "Oriental Avenue", "value": 100, "rent": 6, "house_cost": 50, "hotel_cost": 50, "position": 6},
            {"name": "Vermont Avenue", "value": 100, "rent": 6, "house_cost": 50, "hotel_cost": 50, "position": 8},
            {"name": "Connecticut Avenue", "value": 120, "rent": 8, "house_cost": 50, "hotel_cost": 50, "position": 9},
            {"name": "St. Charles Place", "value": 140, "rent": 10, "house_cost": 100, "hotel_cost": 100, "position": 11},
            {"name": "States Avenue", "value": 140, "rent": 10, "house_cost": 100, "hotel_cost": 100, "position": 13},
            {"name": "Virginia Avenue", "value": 160, "rent": 12, "house_cost": 100, "hotel_cost": 100, "position": 14},
            {"name": "St. James Place", "value": 180, "rent": 14, "house_cost": 100, "hotel_cost": 100, "position": 16},
            {"name": "Tennessee Avenue", "value": 180, "rent": 14, "house_cost": 100, "hotel_cost": 100, "position": 18},
            {"name": "New York Avenue", "value": 200, "rent": 16, "house_cost": 100, "hotel_cost": 100, "position": 19},
            {"name": "Kentucky Avenue", "value": 220, "rent": 18, "house_cost": 150, "hotel_cost": 150, "position": 21},
            {"name": "Indiana Avenue", "value": 220, "rent": 18, "house_cost": 150, "hotel_cost": 150, "position": 23},
            {"name": "Illinois Avenue", "value": 240, "rent": 20, "house_cost": 150, "hotel_cost": 150, "position": 24},
            {"name": "Atlantic Avenue", "value": 260, "rent": 22, "house_cost": 150, "hotel_cost": 150, "position": 26},
            {"name": "Ventnor Avenue", "value": 260, "rent": 22, "house_cost": 150, "hotel_cost": 150, "position": 27},
            {"name": "Marvin Gardens", "value": 280, "rent": 24, "house_cost": 150, "hotel_cost": 150, "position": 29},
            {"name": "Pacific Avenue", "value": 300, "rent": 26, "house_cost": 200, "hotel_cost": 200, "position": 31},
            {"name": "North Carolina Avenue", "value": 300, "rent": 26, "house_cost": 200, "hotel_cost": 200, "position": 32},
            {"name": "Pennsylvania Avenue", "value": 320, "rent": 28, "house_cost": 200, "hotel_cost": 200, "position": 34},
            {"name": "Park Place", "value": 350, "rent": 35, "house_cost": 200, "hotel_cost": 200, "position": 37},
            {"name": "Boardwalk", "value": 400, "rent": 50, "house_cost": 200, "hotel_cost": 200, "position": 39}
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
                defaults={'property': property_obj}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Property "{property_data["name"]}" created successfully'))
            else:
                self.stdout.write(self.style.WARNING(f'Property "{property_data["name"]}" already exists'))
