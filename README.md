# Four In A Row

## Overwiew
MEAN stack applicaion to play a 4 in a row game.

## A of all...
You need to have MongoDB (v2.2) installed. There is a mongod.cfg file that will allow you to run `net start mongodb` from your file location... ONCE YOU CHANGE THE PATH TO MATCH YOUR LOCAL PATH. The DB must be running to start the game.

## B of all...
Node v5 or greater, and Typescript 2.0 or greater.

## A 3rd thing...
I build with VS2015, so I haven't put together a gulpfile just yet. You can run `npm run tsc && node server.js` to build and start the server.

## Another piece of this puzzle...
This was entirely created to use iPads for a specific event, so the UI is optimized for that and doesn't have a lot of things you might expect on a PC (no special pointers or screen size breakpoints).  Also, I don't actually care if you know anything about Tableau, but that is the conference that this was created for.

### What happens.
There's a signup at localhost:3000/signup. Enter player info here.
There's a gamestart at localhost:3000/gamestart. Choose 2 players click start. A game board appears, select the column the chip was dropped in and it fills in a color.

The endpoint localhost:3000/api/gameplay/move will accept an object like this `{ columnNumber: 1 }` from something like a raspberry pi. This is a PUT endpoint...

### Try it out
Build it & start the server. First go to localhost:3000/signup and add some users (at least 2). In another window go to localhost:3000/gamestart, select player1 and player2, click the big Start Button.

Now the fun bit, either click a button to choose a column or send a PUT request to localhost:3000/api/gameplay/move with the headers `"Content-Type":"application/json"` and a body `{ "columnNumber": 0 }` or any column number from 0-6. You can use postman or something to test this.

Neat!