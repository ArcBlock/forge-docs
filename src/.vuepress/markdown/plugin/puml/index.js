const puml = require('../../../utils/puml');
const imageDataURI = require('image-data-uri');

function generateChart(code) {
  try {
    const svg = puml.toSVGSync(code)
    const uri = imageDataURI.encode(svg, 'svg+xml');
    return `<p><img src="${uri}" alt="uml"></p>`
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`
  }
}

module.exports = function umlPlugin(md, options) {

  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (/uml|puml|plantuml/.test(token.info)) {
      return generateChart(code)
    }

    return temp(tokens, idx, options, env, slf)
  }
};