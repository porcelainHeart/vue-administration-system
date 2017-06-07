var DATA = require('./data')

function mockRunner (app) {
  app.get('*', function (req, res, next) {
    console.dir(req.url)
    console.log(' =  =  =  =  =  =  =  =  =  =  =  =  = ')
    next()
  })
  app.post('/api/client/mobile/login', function (req, res) {
    res.send(DATA.clientLogin)
  })
  app.get('/api/client', function (req, res) {
    var data = JSON.parse(JSON.stringify(DATA.clientList))
    var offset = +req.query.offset
    var limit = +req.query.limit
    var filterClients = DATA.clientList.data.clients
    filterClients = filterClients.slice(offset, offset + limit)

    data.data.clients = filterClients
    res.send(data)
  })
}

module.exports = mockRunner
