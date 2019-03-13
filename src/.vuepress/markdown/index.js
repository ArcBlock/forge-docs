const footnote = require('@gerhobbelt/markdown-it-footnote') 
const puml = require('./plugin/puml')
const katex = require('katex')
const texmath = require('markdown-it-texmath').use(katex)

module.exports = {
  lineNumbers: true,
  config: md => {
    md.use(footnote)
    md.use(puml)
    md.use(texmath,{delimiters: 'gitlab'} )
  }
}
