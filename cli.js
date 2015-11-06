#!/usr/bin/env node

var minimist = require('minimist')
var argv = minimist(process.argv.slice(2))
var command = argv._.shift()

var bigup = require('./')

var commands = {
  init: bigup
}

if (commands.hasOwnProperty(command)) {
  commands[command](argv)
} else {
  printHelp()
}

function printHelp () {
  var helpString = [
    'usage: bigup [options]',
    '    init    initialize a new big presentation in the current working directory'
  ].join('\n')
  console.log(helpString)
}
