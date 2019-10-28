import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import apollo from './graphql';

import environmentConfig from './config/environmentConfig';

require('dotenv')
  .config();

let app = express();
const logger = require('morgan');

app.use(logger('dev'));

function setPort(port) {
  if (!port) {
    throw new Error('no port configured!');
  }

  app.set('port', parseInt(port, 10));
}

function listen() {
  const port = app.get('port') || environmentConfig.port;
  app = app.listen(port, () => {
    console.log(`The server is running and listening at http://localhost:${port}`);
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: environmentConfig.corsDomain }));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);

apollo(app);

module.exports = {
  app,
  setPort,
  listen
};
