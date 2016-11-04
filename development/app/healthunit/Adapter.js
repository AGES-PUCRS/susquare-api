import config from '../../config'
import mongoose from 'mongoose'

export default class HealthunitAdapter {
	constructor(deps = {}) {
		this.Healthunit = mongoose.model('Healthunit')
		this.URL = 'http://mobile-aceite.tcu.gov.br:80/mapa-da-saude/rest/'
	}

	find(inputMessage) {
		let healthunit = new this.Healthunit(inputMessage)

		let codUnidade = inputMessage.params.id || {}


		return healthunit.find({ 'codUnidade':id })
	}

	save(inputMessage) {
		let healthunit = new this.Healthunit(inputMessage)

		return healthunit.save().then((data) => {
			return data
		})
	}
}