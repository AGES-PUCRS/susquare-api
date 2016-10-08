import restify from 'restify'
import config from './config'
import UserTranslator from './app/user/Translator'
import axios from 'axios'
import mock from '../susquare.js'

const url = 'http://mobile-aceite.tcu.gov.br:80/mapa-da-saude/rest/'

let server = restify.createServer()

server.pre(restify.sanitizePath())

server.use(restify.bodyParser())

server.use(restify.queryParser())

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

server.get('/estabelecimentos', (req, res, next) => {
    let endpoint = url + 'estabelecimentos'

    const options = req.params

    res.send(mock)

    // axios.get(endpoint, {
    //         params: options
    //     })
    //     .then(response => res.send(response.data))
    //     .catch(error => res.send(error))
})

server.get('/estabelecimentos/:id', (req, res, next) => {
    let endpoint = url + 'estabelecimentos/unidade/' + req.params.id

    axios.get(endpoint)
       .then(response => res.send(200, response.data))
       .catch(errorMessage => res.send(errorMessage))
})

server.get('/estabelecimentos/:id/servicos/', (req, res, next) => {
    const endpoint = url + 'servicos/unidade/' + req.params.id

    axios.get(endpoint)
        .then(response => res.send(response.data))
        .catch(errorMessage => res.send(errorMessage))
})

server.get('/estabelecimentos/:id/profissionais', (req, res, next) => {
    const endpoint = url + 'profissionais/unidade/' + req.params.id

    axios.get(endpoint)
        .then(response => res.send(response.data))
        .catch(errorMessage => res.send(errorMessage))
})


server.get('/estabelecimentos/:id/especialidades', (req, res, next) => {
    const endpoint = url + 'especialidades/unidade/' + req.params.id

    axios.get(endpoint)
        .then(data => res.send(response.data))
        .catch(errorMessage => res.send(errorMessage))
})

server.get('/estabelecimentos/latitude/:latitude/longitude/:longitude/raio/:radius', (req, res, next) => {
    const endpoint = url + 'estabelecimentos/latitude/' + req.params.latitude + '/longitude/' + req.params.longitude + '/raio/' + req.params.radius

    const options = {
        texto: req.params.texto || null,
        categoria: req.params.categoria || null,
        campos: req.params.campos || null,
        pagina: req.params.pagina || null,
        quantidade: req.params.quantidade || 200
    }

    axios.get(endpoint, {
            params: options
        })
        .then(response => res.send(response.data))
        .catch(error => res.send(error))
})

server.listen(config.port, () => {
    console.log('Server listening at ' + config.port)
})

console.log(process.memoryUsage())