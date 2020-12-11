
const Ajv = require('ajv')
const ajv = new Ajv({
  allErrors: true, // 输出所有的错误（比较慢）
  jsonPointers: true
})

require('ajv-errors')(ajv , {singleError: true, keepErrors: false})

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    // 判断没有传的字段，为空的的字段
    if(!ajv.errors[0].dataPath) {
      for(let key in schema.properties) {
        if(key === ajv.errors[0].params.missingProperty) {
          ajv.errors[0].message = schema.properties[key].errorMessage || ajv.errors[0].message
        }
      }
    }
    return ajv.errors[0]
  }
}

module.exports = validate
