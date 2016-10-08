import {statusCodes} from '../constants/constants'

export default class EstablishmentTranslator {
	constructor (deps = {}) {
		this.Interactor = deps.Interactor || require('./Interactor').default
	}
 
	post(req, res, next) {
		const inputMessage = req && req.body || {}
		const attendanceInteractor = new this.Interactor

		attendanceInteractor.create(inputMessage)
			.then(outputMessage => {
				res.json(201, outputMessage)
			})
			.catch(outputMessage => {
				let statusCode = outputMessage.statusCode || statusCode.ServerError

				if(outputMessage.error && outputMessage.error.name) {
					statusCode = statusCodes[outputMessage.error.name]
				}

				res.json(statusCode, outMessage)
			})
	}
}