/* 
  返回数据基本格式
*/

class BaseModel {
  constructor({ code, data, message }) {
    this.code = code
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/*
  成功返回数据
*/

class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      code: 1,
      data
    })
  }
}

/* 
  失败返回数据
*/

class ErrorModel extends BaseModel {
  constructor({ code, message }) {
    super({
      code,
      message
    })
  }
}


module.exports = {
  SuccessModel,
  ErrorModel
}

