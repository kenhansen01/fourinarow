import * as express from 'express';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import * as socketio from 'socket.io';

import { index, player, game, gameplay } from './routes/routes';

import Config from '../config/config';

const app = express();

const server = app.listen(Config.PORT, () => {
  console.log(`Server started on port ${Config.PORT}.`);
});
const io = socketio.listen(server);

// View Engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(join(__dirname, Config.APP_CLIENT)));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', player);
app.use('/api', game);
app.use('/api', gameplay(io));

io.sockets.on('connection', (socket) => {
  console.log('client connect');
  socket.on('send', (data: any) => {
    io.sockets.emit('message', data);
  });
});

export = server;