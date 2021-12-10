#! /usr/bin/env node

const { startWatching, runCLI } = require('./src/modules');

startWatching();

console.log(`Watching files inside ./src`);

runCLI();
