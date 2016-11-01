import Joi from 'joi'
export default class CommentEntity {
	constructor(deps = {}) {
		this.uuid = deps.uuid || require('node-uuid')
		this.Adapter = deps.Adapter || require('./Adapter').default
	}

	validate(inputMessage) {
        return new Promise((resolve, reject) => {
            let schema =  //fazer verificações e tal
			
				/*Joi.object().keys({
				codUnidade: Joi.string().required(),
				checkInMetodo: Joi.number().required(),
				latCheckIn: Joi.number().required(),
				longCheckIn: Joi.string().required(),
				timestampCheckIn: Joi.date().timestamp().required(),
				dispositivoModelo: Joi.string().required(),
				dispositivoMarca: Joi.string().required(),
				dispositivoSisOp: Joi.string().required(),
				dispositivoSisOpVersao: Joi.string().required()*/
			})


            let result = Joi.validate(inputMessage, schema)

            if (result.error) {
                let outputMessage = {
                    error: {
                        name: 'ValidationError',
                        messages: result.error.details.map(e => e.message)
                    }
                }

                reject(outputMessage)
            } else {
                resolve(result.value)
            }
        })
    }

	create(inputMessage) {
		let commentAdapter = new this.Adapter

		let data = {
				...inputMessage
		}

		return commentAdapter.save(data)
	}
}