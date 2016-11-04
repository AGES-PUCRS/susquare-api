export default class HealthunitInteractor {
	constructor (deps = {}) {
		this.Entity = deps.Entity || require('./Entity').default
	}

	create(inputMessage) {
		let healthunitEntity = new this.Entity

		return healthunitEntity.validate(inputMessage)
			.then(outputMessage => {
				healthunitEntity.create(outputMessage)
			})
	}
}