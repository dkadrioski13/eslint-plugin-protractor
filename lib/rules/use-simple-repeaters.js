'use strict'

/**
 * @fileoverview Discourage using extended ng-repeat syntax in by.repeater() locators
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      if (node.arguments) {
        var object = node.callee.object
        var property = node.callee.property

        if (object && property && object.name === 'by' && property.name === 'repeater') {
          var repeaterValue = node.arguments[0].value

          if (repeaterValue.indexOf('|') > 0) {
            context.report(node, 'Unexpected filter inside a by.repeater() locator.')
          }

          if (repeaterValue.indexOf('track by') > 0) {
            context.report(node, 'Unexpected "track by" inside a by.repeater() locator.')
          }
        }
      }
    }
  }
}
