import random
from django.db import transaction
from game.models import Property, Player, Bank, Stock, ChanceCard, CommunityChestCard, Tile, Board, Space
from game.utils.trading_rules import propose_trade

def auto_update_balance(player):
    player.save()

def pass_go(player):
    salary = 200  # Assume salary for passing GO is $200
    player.balance += salary
    player.save()
    fluctuate_stock_prices()
    auto_update_bank_balance(salary, "credit")
    return True, f"Player passed GO and collected ${salary}. Stock prices updated."

def auto_update_bank_balance(amount, transaction_type):
    bank = Bank.objects.first()
    if transaction_type == "credit":
        bank.balance -= amount
    elif transaction_type == "debit":
        bank.balance += amount
    bank.save()

def pay_jail_bail(player):
    bail_amount = 50
    if player.balance >= bail_amount:
        player.balance -= bail_amount
        player.in_jail = False
        auto_update_bank_balance(bail_amount, "debit")
        player.save()
        return True, "Bail paid, player is out of jail."
    else:
        return False, "Not enough balance to pay bail."

def pay_tax(player, tax_amount):
    if player.balance >= tax_amount:
        player.balance -= tax_amount
        auto_update_bank_balance(tax_amount, "debit")
        player.save()
        return True, f"Paid tax of ${tax_amount}."
    else:
        return False, "Not enough balance to pay tax."

def borrow_from_bank(player, amount):
    bank = Bank.objects.first()
    if bank.balance >= amount:
        player.balance += amount
        player.debt += amount * (1 + bank.interest_rate)
        auto_update_bank_balance(amount, "credit")
        player.save()
        return True, f"Borrowed ${amount} from bank with interest."
    else:
        return False, "Bank does not have enough balance to lend."

def pay_mortgage(player, property):
    mortgage_rate = Bank.objects.first().mortgage_rate
    mortgage_amount = property.value * (1 + mortgage_rate)
    if player.balance >= mortgage_amount:
        player.balance -= mortgage_amount
        auto_update_bank_balance(mortgage_amount, "debit")
        player.save()
        return True, f"Paid mortgage of ${mortgage_amount}."
    else:
        return False, "Not enough balance to pay mortgage."

def charge_rent(player, property):
    rent = calculate_rent(property)
    if player.balance >= rent:
        player.balance -= rent
        property.owner.balance += rent
        property.owner.save()
        player.save()
        return True, f"Paid rent of ${rent}."
    else:
        return False, "Not enough balance to pay rent."

def calculate_rent(property):
    if property.hotel:
        return property.rent * 5
    return property.rent * (1 + property.houses)

def fluctuate_stock_prices():
    stocks = Stock.objects.all()
    for stock in stocks:
        fluctuation = random.uniform(-0.2, 0.2)  # Stocks can fluctuate by -20% to +20%
        stock.price *= (1 + fluctuation)
        stock.save()

def buy_house(player, property):
    if property.hotel:
        return False, 'Property already has a hotel'
    if property.houses >= 4:
        return False, 'Property already has 4 houses'
    if player.balance < property.house_cost:  # Assume house_cost is a property attribute
        return False, 'Not enough balance to buy a house'

    property.houses += 1
    player.balance -= property.house_cost
    property.save()
    player.save()
    return True, 'House bought successfully'

def buy_hotel(player, property):
    if property.hotel:
        return False, 'Property already has a hotel'
    if property.houses < 4:
        return False, 'Property must have 4 houses to buy a hotel'
    if player.balance < property.hotel_cost:  # Assume hotel_cost is a property attribute
        return False, 'Not enough balance to buy a hotel'

    property.houses = 0
    property.hotel = True
    player.balance -= property.hotel_cost
    property.save()
    player.save()
    return True, 'Hotel bought successfully'

def trade_properties(player1, player2, property1, property2):
    """
    Facilitate property trading between two players.
    """
    success, message = propose_trade(player1, player2, property1, property2)
    return success, message

def random_gambling(player):
    gambling_outcome = random.choice(["win", "lose"])
    amount = random.randint(50, 200)  # Random gambling amount between $50 and $200
    if gambling_outcome == "win":
        player.balance += amount
        return True, f"Player won ${amount} in gambling."
    else:
        player.balance -= amount
        return True, f"Player lost ${amount} in gambling."

def player_turn(player, steps):
    board = Board.objects.first()
    new_position = (player.position + steps) % 40  # Assuming a standard 40-tile board
    space = Space.objects.get(board=board, position=new_position)

    player.position = new_position
    player.save()

    handle_tile(player, space)
    if player.position == 0:
        return pass_go(player)
    auto_update_balance(player)
    return True, f"Player moved to {space.name}"

def handle_tile(player, space):
    if space.space_type == 'GO':
        # Player landed on GO, handle pass_go in player_turn
        pass
    elif space.space_type == 'PROPERTY':
        property = space.property
        # Handle property logic (e.g., buy, pay rent, etc.)
        handle_property(player, property)
    elif space.space_type == 'CHANCE':
        draw_chance_card(player)
    elif space.space_type == 'COMMUNITY_CHEST':
        draw_community_chest_card(player)
    elif space.space_type == 'TAX':
        handle_tax(player, space)
    elif space.space_type == 'JAIL':
        handle_jail(player)
    elif space.space_type == 'FREE_PARKING':
        handle_free_parking(player)
    elif space.space_type == 'GO_TO_JAIL':
        send_player_to_jail(player)
    elif space.space_type == 'UTILITY' or space.space_type == 'RAILROAD':
        handle_utility_or_railroad(player, space)

def handle_property(player, property):
    if property.owner is None:
        # Player can buy the property
        pass
    elif property.owner != player:
        # Player must pay rent
        charge_rent(player, property)
    
def draw_chance_card(player):
    chance = random.choice([True, False])  # 50/50 chance
    card = random.choice(ChanceCard.objects.all())
    apply_card_effect(player, card, positive=chance)
    return card.description

def draw_community_chest_card(player):
    chance = random.choices([True, False], weights=[0.75, 0.25])[0]  # 75/25 chance
    card = random.choice(CommunityChestCard.objects.all())
    apply_card_effect(player, card, positive=chance)
    return card.description

def apply_card_effect(player, card, positive=True):
    effect = card.effect
    value = card.value if positive else -card.value
    
    if effect == "gain_money":
        player.balance += value
    elif effect == "lose_money":
        player.balance -= value
    # Add other effects as needed
    
    player.save()

def handle_tax(player, space):
    tax_amount = 200  # Assume a standard tax amount or fetch from the space details
    pay_tax(player, tax_amount)

def handle_jail(player):
    player.in_jail = True
    player.save()

def handle_free_parking(player):
    # Typically, nothing happens here
    pass

def send_player_to_jail(player):
    player.position = 10  # Jail position
    player.in_jail = True
    player.save()

def handle_utility_or_railroad(player, space):
    property = space.property
    if property.owner is None:
        # Player can buy the property
        pass
    elif property.owner != player:
        # Player must pay rent
        charge_rent(player, property)

def buy_stock(player, stock, amount):
    cost = stock.price * amount
    if player.balance >= cost:
        player.balance -= cost
        player.stocks_owned[stock.name] = player.stocks_owned.get(stock.name, 0) + amount
        auto_update_balance(player)
        return True, f"Bought {amount} shares of {stock.name}."
    return False, "Not enough balance to buy stock."

def sell_stock(player, stock, amount):
    if player.stocks_owned.get(stock.name, 0) >= amount:
        player.stocks_owned[stock.name] -= amount
        player.balance += stock.price * amount
        auto_update_balance(player)
        return True, f"Sold {amount} shares of {stock.name}."
    return False, "Not enough shares to sell."
