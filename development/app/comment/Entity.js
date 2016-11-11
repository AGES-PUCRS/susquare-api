import Joi from 'joi'
export default class CommentEntity {
	constructor(deps = {}) {
		this.uuid = deps.uuid || require('node-uuid')
		this.Adapter = deps.Adapter || require('./Adapter').default
	}

	validate(inputMessage) {
        return new Promise((resolve, reject) => {
            let schema =  //fazer verificações e tal		
				Joi.object().keys({
				idAtendimento: Joi.string().required(),
				tipoComentario: Joi.string().valid(['C', 'E']).required(),
				comentario: Joi.string().required(), 
				//imagens: Joi.array().items(imagem) //joi para imagem separado
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
	
	finde(tipoComentario){
		let commentAdapter = new this.Adapter
		return commentAdapter.finde(tipoComentario)
	}
}