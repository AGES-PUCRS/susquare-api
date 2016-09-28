import restify from 'restify'
import config from './config'
import UserTranslator from './app/user/Translator'

let server = restify.createServer()

server.use(restify.bodyParser())

server.get('/test', (req, res, next) => {
    res.end('It\'s Working!')
})

server.get('/', (req, res, next) => {
    res.end('Hello!')
})

server.post('/user', (req, res, next) => {
    let userTranslator = new UserTranslator()
    userTranslator.post(req, res, next)
})

server.listen(config.port, () => {
    console.log('Server listening at ' + config.port)
})
