var path = require('path')
var cp = require('child_process')
var fs = require('fs')
var npmWhoami = require('npm-whoami')
var cp = require('cp')
var bigPath = require.resolve('big')
var parallel = require('run-parallel')

function bigup (options) {
  console.log(options)
}

function getPackageObj (options) {
  function packageObjFn () {
  var package = {
    name: path.dirname(options.path),
    description: '',
    version: '1.0.0',
    author: options.name,
    devDependencies: {
      'big': 'github:tmcw/big#v1.0.1'
    },
    scripts: {
      start: 'budo index.js:bundle.js --dir static --live --open'
    }
  }
 }
  return packageObjFn
}

function npmInstallDev (dir, cb) {
  var devDependencies = ['budo', 'browserify', 'github:tmcw/big#v1.0.1'].join(' ')
  cp.exec('npm i budo ' + devDependencies + ' --save-dev', {cwd: dir}, cb)
}

var files = [
  // an array of fileObj's
  {
    name: 'package.json',
    readStream: strum(JSON.stringify(genPackageObj(options)))
    dir: '.'
  },
  {
    name: 'big.css')
    readStream: fs.createReadStream(path.join(bigPath, this.name)),
    dir: 'static'
  },
  {
    name: 'index.html',
    readStream: fs.createReadStream(path.join(__dirname, this.name)),
    dir: 'static'
  }
]

function allClear (files, cb) {
  var statFiles = files.map(function (fileObj) {
    return statCheck.bind(null, fileObj)
  })
  parallel(statFiles, cb)
}

function statCheck (fileObj, cb) {
  var filePath = path.join(fileObj.dest)
  fs.stat(fileObj.path, function (err, stats) {
    if (stats) return cb(new Error(fileObj.path + ' already exists'))
    cb(null) // file doesn't exist.. good to go
  })
}

function savePackageObj (packageObj, dir, cb) {
  var packageJson = JSON.stringify(packageObj)
  var packageJsonPath = path.join(dir, 'pacakage.json')
  fs.stat(packageJsonPath, function(err, stats) {
    if (stats) return cb(new Error(packageJsonPath + ' already exists!'))
    fs.writeFile(packageJsonPath, packageJson, cb)
  })
}

function saveCss (dir, cb) {
  var cssPath = path.join(require.resolve('big'), 'big.css')
  var destCss = path.join(dir, 'static', 'big.css')
  fs.stat(packageJsonPath, function(err, stats) {
    if (stats) return cb(new Error(destCss + ' already exists!'))
    cp(cssPath, destCss, cb)
  })
}

function saveHtml (dir, cb) {
  var htmlPath = path.join(__dirname, 'index.html')
  var destHtml = path.join(dir, 'static', 'index.html')
  fs.stat(packageJsonPath, function(err, stats) {
    if (stats) return cb(new Error(destHtml + ' already exists!'))
    cp(htmlPath, destHtml, cb)
  })
}

function getNpmName (cb) {
  var name = npmWhoami(function normalize (err, name) {
    if (err) return ''
    return name
  })
}

module.exports = bigup
