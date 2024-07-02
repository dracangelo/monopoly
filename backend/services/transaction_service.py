from game.models.player import Player

def update_player_balance(player_id, amount):
    player = Player.objects.get(id=player_id)
    player.balance += amount
    player.save()
