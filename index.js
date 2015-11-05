var path = require('path')
var cp = require('child_process')
var fs = require('fs')
var npmWhoami = require('npm-whoami')

function genPackageObj (options) {
  var packageObj = {
    name: path.dirname(options.path),
    description: '',
    version: '1.0.0',
    author: options.name,
    devDependencies: {
      'browserify': '*',
      'big': 'github:tmcw/big#v1.0.1',
      'budo': '*'
    },
    scripts: {
      start: 'budo index.js:bundle.js --dir static --live --open'
    }
  }
  return packageObj
}

function npmInstall (dir, cb) {
  cp.exec('npm i', {cww: dir}, cb)
}

function savePackageObj (packageObj, dir, cb) {
  var packageJson = JSON.stringify(packageObj)
  fs.writeFile(path.join(dir, 'pacakage.json'), packageJson, cb)
}

function saveCss (dir, cb) {
  var cssPath = path.join(require.resolve('big'), 'big.css')
  var destCss = path.join(dir, 'static', 'big.css')
  var source = fs.createReadStream(cssPath)
  var dest = fs.createWriteStream(destCss)
  source.on('error', cb)
  source.on('finish', cb)
  source.pipe(dest)
}

function saveHtml (dir, cb) {
  var htmlPath = path.join(__dirname, index.html)
}

function getNpmName (cb) {
  name = npmWhoami(function normalize (err, name) {
    if (err) return ''
    return name
  })
}
