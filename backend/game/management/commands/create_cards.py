# game/management/commands/create_cards.py
from django.core.management.base import BaseCommand
from game.models.chance_card import ChanceCard
from game.models.community_chest_card import CommunityChestCard

class Command(BaseCommand):
    help = 'Create sample Chance and Community Chest cards'

    def handle(self, *args, **kwargs):
        chance_cards = [
            {"description": "Bank error in your favor. Collect $200.", "effect": "gain_money", "value": 200},
            {"description": "Doctor's fees. Pay $50.", "effect": "lose_money", "value": 50},
            # Add more Chance cards here
        ]
        
        community_chest_cards = [
            {"description": "You inherit $100.", "effect": "gain_money", "value": 100},
            {"description": "Pay hospital fees of $100.", "effect": "lose_money", "value": 100},
            # Add more Community Chest cards here
        ]
        
        for card in chance_cards:
            ChanceCard.objects.create(**card)
        
        for card in community_chest_cards:
            CommunityChestCard.objects.create(**card)
        
        self.stdout.write(self.style.SUCCESS('Successfully created sample cards.'))
