
// 校验规则
const SCHEMA = {
  type: 'object',
  required: ['userName', 'password', 'nickName', 'gender'],
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
      errorMessage: '用户名只能字母开头字母数字下划线'
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      errorMessage: '用户姓名不能为空',
      minLength: 1,
      maxLength: 255
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
      errorMessage: '性别只能是1-3的数字',
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
    }
  }
}

module.exports = SCHEMA
