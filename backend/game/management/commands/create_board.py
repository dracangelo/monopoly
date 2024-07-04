# game/management/commands/create_board.py
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
            # Add all other spaces here
            {'position': 2, 'space_type': 'COMMUNITY_CHEST', 'name': 'Community Chest'},
            {'position': 3, 'space_type': 'PROPERTY', 'name': 'Baltic Avenue', 'property': Property.objects.get(name='Baltic Avenue')},
            {'position': 4, 'space_type': 'TAX', 'name': 'Income Tax'},
            {'position': 5, 'space_type': 'RAILROAD', 'name': 'Reading Railroad'},
            {'position': 6, 'space_type': 'PROPERTY', 'name': 'Oriental Avenue', 'property': Property.objects.get(name='Oriental Avenue')},
            {'position': 7, 'space_type': 'CHANCE', 'name': 'Chance'},
            {'position': 8, 'space_type': 'PROPERTY', 'name': 'Vermont Avenue', 'property': Property.objects.get(name='Vermont Avenue')},
            {'position': 9, 'space_type': 'PROPERTY', 'name': 'Connecticut Avenue', 'property': Property.objects.get(name='Connecticut Avenue')},
            {'position': 10, 'space_type': 'JAIL', 'name': 'Jail'},
            {'position': 11, 'space_type': 'PROPERTY', 'name': 'St. Charles Place', 'property': Property.objects.get(name='St. Charles Place')},
            # Continue for all spaces on the board...
        ]

        for space_data in spaces:
            space = Space(board=board, **space_data)
            space.save()

        self.stdout.write(self.style.SUCCESS('Successfully created Monopoly board and spaces.'))
