const puml = require('../../../utils/puml')

function loader (source) {
  const callback = this.async();
  puml.toSVG(source, callback)
}

module.exports = loader
