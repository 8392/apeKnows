
// 校验规则
const SCHEMA = {
  type: 'object',
  required: ['articleName', 'articleContent', 'catalogId'],
  properties: {
    articleName: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
      errorMessage: '文章名称最少两个字符'
    },
    articleContent: {
      type: 'string',
      maxLength: 20000,
      minLength: 1,
      errorMessage: '文章内容不能为空'
    },
    catalogId: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
      errorMessage: '标签种类不能为空'
    }
  }
}

module.exports = SCHEMA
