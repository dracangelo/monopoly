from django.core.management.base import BaseCommand
from game.models.board import Board, Space
from game.models.property import Property

class Command(BaseCommand):
    help = 'Create Monopoly board with spaces'

    def handle(self, *args, **kwargs):
        board, created = Board.objects.get_or_create(name='Monopoly Board')
        if not created:
            self.stdout.write(self.style.WARNING('Board already exists. Skipping creation.'))
            return

        spaces = [
            {'position': 0, 'space_type': 'GO', 'name': 'GO'},
            {'position': 1, 'space_type': 'PROPERTY', 'name': 'Mediterranean Avenue', 'property': Property.objects.get(name='Mediterranean Avenue')},
            {'position': 2, 'space_type': 'CASINO', 'name': 'Casino'},
            {'position': 3, 'space_type': 'PROPERTY', 'name': 'Baltic Avenue', 'property': Property.objects.get(name='Baltic Avenue')},
            {'position': 4, 'space_type': 'TAX', 'name': 'Income Tax'},
            {'position': 5, 'space_type': 'RAILROAD', 'name': 'Reading Railroad'},
            {'position': 6, 'space_type': 'PROPERTY', 'name': 'Oriental Avenue', 'property': Property.objects.get(name='Oriental Avenue')},
            {'position': 7, 'space_type': 'CHANCE', 'name': 'Chance'},
            {'position': 8, 'space_type': 'PROPERTY', 'name': 'Vermont Avenue', 'property': Property.objects.get(name='Vermont Avenue')},
            {'position': 9, 'space_type': 'PROPERTY', 'name': 'Connecticut Avenue', 'property': Property.objects.get(name='Connecticut Avenue')},
            {'position': 10, 'space_type': 'JAIL', 'name': 'Jail'},
            {'position': 11, 'space_type': 'PROPERTY', 'name': 'St. Charles Place', 'property': Property.objects.get(name='St. Charles Place')},
            {'position': 12, 'space_type': 'TRADE', 'name': 'Trade'},
            {'position': 13, 'space_type': 'PROPERTY', 'name': 'States Avenue', 'property': Property.objects.get(name='States Avenue')},
            {'position': 14, 'space_type': 'PROPERTY', 'name': 'Virginia Avenue', 'property': Property.objects.get(name='Virginia Avenue')},
            {'position': 15, 'space_type': 'RAILROAD', 'name': 'Pennsylvania Railroad'},
            {'position': 16, 'space_type': 'PROPERTY', 'name': 'St. James Place', 'property': Property.objects.get(name='St. James Place')},
            {'position': 17, 'space_type': 'COMMUNITY_CHEST', 'name': 'Community Chest'},
            {'position': 18, 'space_type': 'PROPERTY', 'name': 'Tennessee Avenue', 'property': Property.objects.get(name='Tennessee Avenue')},
            {'position': 19, 'space_type': 'PROPERTY', 'name': 'New York Avenue', 'property': Property.objects.get(name='New York Avenue')},
            {'position': 20, 'space_type': 'FREE_PARKING', 'name': 'Free Parking'},
            {'position': 21, 'space_type': 'PROPERTY', 'name': 'Kentucky Avenue', 'property': Property.objects.get(name='Kentucky Avenue')},
            {'position': 22, 'space_type': 'CHANCE', 'name': 'Chance'},
            {'position': 23, 'space_type': 'PROPERTY', 'name': 'Indiana Avenue', 'property': Property.objects.get(name='Indiana Avenue')},
            {'position': 24, 'space_type': 'PROPERTY', 'name': 'Illinois Avenue', 'property': Property.objects.get(name='Illinois Avenue')},
            {'position': 25, 'space_type': 'RAILROAD', 'name': 'B. & O. Railroad'},
            {'position': 26, 'space_type': 'PROPERTY', 'name': 'Atlantic Avenue', 'property': Property.objects.get(name='Atlantic Avenue')},
            {'position': 27, 'space_type': 'PROPERTY', 'name': 'Ventnor Avenue', 'property': Property.objects.get(name='Ventnor Avenue')},
            {'position': 28, 'space_type': 'UTILITY', 'name': 'Water Works'},
            {'position': 29, 'space_type': 'PROPERTY', 'name': 'Marvin Gardens', 'property': Property.objects.get(name='Marvin Gardens')},
            {'position': 30, 'space_type': 'GO_TO_JAIL', 'name': 'Go To Jail'},
            {'position': 31, 'space_type': 'PROPERTY', 'name': 'Pacific Avenue', 'property': Property.objects.get(name='Pacific Avenue')},
            {'position': 32, 'space_type': 'PROPERTY', 'name': 'North Carolina Avenue', 'property': Property.objects.get(name='North Carolina Avenue')},
            {'position': 33, 'space_type': 'COMMUNITY_CHEST', 'name': 'Community Chest'},
            {'position': 34, 'space_type': 'PROPERTY', 'name': 'Pennsylvania Avenue', 'property': Property.objects.get(name='Pennsylvania Avenue')},
            {'position': 35, 'space_type': 'RAILROAD', 'name': 'Short Line'},
            {'position': 36, 'space_type': 'CHANCE', 'name': 'Chance'},
            {'position': 37, 'space_type': 'PROPERTY', 'name': 'Park Place', 'property': Property.objects.get(name='Park Place')},
            {'position': 38, 'space_type': 'TAX', 'name': 'Luxury Tax'},
            {'position': 39, 'space_type': 'PROPERTY', 'name': 'Boardwalk', 'property': Property.objects.get(name='Boardwalk')},
        ]

        for space_data in spaces:
            space = Space(board=board, **space_data)
            space.save()

        self.stdout.write(self.style.SUCCESS('Successfully created Monopoly board and spaces.'))
