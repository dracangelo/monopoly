from django.core.management.base import BaseCommand
from game.models.property import Property
from game.models.tile import Tile

class Command(BaseCommand):
    help = 'Create or update properties and special tiles'

    def handle(self, *args, **kwargs):
        properties_data = [
            {"name": "Mediterranean Avenue", "value": 60, "rent": 2, "house_cost": 50, "hotel_cost": 50, "color_group": "Brown"},
            {"name": "Baltic Avenue", "value": 60, "rent": 4, "house_cost": 50, "hotel_cost": 50, "color_group": "Brown"},
            {"name": "Oriental Avenue", "value": 100, "rent": 6, "house_cost": 50, "hotel_cost": 50, "color_group": "Light Blue"},
            {"name": "Vermont Avenue", "value": 100, "rent": 6, "house_cost": 50, "hotel_cost": 50, "color_group": "Light Blue"},
            {"name": "Connecticut Avenue", "value": 120, "rent": 8, "house_cost": 50, "hotel_cost": 50, "color_group": "Light Blue"},
            {"name": "St. Charles Place", "value": 140, "rent": 10, "house_cost": 100, "hotel_cost": 100, "color_group": "Pink"},
            {"name": "States Avenue", "value": 140, "rent": 10, "house_cost": 100, "hotel_cost": 100, "color_group": "Pink"},
            {"name": "Virginia Avenue", "value": 160, "rent": 12, "house_cost": 100, "hotel_cost": 100, "color_group": "Pink"},
            {"name": "St. James Place", "value": 180, "rent": 14, "house_cost": 100, "hotel_cost": 100, "color_group": "Orange"},
            {"name": "Tennessee Avenue", "value": 180, "rent": 14, "house_cost": 100, "hotel_cost": 100, "color_group": "Orange"},
            {"name": "New York Avenue", "value": 200, "rent": 16, "house_cost": 100, "hotel_cost": 100, "color_group": "Orange"},
            {"name": "Kentucky Avenue", "value": 220, "rent": 18, "house_cost": 150, "hotel_cost": 150, "color_group": "Red"},
            {"name": "Indiana Avenue", "value": 220, "rent": 18, "house_cost": 150, "hotel_cost": 150, "color_group": "Red"},
            {"name": "Illinois Avenue", "value": 240, "rent": 20, "house_cost": 150, "hotel_cost": 150, "color_group": "Red"},
            {"name": "Atlantic Avenue", "value": 260, "rent": 22, "house_cost": 150, "hotel_cost": 150, "color_group": "Yellow"},
            {"name": "Ventnor Avenue", "value": 260, "rent": 22, "house_cost": 150, "hotel_cost": 150, "color_group": "Yellow"},
            {"name": "Marvin Gardens", "value": 280, "rent": 24, "house_cost": 150, "hotel_cost": 150, "color_group": "Yellow"},
            {"name": "Pacific Avenue", "value": 300, "rent": 26, "house_cost": 200, "hotel_cost": 200, "color_group": "Green"},
            {"name": "North Carolina Avenue", "value": 300, "rent": 26, "house_cost": 200, "hotel_cost": 200, "color_group": "Green"},
            {"name": "Pennsylvania Avenue", "value": 320, "rent": 28, "house_cost": 200, "hotel_cost": 200, "color_group": "Green"},
            {"name": "Park Place", "value": 350, "rent": 35, "house_cost": 200, "hotel_cost": 200, "color_group": "Dark Blue"},
            {"name": "Boardwalk", "value": 400, "rent": 50, "house_cost": 200, "hotel_cost": 200, "color_group": "Dark Blue"},
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
