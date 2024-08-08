# Monopoly Game Project

## Overview

This project is a digital version of the classic Monopoly board game, built with a ReactJS frontend and a Django backend. The application allows players to interact with a virtual Monopoly board, manage properties, engage in stock trading, and more.

## Features

- **Real-time Gameplay**: Players can take turns and receive updates in real-time using WebSockets.
- **Property Management**: Players can buy, sell, and mortgage properties.
- **Stock Market**: Players can buy and sell stocks within the game.
- **Chance and Community Chest Cards**: Players can draw cards that affect their game state.
- **Additional Features**: Including gambling, paying taxes, and more.

## Technologies Used

### Frontend

- **ReactJS**: A JavaScript library for building user interfaces.
- **Socket.IO**: Enables real-time, bidirectional communication between web clients and servers.
- **Axios**: Promise-based HTTP client for the browser and node.js.
- **CSS**: For styling components.

### Backend

- **Django**: A high-level Python web framework that encourages rapid development.
- **Django Channels**: Extends Django to handle WebSockets and other protocols.

## Installation

### Prerequisites

- Node.js and npm (for the ReactJS frontend)
- Python and pip (for the Django backend)

### Backend Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/dracangelo/monopoly.git
    cd monopoly-game/backend
    ```

2. **Create a Virtual Environment**

    ```bash
    python -m venv env
    source env/bin/activate  # On Windows, use `env\Scripts\activate`
    ```

3. **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Run Migrations**

    ```bash
    python manage.py migrate
    ```

5. **Start the Django Server**

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

    ```bash
    cd ../frondend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the React Development Server**

    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the React frontend.
2. Ensure the Django backend is running at `http://localhost:8000`.

## File Structure

monopoly/
├── backend/
│   ├── .venv/
│   ├── game/
│   │   ├── __pycache__/
│   │   ├── management/
│   │   │   ├── __pycache__/
│   │   │   ├── commands/
│   │   │   │   ├── __pycache__/
│   │   │   │   ├── create_board.py
│   │   │   │   ├── create_cards.py
│   │   │   │   ├── create_properties.py
│   │   │   │   ├── init_board.py
│   │   │   │   ├── populate_board.py
│   │   │   │   ├── __init__.py
│   │   ├── migrations/
│   │   ├── models/
│   │   │   ├── __pycache__/
│   │   │   ├── __init__.py
│   │   │   ├── bank.py
│   │   │   ├── board.py
│   │   │   ├── chance_card.py
│   │   │   ├── community_chest_card.py
│   │   │   ├── player.py
│   │   │   ├── property.py
│   │   │   ├── space.py
│   │   │   ├── stock.py
│   │   │   ├── tile.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── bank_routes.py
│   │   │   ├── player_routes.py
│   │   │   ├── property_routes.py
│   │   │   ├── stock_routes.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── transaction_service.py
│   │   ├── utils/
│   │   │   ├── __pycache__/
│   │   │   ├── __init__.py
│   │   │   ├── game_logic.py
│   │   │   ├── trading_rules.py
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── consumers.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   ├── views.py
│   ├── monopoly_game/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   ├── __pycache__/
│   ├── db.sqlite3
│   ├── manage.py
│   ├── requirements.txt
│   ├── app.py
├── frondend/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   ├── src/
│   │   ├── api/
│   │   │   ├── api.js
│   │   │   ├── config.js
│   │   ├── components/
│   │   │   ├── board/
│   │   │   │   ├── Tile.js
│   │   │   │   ├── Tile.css
│   │   │   │   ├── TitleDeed.js
│   │   │   │   ├── TitleDeed.css
│   │   │   ├── Dice/
│   │   │   │   ├── DiceRoller.js
│   │   │   │   ├── DiceRoller.css
│   │   │   ├── player/
│   │   │   │   ├── PlayerInfo.js
│   │   │   │   ├── PlayerInfo.css
│   │   │   ├── BankDashboard.js
│   │   │   ├── PlayerDashboard.js
│   │   │   ├── PropertyCard.js
│   │   │   ├── StockMarket.js
│   │   │   ├── TradeModal.js
│   │   ├── assets/
│   │   │   ├── avatars/
│   │   │   │   ├── avatar1.png
│   │   │   │   ├── avatar2.png
│   │   │   │   ├── avatar3.png
│   │   │   │   ├── avatar4.png
│   │   │   │   ├── avatar5.png
│   │   │   │   ├── avatar6.png
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── styles.css
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
└── .gitignore

## known error
The player movement are not visible from the frontend
Triggers not displaying the tile properties
board is not well organized

## future prospects
Add dynamic player selection
