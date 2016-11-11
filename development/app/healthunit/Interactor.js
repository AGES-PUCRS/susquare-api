export default class HealthunitInteractor {
	constructor (deps = {}) {
		this.Entity = deps.Entity || require('./Entity').default
	}

	view(inputMessage){
		let healthunitEntity = new this.Entity

		return healthunitEntity.view(inputMessage)
	}

	create(inputMessage) {
		let healthunitEntity = new this.Entity

		return healthunitEntity.validate(inputMessage)
			.then(outputMessage => {
				healthunitEntity.create(outputMessage)
			})
			.catch(outputMessage => {
				outputMessage
			})
	}
}