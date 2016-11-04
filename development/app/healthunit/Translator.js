import {statusCodes} from '../constants/constants'

export default class HealthunitTranslator {
	constructor (deps = {}) {
		this.Interactor = deps.Interactor || require('./Interactor').default
	}

	post(req, res, next) {
		const inputMessage = req && req.body || {}
		const healthunitInteractor = new this.Interactor

		healthunitInteractor.create(inputMessage)
			.then(outputMessage => {
				res.json(201, outputMessage)
			})
			.catch(outputMessage => {
				let statusCode = outputMessage.statusCode || statusCodes.ServerError
				
				if(outputMessage.error && outputMessage.error.name) {
					statusCode = statusCodes[outputMessage.error.name]
				}

				res.json(statusCode, outputMessage)
			})
	}
}