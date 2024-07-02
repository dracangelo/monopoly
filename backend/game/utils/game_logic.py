from game.models import Property, Player

def buy_house(player, property_id):
    property = Property.objects.get(id=property_id)
    if property.owner == player and property.houses < 4 and property.hotels == 0:
        if player.balance >= property.house_cost:
            player.balance -= property.house_cost
            property.houses += 1
            player.save()
            property.save()
            return True, f"House purchased on {property.name}."
        else:
            return False, "Not enough balance to buy a house."
    return False, "Cannot buy house on this property."

def buy_hotel(player, property_id):
    property = Property.objects.get(id=property_id)
    if property.owner == player and property.houses == 4:
        if player.balance >= property.hotel_cost:
            player.balance -= property.hotel_cost
            property.houses = 0
            property.hotels += 1
            player.save()
            property.save()
            return True, f"Hotel purchased on {property.name}."
        else:
            return False, "Not enough balance to buy a hotel."
    return False, "Cannot buy hotel on this property."

def charge_rent(player, property_id):
    property = Property.objects.get(id=property_id)
    rent_amount = property.calculate_rent()
    if player.balance >= rent_amount:
        player.balance -= rent_amount
        property.owner.balance += rent_amount
        player.save()
        property.owner.save()
        return True, f"Rent of {rent_amount} paid to {property.owner.name}."
    else:
        return False, "Not enough balance to pay rent."
