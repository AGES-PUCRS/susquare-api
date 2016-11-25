import Joi from 'joi'
export default class HealthunitEntity {
	constructor(deps = {}) {
		this.uuid = deps.uuid || require('node-uuid')
		this.Adapter = deps.Adapter || require('./Adapter').default
	}

	view(inputMessage){
		return new Promise((resolve, reject) => {
			let healthunitAdapter = new this.Adapter
			let params = inputMessage.params || {}

			healthunitAdapter.find(params)
				.then(susquareHealthUnitList => {
					let mergedHealthUnitsList = susquareHealthUnitList.map((susquareHealthUnit) =>{
						return new Promise((resolve, reject) => {
							healthunitAdapter.findTCU(susquareHealthUnit.uriEstabelecimento)
								.then((tcuHealthUnit) => { 
									let mergedHealthUnit = { //TO DO: arranjar um jeito mais agradavel de fazer isso
										...tcuHealthUnit,
										tempoEspera:susquareHealthUnit.tempoEspera,
										emailAgendamento:susquareHealthUnit.emailAgendamento,
										agendamentos:susquareHealthUnit.agendamentos,
										uriEstabelecimento:susquareHealthUnit.uriEstabelecimento
									}
									resolve(mergedHealthUnit)
								})
								.catch((error) => reject(error))
						})
					})

					Promise.all(mergedHealthUnitsList).then( array => resolve(array) )
				})
		})

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