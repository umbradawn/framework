// import { startServer } from './src/server.js';

// startServer();
require('@babel/register')({
  presets: [ '@babel/preset-env' ],
  plugins: [
    [ '@babel/plugin-proposal-decorators', { legacy: true, experimentalDecorators: true } ],
    [ '@babel/plugin-proposal-class-properties' ],
  ],
});
require('core-js/stable');
require('regenerator-runtime/runtime');
const server = require('./src/server');
server.startServer();
