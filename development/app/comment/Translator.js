import {statusCodes} from '../constants/constants'

export default class CommentTranslator {
	constructor (deps = {}){
		this.Interactor = deps.Interactor || require('./Interactor').default
	}

	post(req, res, next) {
		const inputMessage = req && req.body || {}
		const commentInteractor = new this.Interactor

		commentInteractor.create(inputMessage)
			.then(outputMessage => res.json(201, outputMessage))
			.catch(outputMessage => {
				let statusCode = outputMessage.statusCode || statusCodes.ServerError
				
				if(outputMessage.error && outputMessage.error.name) {
					statusCode = statusCodes[outputMessage.error.name]
				}

				res.json(statusCode, outputMessage)
			})
	}
	
	get(req, res, next){
		const commentInteractor = new this.Interactor

		commentInteractor.finde({tipoComentario: "E"})
			.then(resposta => res.json(200, resposta.data))
			.catch(outputMessage => {
				let statusCode = outputMessage.statusCode || statusCodes.ServerError
				
				if(outputMessage.error && outputMessage.error.name) {
					statusCode = statusCodes[outputMessage.error.name]
				}

				res.json(statusCode, outputMessage)
			})
	}
}