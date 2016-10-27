import * as express from 'express';
import * as bodyParser from 'body-parser';
import { join } from 'path';

import * as index from './routes/index';
import * as player from './routes/player';
import * as game from './routes/game';
import * as gameplay from './routes/gameplay';

const port = 3000;

const app = express();

// View Engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', player);
app.use('/api', game);
app.use('/api', gameplay);

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})