'use strict'

const blyss = require('blyss')
const format = require('util').format
const loaderUtils = require('loader-utils')
const snazzy = require('snazzy')
const assign = require('object-assign')

module.exports = function blyssLoader(text) {
  const self = this
  const callback = this.async()
  const config = assign({}, loaderUtils.getOptions(this))

  config.filename = this.resourcePath
  this.cacheable()

  blyss.lintText(text, config, (err, result) => {
    if (err) return callback(err, text)
    if (result.errorCount === 0) return callback(err, text)

    const warnings = result.results.reduce((items, result) => {
      return items.concat(result.messages.map((message) => {
        return format(
          '%s:%d:%d: %s%s',
          result.filePath, message.line || 0, message.column || 0, message.message,
          !config.verbose ? `(${message.ruleId})` : ''
        )
      }))
    }, [])
    .join('\n')

    if (config.snazzy !== false) {
      snazzy({ encoding: 'utf8' })
      .on('data', (data) => {
        emit(data)
      })
      .end(warnings)
    } else {
      emit(warnings)
    }

    callback(err, text)
  })

  function emit(data) {
    if (config.error) return self.emitError(data)
    self.emitWarning(data)
  }
}
