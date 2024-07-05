from django.core.management.base import BaseCommand
from game.models.property import Property
from game.models.board import Board, Space

class Command(BaseCommand):
    help = 'Initialize the Monopoly board'

    def handle(self, *args, **kwargs):
        spaces_data = [
            {"position": 0, "name": "GO", "space_type": "GO"},
            {"position": 1, "name": "Mediterranean Avenue", "space_type": "PROPERTY", "property_name": "Mediterranean Avenue"},
            {"position": 2, "name": "Community Chest", "space_type": "COMMUNITY_CHEST"},
            {"position": 3, "name": "Baltic Avenue", "space_type": "PROPERTY", "property_name": "Baltic Avenue"},
            {"position": 4, "name": "Income Tax", "space_type": "TAX"},
            {"position": 5, "name": "Reading Railroad", "space_type": "RAILROAD"},
            {"position": 6, "name": "Oriental Avenue", "space_type": "PROPERTY", "property_name": "Oriental Avenue"},
            {"position": 7, "name": "Chance", "space_type": "CHANCE"},
            {"position": 8, "name": "Vermont Avenue", "space_type": "PROPERTY", "property_name": "Vermont Avenue"},
            {"position": 9, "name": "Connecticut Avenue", "space_type": "PROPERTY", "property_name": "Connecticut Avenue"},
            {"position": 10, "name": "Jail", "space_type": "JAIL"},
            {"position": 11, "name": "St. Charles Place", "space_type": "PROPERTY", "property_name": "St. Charles Place"},
            {"position": 12, "name": "Electric Company", "space_type": "UTILITY"},
            {"position": 13, "name": "States Avenue", "space_type": "PROPERTY", "property_name": "States Avenue"},
            {"position": 14, "name": "Virginia Avenue", "space_type": "PROPERTY", "property_name": "Virginia Avenue"},
            {"position": 15, "name": "Pennsylvania Railroad", "space_type": "RAILROAD"},
            {"position": 16, "name": "St. James Place", "space_type": "PROPERTY", "property_name": "St. James Place"},
            {"position": 17, "name": "Community Chest", "space_type": "COMMUNITY_CHEST"},
            {"position": 18, "name": "Tennessee Avenue", "space_type": "PROPERTY", "property_name": "Tennessee Avenue"},
            {"position": 19, "name": "New York Avenue", "space_type": "PROPERTY", "property_name": "New York Avenue"},
            {"position": 20, "name": "Free Parking", "space_type": "FREE_PARKING"},
            {"position": 21, "name": "Kentucky Avenue", "space_type": "PROPERTY", "property_name": "Kentucky Avenue"},
            {"position": 22, "name": "Chance", "space_type": "CHANCE"},
            {"position": 23, "name": "Indiana Avenue", "space_type": "PROPERTY", "property_name": "Indiana Avenue"},
            {"position": 24, "name": "Illinois Avenue", "space_type": "PROPERTY", "property_name": "Illinois Avenue"},
            {"position": 25, "name": "B. & O. Railroad", "space_type": "RAILROAD"},
            {"position": 26, "name": "Atlantic Avenue", "space_type": "PROPERTY", "property_name": "Atlantic Avenue"},
            {"position": 27, "name": "Ventnor Avenue", "space_type": "PROPERTY", "property_name": "Ventnor Avenue"},
            {"position": 28, "name": "Water Works", "space_type": "UTILITY"},
            {"position": 29, "name": "Marvin Gardens", "space_type": "PROPERTY", "property_name": "Marvin Gardens"},
            {"position": 30, "name": "Go To Jail", "space_type": "GO_TO_JAIL"},
            {"position": 31, "name": "Pacific Avenue", "space_type": "PROPERTY", "property_name": "Pacific Avenue"},
            {"position": 32, "name": "North Carolina Avenue", "space_type": "PROPERTY", "property_name": "North Carolina Avenue"},
            {"position": 33, "name": "Community Chest", "space_type": "COMMUNITY_CHEST"},
            {"position": 34, "name": "Pennsylvania Avenue", "space_type": "PROPERTY", "property_name": "Pennsylvania Avenue"},
            {"position": 35, "name": "Short Line", "space_type": "RAILROAD"},
            {"position": 36, "name": "Chance", "space_type": "CHANCE"},
            {"position": 37, "name": "Park Place", "space_type": "PROPERTY", "property_name": "Park Place"},
            {"position": 38, "name": "Luxury Tax", "space_type": "TAX"},
            {"position": 39, "name": "Boardwalk", "space_type": "PROPERTY", "property_name": "Boardwalk"},
            {"position": 40, "name": "Gambling", "space_type": "UTILITY"},
            {"position": 41, "name": "Trade", "space_type": "UTILITY"},
            {"position": 42, "name": "WiFi", "space_type": "UTILITY"},
        ]

        board = Board.objects.create(name='Default Board')

        for space_data in spaces_data:
            property_instance = None
            if space_data.get('space_type') == 'PROPERTY':
                property_instance = Property.objects.get(name=space_data['property_name'])
            space, created = Space.objects.update_or_create(
                position=space_data['position'],
                defaults={
                    'name': space_data['name'],
                    'space_type': space_data['space_type'],
                    'property': property_instance,
                    'board': board
                }
            )

        self.stdout.write(self.style.SUCCESS('Board initialized successfully'))
