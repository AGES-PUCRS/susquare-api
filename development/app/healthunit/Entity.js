import Joi from 'joi'
export default class HealthunitEntity {
	constructor(deps = {}) {
		this.uuid = deps.uuid || require('node-uuid')
		this.Adapter = deps.Adapter || require('./Adapter').default
	}

	view(inputMessage){
		let healthunitAdapter = new this.Adapter

		let codUnidade = inputMessage.params.id || {}

		return healthunitAdapter.find(inputMessage)
	}

	validate(inputMessage) {
		//TODO
        return new Promise((resolve, reject) => {
            let schema = Joi.object().keys({
			
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