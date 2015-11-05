#!/usr/bin/env node

var minimist = require('minimist')
var argv = minimist(process.argv.slice(2))
var bigup = require('./')
var command = argv._.shift()

var commands = {
  init: bigup
}

if (commands.hasOwnProperty(command)) {
  commands[command]()
} else {
  printHelp()
}

function printHelp () {
  var helpString = ['usage: bigup [options]'].join('\n')
  console.log(helpString)
}
