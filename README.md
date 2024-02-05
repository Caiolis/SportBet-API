# SportBet-API
SportBet is an open source API to manage bets ad matchmaking in sports games. It includes the following routes:

## PARTICIPANT ROUTES
This route creates a new participant or fetch all the participants created in the database

* #### POST /participants creates a new participant, it receives an object with the following attributes through the body: <code>{ name: string, balance: number }</code>. Both are required.
* #### GET /participants fetch all the participants from the database.

## GAME ROUTES
This route creates a new match for any kind of game.
* #### POST /games creates a new match, it receives an object with the following attributes through the body: <code>{ homeTeamName: string, awayTeamName: string }</code>. Both are required.
* #### GET /games fetch all the games from the database.
* #### GET /games/:id fetch a specific game from the database and returns with all the bets from this match.
* #### POST /games/:id/finish it finishes a match, updating the balance from all participants that won the bet and closing the game. It receives an object with the folllowing attributes through the body: <code>{ homeTeamScore: number, awayTeamScore: number }</code>

## BET ROUTES 
This route creates a new bet for any existing match that didn't finish yet. It is not possible to bet on a finished game. 
* ### POST /bets it posts a new bet on an ongoing match. It receives an object with the following attributes through the body: <code>{ homeTeamScore: number, awayTeamScore: number, amountBet: number,gameId: number, participantId: number }</code>


Deploy url: https://sport-bet-api.onrender.com/
