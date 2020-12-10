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
      code: 0,
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

/*
  分页返回统一格式
*/

class TableModel extends BaseModel {
  constructor(query, data = {}) {
    const tableData = data.rows.map((curr) => {
      return curr.dataValues
    })
    const page = {
      total: data.count,
      ...query
    }
    super({
      code: 0,
      data: {
        page,
        tableData
      }
    })
  }
}


module.exports = {
  SuccessModel,
  ErrorModel,
  TableModel
}

