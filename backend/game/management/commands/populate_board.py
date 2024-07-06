# backend/game/management/commands/populate_board.py

from django.core.management.base import BaseCommand
from game.models import Board, Space

class Command(BaseCommand):
    help = 'Populates the board with spaces'

    def handle(self, *args, **kwargs):
        # Ensure only one board exists
        Board.objects.all().delete()
        board, created = Board.objects.get_or_create(name='Default Board')

        # Example spaces with positions, adjust as needed
        spaces_with_positions = [
            ('GO', 0), ('Mediterranean Avenue', 1), ('Casino', 2), 
            ('Baltic Avenue', 3), ('Income Tax', 4), ('Reading Railroad', 5), 
            ('Oriental Avenue', 6), ('Chance', 7), ('Vermont Avenue', 8), 
            ('Connecticut Avenue', 9), ('Jail', 10), ('St. Charles Place', 11), 
            ('Electric Company', 12), ('States Avenue', 13), ('Virginia Avenue', 14),
            ('Pennsylvania Railroad', 15), ('St. James Place', 16), ('Community Chest', 17), 
            ('Tennessee Avenue', 18), ('New York Avenue', 19), ('Free Parking', 20), 
            ('Kentucky Avenue', 21), ('Stocks', 22), ('Indiana Avenue', 23), 
            ('Illinois Avenue', 24), ('B. & O. Railroad', 25), ('Atlantic Avenue', 26), 
            ('Ventnor Avenue', 27), ('Water Works', 28), ('Marvin Gardens', 29),
            ('Go to Jail', 30), ('Pacific Avenue', 31), ('North Carolina Avenue', 32), 
            ('Community Chest', 33), ('Pennsylvania Avenue', 34), ('Short Line', 35), 
            ('Chance', 36), ('Park Place', 37), ('Luxury Tax', 38), ('Boardwalk', 39)
        ]

        for name, position in spaces_with_positions:
            Space.objects.get_or_create(name=name, position=position, board=board)

        self.stdout.write(self.style.SUCCESS('Successfully populated the board with spaces'))
