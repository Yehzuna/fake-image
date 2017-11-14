#!/usr/bin/env node

const fa = require('../lib/cli.js');

console.log(process.cwd());
console.log(process.argv[2]);

fa.read(process.cwd() + process.argv[2]);