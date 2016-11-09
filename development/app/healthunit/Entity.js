import Joi from 'joi'
export default class HealthunitEntity {
	constructor(deps = {}) {
		this.uuid = deps.uuid || require('node-uuid')
		this.Adapter = deps.Adapter || require('./Adapter').default
	}

	view(inputMessage){
		let healthunitAdapter = new this.Adapter

		console.log(inputMessage)

		let params = inputMessage.params || {}
		let healthunits = healthunitAdapter.find(params)
		

		//return healthunitAdapter.find(params)
	}

	validate(inputMessage) {
		//TODO
        return new Promise((resolve, reject) => {
            let schema = Joi.object().keys({
				codUnidade: Joi.string().required(),
				tempoEspera: Joi.number(),
				emailAgendamento: Joi.string().required(),
				uriEstabelecimento: Joi.string().required()
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
		let healthunitAdapter = new this.Adapter

		let data = {
				...inputMessage
		}

		return healthunitAdapter.save(data)
	}
}