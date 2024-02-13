import {APP_ENV} from '@config';
import {pino} from 'pino';

const appLogger = pino({
  transport:
    APP_ENV === 'development' ?
      // If in Development, print to the console using pretty print
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss.l Z',
          ignore: 'pid,hostname'
        }
      } :
      // else send it to Something else
      {
        target: './pino-http-transport.js',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
});

export default appLogger;
