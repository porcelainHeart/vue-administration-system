var Mock = require('mockjs')
var client = require('./client')

module.exports = {
  clientLogin: Mock.mock(client.login),
  clientList: Mock.mock(client.list)
}
