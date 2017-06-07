var Mock = require('mockjs')
var R = Mock.Random
module.exports = {
  login: {
    code: 200,
    data: {
      'id|+1': 1,
      'token': '55b168fd35f0e832c99a9ce5514fcf0d9166495d8b5096e3056f58bf4b342101'
    }
  },
  list: {
    code: 200,
    data: {
      'clients|100': [
        {
          'id|+1': 1,
          name: R.name(),
          'mobile|18800000000-18899999999': 1,
          email: R.name(),
          notify_setting: {
            is_send_sms: R.bool()
          },
          'is_admin|1': [0, 1]
        }
      ],
      total: 100
    }
  }
}
