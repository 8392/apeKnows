const redis = require('redis')
const client = redis.createClient()

client.on('error', function(error) {
  console.error(error)
})

/*
  设置
*/

const set = (key, val, timeout = 60 * 60) => {
  if(typeof val === 'object') {
    val = JSON.stringify(val)
  }
  client.set(key, val)
  client.expire(key, timeout)
}

/*
  获取
*/
const get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if(err) {
        reject(err)
        return
      }
      if(val == null) {
        resolve(null)
        return
      }
      try{
        resolve(JSON.parse(val))
      }catch(ex) {
        // 当不是json时，抛出值
        resolve(val)
      }
    })
  })
}

module.exports = {
  get,
  set
}