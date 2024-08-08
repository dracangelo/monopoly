from django.core.management.base import BaseCommand
from game.models.property import Property
from game.models.tile import Tile

class Command(BaseCommand):
    help = 'Create or update properties and special tiles'

    def handle(self, *args, **kwargs):
        properties_data = [
            {"name": "Mediterranean Avenue", "value": 600000, "rent": 20000, "house_cost": 500000, "hotel_cost": 500000, "color_group": "Brown"},
            {"name": "Baltic Avenue", "value": 600000, "rent": 40000, "house_cost": 500000, "hotel_cost": 500000, "color_group": "Brown"},
            {"name": "Oriental Avenue", "value": 1000000, "rent": 60000, "house_cost": 500000, "hotel_cost": 500000, "color_group": "Light Blue"},
            {"name": "Vermont Avenue", "value": 1000000, "rent": 60000, "house_cost": 500000, "hotel_cost": 500000, "color_group": "Light Blue"},
            {"name": "Connecticut Avenue", "value": 1200000, "rent": 80000, "house_cost": 500000, "hotel_cost": 500000, "color_group": "Light Blue"},
            {"name": "St. Charles Place", "value": 1400000, "rent": 100000, "house_cost": 1000000, "hotel_cost": 1000000, "color_group": "Pink"},
            {"name": "States Avenue", "value": 1400000, "rent": 100000, "house_cost": 1000000, "hotel_cost": 1000000, "color_group": "Pink"},
            {"name": "Virginia Avenue", "value": 1600000, "rent": 120000, "house_cost": 1000000, "hotel_cost": 1000000, "color_group": "Pink"},
            {"name": "St. James Place", "value": 1800000, "rent": 140000, "house_cost": 1000000, "hotel_cost": 1000000, "color_group": "Orange"},
            {"name": "Tennessee Avenue", "value": 1800000, "rent": 140000, "house_cost": 1000000, "hotel_cost": 1000000, "color_group": "Orange"},
            {"name": "New York Avenue", "value": 2000000, "rent": 160000, "house_cost": 1000000, "hotel_cost": 1000000, "color_group": "Orange"},
            {"name": "Kentucky Avenue", "value": 2200000, "rent": 180000, "house_cost": 1500000, "hotel_cost": 1500000, "color_group": "Red"},
            {"name": "Indiana Avenue", "value": 2200000, "rent": 180000, "house_cost": 1500000, "hotel_cost": 1500000, "color_group": "Red"},
            {"name": "Illinois Avenue", "value": 2400000, "rent": 200000, "house_cost": 1500000, "hotel_cost": 1500000, "color_group": "Red"},
            {"name": "Atlantic Avenue", "value": 2600000, "rent": 220000, "house_cost": 1500000, "hotel_cost": 1500000, "color_group": "Yellow"},
            {"name": "Ventnor Avenue", "value": 2600000, "rent": 220000, "house_cost": 1500000, "hotel_cost": 1500000, "color_group": "Yellow"},
            {"name": "Marvin Gardens", "value": 2800000, "rent": 240000, "house_cost": 1500000, "hotel_cost": 1500000, "color_group": "Yellow"},
            {"name": "Pacific Avenue", "value": 3000000, "rent": 260000, "house_cost": 2000000, "hotel_cost": 2000000, "color_group": "Green"},
            {"name": "North Carolina Avenue", "value": 3000000, "rent": 260000, "house_cost": 2000000, "hotel_cost": 2000000, "color_group": "Green"},
            {"name": "Pennsylvania Avenue", "value": 3200000, "rent": 280000, "house_cost": 2000000, "hotel_cost": 2000000, "color_group": "Green"},
            {"name": "Park Place", "value": 3500000, "rent": 350000, "house_cost": 2000000, "hotel_cost": 2000000, "color_group": "Dark Blue"},
            {"name": "Boardwalk", "value": 4000000, "rent": 500000, "house_cost": 2000000, "hotel_cost": 2000000, "color_group": "Dark Blue"},
        ]

        special_tiles_data = [
            {"name": "GO", "tile_type": "go", "position": 0},
            {"name": "Casino", "tile_type": "casino", "position": 2},
            {"name": "Income Tax", "tile_type": "tax", "position": 4},
            {"name": "Reading Railroad", "tile_type": "property", "position": 5},
            {"name": "Chance", "tile_type": "chance", "position": 7},
            {"name": "Jail", "tile_type": "corner", "position": 10},
            {"name": "Trade", "tile_type": "special", "position": 12},
            {"name": "Pennsylvania Railroad", "tile_type": "property", "position": 15},
            {"name": "Community Chest", "tile_type": "community_chest", "position": 17},
            {"name": "Free Parking", "tile_type": "corner", "position": 20},
            {"name": "Chance", "tile_type": "chance", "position": 22},
            {"name": "B. & O. Railroad", "tile_type": "property", "position": 25},
            {"name": "Water Works", "tile_type": "special", "position": 28},
            {"name": "Go To Jail", "tile_type": "corner", "position": 30},
            {"name": "Community Chest", "tile_type": "community_chest", "position": 33},
            {"name": "Short Line", "tile_type": "property", "position": 35},
            {"name": "Chance", "tile_type": "chance", "position": 36},
            {"name": "Luxury Tax", "tile_type": "tax", "position": 38},
        ]

        for data in properties_data:
            property, created = Property.objects.update_or_create(
                name=data["name"],
                defaults={
                    "value": data["value"],
                    "rent": data["rent"],
                    "house_cost": data["house_cost"],
                    "hotel_cost": data["hotel_cost"],
                    "color_group": data["color_group"]
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created property: {data["name"]}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Updated property: {data["name"]}'))

        for data in special_tiles_data:
            tile, created = Tile.objects.update_or_create(
                position=data["position"],
                defaults={
                    "name": data["name"],
                    "tile_type": data["tile_type"],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created tile: {data["name"]}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Updated tile: {data["name"]}'))

        self.stdout.write(self.style.SUCCESS('Successfully created or updated properties and special tiles.'))
