# Four In A Row

## Overwiew
MEAN stack applicaion to play a 4 in a row game.

## A of all...
You need to have MongoDB (v2.2) installed. There is a mongod.cfg file that will allow you to run `` net start mongodb `` from your file location... ONCE YOU CHANGE THE PATH TO MATCH YOUR LOCAL PATH. The DB must be running to start the game.

## B of all...
Node v5 or greater, and Typescript 2.0 or greater.

## A 3rd thing...
I build with VS2015, so I haven't put together a gulpfile just yet. You can run `` tsc && cd client && tsc && cd .. && node server.js `` to build and start the server.

### What happens.
There's a signup at localhost:3000/signup. Enter player info here.
There's a gamestart at localhost:3000/gamestart. Choose 2 players click start. A game board appears, select the column the chip was dropped in and it fills in a color.

The endpoint localhost:3000/api/gameplay/move will accept an object like this `` {columnNumber: 1} `` from something like a raspberry pi.