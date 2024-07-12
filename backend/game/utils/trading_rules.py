from game.models import Property, Player

def validate_trade(player1, player2, property1, property2):
    """
    Validate if the trade between two players is possible.
    """
    if property1.owner != player1 or property2.owner != player2:
        return False, "One or both players do not own the properties they want to trade."

    return True, "Trade is valid."

def execute_trade(player1, player2, property1, property2):
    """
    Execute the trade between two players after validation.
    """
    is_valid, message = validate_trade(player1, player2, property1, property2)
    if not is_valid:
        return False, message

    with transaction.atomic():
        property1.owner = player2
        property2.owner = player1
        property1.save()
        property2.save()

    return True, "Trade executed successfully."

def propose_trade(player1, player2, property1, property2):
    """
    Propose a trade between two players.
    """
    is_valid, message = validate_trade(player1, player2, property1, property2)
    if is_valid:
        return execute_trade(player1, player2, property1, property2)
    else:
        return False, message
