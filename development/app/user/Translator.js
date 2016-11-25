import {statusCodes} from '../constants/constants'

export default class UserTranslator {
    constructor (deps = {}) {
        this.Interactor = deps.Interactor || require('./Interactor').default
    }

    post (req, res, next) {
        let userInteractor = new this.Interactor
        let inputMessage = req && req.body || {}

        userInteractor.create(inputMessage)
            .then((outputMessage) => {
                res.json(statusCodes.Created, outputMessage)
            })
            .catch(outputMessage => {
                let statusCode = outputMessage.statusCode || statusCodes.ServerError

                if (outputMessage.error && outputMessage.error.name) {
                    statusCode = statusCodes[outputMessage.error.name]
                }

                res.json(statusCode, outputMessage)
            })
    }
}
