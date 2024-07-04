from django.core.management.base import BaseCommand
from game.models.tile import Tile
from game.models.property import Property  # Assuming Property is already defined
from game.models.board import Board

class Command(BaseCommand):
    help = 'Initialize the Monopoly board'

    def handle(self, *args, **kwargs):
        # Define standard Monopoly board tiles
        tiles_data = [
            {"position": 0, "name": "GO", "tile_type": "go"},
            {"position": 1, "name": "Mediterranean Avenue", "tile_type": "property", "property_id": 1},
            {"position": 2, "name": "Community Chest", "tile_type": "community_chest"},
            {"position": 3, "name": "Baltic Avenue", "tile_type": "property", "property_id": 2},
            {"position": 4, "name": "Income Tax", "tile_type": "tax"},
            {"position": 5, "name": "Reading Railroad", "tile_type": "property", "property_id": 3},
            # Add more tiles here
        ]

        # Create or update tiles
        for tile_data in tiles_data:
            property_instance = None
            if tile_data.get('tile_type') == 'property':
                property_instance = Property.objects.get(id=tile_data['property_id'])
            tile, created = Tile.objects.update_or_create(
                position=tile_data['position'],
                defaults={
                    'name': tile_data['name'],
                    'tile_type': tile_data['tile_type'],
                    'property': property_instance
                }
            )

        # Create or update the board
        board, created = Board.objects.get_or_create()
        board.tiles.set(Tile.objects.all())
        board.save()

        self.stdout.write(self.style.SUCCESS('Successfully initialized the Monopoly board.'))
