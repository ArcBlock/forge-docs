const {spawn, spawnSync} = require('child_process');

module.exports = {
  toSVG,
  toSVGSync
}

/** spawn plantuml -tsvg */
function toSVG (input, callback) {

  let data = ''

  const plantuml = spawn('java', [
    '-Djava.awt.headless=true',
    '-jar', 
    __dirname + '/plantuml.jar', 
    '-p', 
    '-charset', 
    'utf8', 
    '-tsvg'
  ]);

  plantuml.stdout.on('data', d => {
    data += d
  })

  plantuml.stdout.on('end', code => {
    callback(null, removeComments(data))
  })

  plantuml.stdin.end(input)
}

/** call plantuml -tsvg synchronously */
function toSVGSync(input) {
  const plantuml = spawnSync('java', [
    '-Djava.awt.headless=true',
    '-jar', 
    __dirname + '/plantuml.jar', 
    '-p', 
    '-charset', 
    'utf8', 
    '-tsvg'
  ], {input});

  return removeComments(plantuml.stdout.toString())
}

function removeComments(svg) {
  return svg.replace(/<!--.*?-->/sg, '')
}