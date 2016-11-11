import config from '../../config'
import mongoose from 'mongoose'
import axios from 'axios'

export default class HealthunitAdapter {
	constructor(deps = {}) {
		this.Healthunit = mongoose.model('Healthunit')
		this.URL = 'http://mobile-aceite.tcu.gov.br:80/mapa-da-saude/rest/'
	}

	find(inputMessage) {
		return this.Healthunit.find(inputMessage)
			.then(healthunits => {
				//console.log(healthunits)
				return healthunits
			})
	}

	findTCU(uriEstabelecimento){
		//console.log(uriEstabelecimento)
		return axios.get(uriEstabelecimento).then(response => {
			return response.data[0]
		}) 
	}

	save(inputMessage) {
		let healthunit = new this.Healthunit(inputMessage)

		return healthunit.save().then((data) => {
			return data
		})
	}
}