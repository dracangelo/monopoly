from django.core.management.base import BaseCommand
from game.models import Property, Board, Space

class Command(BaseCommand):
    help = 'Populates the board with spaces'

    def handle(self, *args, **kwargs):
        # Ensure only one board exists
        Board.objects.all().delete()
        board, created = Board.objects.get_or_create(name='Default Board')

        spaces_data = [
            {"position": 0, "name": "GO", "space_type": "corner"},
            {"position": 1, "name": "Mediterranean Avenue", "space_type": "property", "property_name": "Mediterranean Avenue"},
            {"position": 2, "name": "Casino", "space_type": "casino"},
            {"position": 3, "name": "Baltic Avenue", "space_type": "property", "property_name": "Baltic Avenue"},
            {"position": 4, "name": "Income Tax", "space_type": "tax"},
            {"position": 5, "name": "Reading Railroad", "space_type": "property"},
            {"position": 6, "name": "Oriental Avenue", "space_type": "property", "property_name": "Oriental Avenue"},
            {"position": 7, "name": "Chance", "space_type": "chance"},
            {"position": 8, "name": "Vermont Avenue", "space_type": "property", "property_name": "Vermont Avenue"},
            {"position": 9, "name": "Connecticut Avenue", "space_type": "property", "property_name": "Connecticut Avenue"},
            {"position": 10, "name": "Jail", "space_type": "corner"},
            {"position": 11, "name": "St. Charles Place", "space_type": "property", "property_name": "St. Charles Place"},
            {"position": 12, "name": "Trade", "space_type": "trade"},
            {"position": 13, "name": "States Avenue", "space_type": "property", "property_name": "States Avenue"},
            {"position": 14, "name": "Virginia Avenue", "space_type": "property", "property_name": "Virginia Avenue"},
            {"position": 15, "name": "Pennsylvania Railroad", "space_type": "property"},
            {"position": 16, "name": "St. James Place", "space_type": "property", "property_name": "St. James Place"},
            {"position": 17, "name": "Community Chest", "space_type": "community_chest"},
            {"position": 18, "name": "Tennessee Avenue", "space_type": "property", "property_name": "Tennessee Avenue"},
            {"position": 19, "name": "New York Avenue", "space_type": "property", "property_name": "New York Avenue"},
            {"position": 20, "name": "Free Parking", "space_type": "corner"},
            {"position": 21, "name": "Kentucky Avenue", "space_type": "property", "property_name": "Kentucky Avenue"},
            {"position": 22, "name": "Chance", "space_type": "chance"},
            {"position": 23, "name": "Indiana Avenue", "space_type": "property", "property_name": "Indiana Avenue"},
            {"position": 24, "name": "Illinois Avenue", "space_type": "property", "property_name": "Illinois Avenue"},
            {"position": 25, "name": "B&O Railroad", "space_type": "property"},
            {"position": 26, "name": "Atlantic Avenue", "space_type": "property", "property_name": "Atlantic Avenue"},
            {"position": 27, "name": "Ventnor Avenue", "space_type": "property", "property_name": "Ventnor Avenue"},
            {"position": 28, "name": "Water Works", "space_type": "utility"},
            {"position": 29, "name": "Marvin Gardens", "space_type": "property", "property_name": "Marvin Gardens"},
            {"position": 30, "name": "Go To Jail", "space_type": "corner"},
            {"position": 31, "name": "Pacific Avenue", "space_type": "property", "property_name": "Pacific Avenue"},
            {"position": 32, "name": "North Carolina Avenue", "space_type": "property", "property_name": "North Carolina Avenue"},
            {"position": 33, "name": "Stocks", "space_type": "stocks"},
            {"position": 34, "name": "Pennsylvania Avenue", "space_type": "property", "property_name": "Pennsylvania Avenue"},
            {"position": 35, "name": "Short Line", "space_type": "property"},
            {"position": 36, "name": "Community Chest", "space_type": "community_chest"},
            {"position": 37, "name": "Park Place", "space_type": "property", "property_name": "Park Place"},
            {"position": 38, "name": "Luxury Tax", "space_type": "tax"},
            {"position": 39, "name": "Boardwalk", "space_type": "property", "property_name": "Boardwalk"}
        ]

        for space_data in spaces_data:
            property_obj = None
            if space_data["space_type"] == "property" and "property_name" in space_data:
                property_obj = Property.objects.get(name=space_data["property_name"])

            space, created = Space.objects.get_or_create(
                board=board,
                position=space_data["position"],
                defaults={
                    "name": space_data["name"],
                    "space_type": space_data["space_type"],
                    "property": property_obj
                }
            )
