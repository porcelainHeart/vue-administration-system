const Mock = require('mockjs')
const client = require('./client')

module.exports = {
  clientLogin: Mock.mock(client.login),
  clientList: Mock.mock(client.list)
}
