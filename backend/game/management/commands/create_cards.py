# game/management/commands/create_cards.py
from django.core.management.base import BaseCommand
from game.models import ChanceCard, CommunityChestCard

class Command(BaseCommand):
    help = 'Create sample Chance and Community Chest cards'

    def handle(self, *args, **kwargs):
        chance_cards = [
            {"description": "Bank error in your favor. Collect $200.", "effect": "gain_money", "value": 200},
            {"description": "Doctor's fees. Pay $50.", "effect": "lose_money", "value": 50},
            {"description": "Advance to Go. Collect $200.", "effect": "gain_money", "value": 200},
            {"description": "Go directly to Jail. Do not pass Go. Do not collect $200.", "effect": "go_to_jail", "value": 0},
            {"description": "Your building loan matures. Receive $150.", "effect": "gain_money", "value": 150},
            {"description": "You have won a crossword competition. Collect $100.", "effect": "gain_money", "value": 100},
            {"description": "Pay school fees of $150.", "effect": "lose_money", "value": 150},
            {"description": "Speeding fine. Pay $15.", "effect": "lose_money", "value": 15},
            {"description": "Advance to Illinois Avenue. If you pass Go, collect $200.", "effect": "advance_to", "location": "Illinois Avenue", "value": 0},
            {"description": "Advance to St. Charles Place. If you pass Go, collect $200.", "effect": "advance_to", "location": "St. Charles Place", "value": 0},
            {"description": "Advance token to the nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.", "effect": "advance_to_nearest_utility", "value": 0},
            {"description": "Advance token to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay owner twice the rental to which they are otherwise entitled.", "effect": "advance_to_nearest_railroad", "value": 0},
            {"description": "Advance to Boardwalk.", "effect": "advance_to", "location": "Boardwalk", "value": 0},
            {"description": "Get out of Jail Free. This card may be kept until needed, or traded.", "effect": "get_out_of_jail_free", "value": 0},
            {"description": "Go back three spaces.", "effect": "move_back", "value": 3},
            {"description": "Make general repairs on all your property. For each house pay $25. For each hotel pay $100.", "effect": "property_repair", "house_cost": 25, "hotel_cost": 100, "value": 0},
            {"description": "You have been elected Chairman of the Board. Pay each player $50.", "effect": "pay_each_player", "value": 50},
            {"description": "Your Xmas fund matures. Collect $100.", "effect": "gain_money", "value": 100},
            {"description": "Pay poor tax of $15.", "effect": "lose_money", "value": 15},
            {"description": "Take a trip to Reading Railroad. If you pass Go, collect $200.", "effect": "advance_to", "location": "Reading Railroad", "value": 0}
        ]

        community_chest_cards = [
            {"description": "You inherit $100.", "effect": "gain_money", "value": 100},
            {"description": "Pay hospital fees of $100.", "effect": "lose_money", "value": 100},
            {"description": "Life insurance matures. Collect $100.", "effect": "gain_money", "value": 100},
            {"description": "Pay school fees of $50.", "effect": "lose_money", "value": 50},
            {"description": "Receive $25 consultancy fee.", "effect": "gain_money", "value": 25},
            {"description": "You are assessed for street repair. $40 per house. $115 per hotel.", "effect": "property_repair", "house_cost": 40, "hotel_cost": 115, "value": 0},
            {"description": "Collect $10 from every player.", "effect": "collect_from_players", "value": 10},
            {"description": "Get out of Jail Free. This card may be kept until needed, or traded.", "effect": "get_out_of_jail_free", "value": 0},
            {"description": "Go to Jail. Go directly to Jail. Do not pass Go. Do not collect $200.", "effect": "go_to_jail", "value": 0},
            {"description": "Holiday fund matures. Receive $100.", "effect": "gain_money", "value": 100},
            {"description": "Income tax refund. Collect $20.", "effect": "gain_money", "value": 20},
            {"description": "Receive $50 for services.", "effect": "gain_money", "value": 50},
            {"description": "Bank error in your favor. Collect $200.", "effect": "gain_money", "value": 200},
            {"description": "Doctor's fee. Pay $50.", "effect": "lose_money", "value": 50},
            {"description": "From sale of stock you get $50.", "effect": "gain_money", "value": 50},
            {"description": "Grand Opera Night. Collect $50 from every player for opening night seats.", "effect": "collect_from_players", "value": 50},
            {"description": "Xmas fund matures. Collect $100.", "effect": "gain_money", "value": 100},
            {"description": "You have won second prize in a beauty contest. Collect $10.", "effect": "gain_money", "value": 10},
            {"description": "Receive $25 consultancy fee.", "effect": "gain_money", "value": 25},
            {"description": "Life insurance matures. Collect $100.", "effect": "gain_money", "value": 100}
        ]

        def filter_card_data(card, model):
            # Get the list of allowed fields from the model
            allowed_fields = {field.name for field in model._meta.fields}
            # Filter out unsupported fields
            return {key: value for key, value in card.items() if key in allowed_fields}

        for card in chance_cards:
            filtered_card = filter_card_data(card, ChanceCard)
            ChanceCard.objects.create(**filtered_card)

        for card in community_chest_cards:
            filtered_card = filter_card_data(card, CommunityChestCard)
            CommunityChestCard.objects.create(**filtered_card)

        self.stdout.write(self.style.SUCCESS('Successfully created sample cards.'))
