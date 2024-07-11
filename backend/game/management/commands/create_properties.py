from django.core.management.base import BaseCommand
from game.models import Property, Tile

class Command(BaseCommand):
    help = 'Create sample properties and special tiles for the Monopoly game'

    def handle(self, *args, **kwargs):
        properties_data = [
            {"name": "Mediterranean Avenue", "value": 60, "rent": 2, "house_cost": 50, "hotel_cost": 50, "position": 1, "color_group": "Brown"},
            {"name": "Baltic Avenue", "value": 60, "rent": 4, "house_cost": 50, "hotel_cost": 50, "position": 3, "color_group": "Brown"},
            {"name": "Oriental Avenue", "value": 100, "rent": 6, "house_cost": 50, "hotel_cost": 50, "position": 6, "color_group": "Light Blue"},
            {"name": "Vermont Avenue", "value": 100, "rent": 6, "house_cost": 50, "hotel_cost": 50, "position": 8, "color_group": "Light Blue"},
            {"name": "Connecticut Avenue", "value": 120, "rent": 8, "house_cost": 50, "hotel_cost": 50, "position": 9, "color_group": "Light Blue"},
            {"name": "St. Charles Place", "value": 140, "rent": 10, "house_cost": 100, "hotel_cost": 100, "position": 11, "color_group": "Pink"},
            {"name": "States Avenue", "value": 140, "rent": 10, "house_cost": 100, "hotel_cost": 100, "position": 13, "color_group": "Pink"},
            {"name": "Virginia Avenue", "value": 160, "rent": 12, "house_cost": 100, "hotel_cost": 100, "position": 14, "color_group": "Pink"},
            {"name": "St. James Place", "value": 180, "rent": 14, "house_cost": 100, "hotel_cost": 100, "position": 16, "color_group": "Orange"},
            {"name": "Tennessee Avenue", "value": 180, "rent": 14, "house_cost": 100, "hotel_cost": 100, "position": 18, "color_group": "Orange"},
            {"name": "New York Avenue", "value": 200, "rent": 16, "house_cost": 100, "hotel_cost": 100, "position": 19, "color_group": "Orange"},
            {"name": "Kentucky Avenue", "value": 220, "rent": 18, "house_cost": 150, "hotel_cost": 150, "position": 21, "color_group": "Red"},
            {"name": "Indiana Avenue", "value": 220, "rent": 18, "house_cost": 150, "hotel_cost": 150, "position": 23, "color_group": "Red"},
            {"name": "Illinois Avenue", "value": 240, "rent": 20, "house_cost": 150, "hotel_cost": 150, "position": 24, "color_group": "Red"},
            {"name": "Atlantic Avenue", "value": 260, "rent": 22, "house_cost": 150, "hotel_cost": 150, "position": 26, "color_group": "Yellow"},
            {"name": "Ventnor Avenue", "value": 260, "rent": 22, "house_cost": 150, "hotel_cost": 150, "position": 27, "color_group": "Yellow"},
            {"name": "Marvin Gardens", "value": 280, "rent": 24, "house_cost": 150, "hotel_cost": 150, "position": 29, "color_group": "Yellow"},
            {"name": "Pacific Avenue", "value": 300, "rent": 26, "house_cost": 200, "hotel_cost": 200, "position": 31, "color_group": "Green"},
            {"name": "North Carolina Avenue", "value": 300, "rent": 26, "house_cost": 200, "hotel_cost": 200, "position": 32, "color_group": "Green"},
            {"name": "Pennsylvania Avenue", "value": 320, "rent": 28, "house_cost": 200, "hotel_cost": 200, "position": 34, "color_group": "Green"},
            {"name": "Park Place", "value": 350, "rent": 35, "house_cost": 200, "hotel_cost": 200, "position": 37, "color_group": "Dark Blue"},
            {"name": "Boardwalk", "value": 400, "rent": 50, "house_cost": 200, "hotel_cost": 200, "position": 39, "color_group": "Dark Blue"}
        ]

        for property_data in properties_data:
            property_obj, created = Property.objects.get_or_create(
                name=property_data["name"],
                defaults={
                    "value": property_data["value"],
                    "rent": property_data["rent"],
                    "house_cost": property_data["house_cost"],
                    "hotel_cost": property_data["hotel_cost"],
                    "color_group": property_data["color_group"]
                }
            )
            tile, created = Tile.objects.get_or_create(
                position=property_data["position"],
                defaults={
                    "name": property_data["name"],
                    "tile_type": 'property',
                    "property": property_obj
                }
            )
            if not created:
                tile.property = property_obj
                tile.save()

        special_tiles_data = [
            {"name": "GO", "position": 0, "tile_type": "corner"},
            {"name": "Income Tax", "position": 4, "tile_type": "tax"},
            {"name": "Casino", "position": 2, "tile_type": "casino"},
            {"name": "Reading Railroad", "position": 5, "tile_type": "property"},
            {"name": "Chance", "position": 7, "tile_type": "chance"},
            {"name": "Jail / Just Visiting", "position": 10, "tile_type": "corner"},
            {"name": "Free Parking", "position": 20, "tile_type": "corner"},
            {"name": "Go To Jail", "position": 30, "tile_type": "corner"},
            {"name": "Short Line", "position": 35, "tile_type": "property"},
            {"name": "Luxury Tax", "position": 38, "tile_type": "tax"},
            {"name": "Stocks", "position": 33, "tile_type": "stocks"},
            {"name": "Trade", "position": 12, "tile_type": "trade"}
        ]

        for tile_data in special_tiles_data:
            tile, created = Tile.objects.get_or_create(
                position=tile_data["position"],
                defaults={
                    "name": tile_data["name"],
                    "tile_type": tile_data["tile_type"],
                }
            )
