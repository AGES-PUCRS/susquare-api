export default class EstablishmentInteractor {
	constructor (deps = {}) {
		this.Entity = deps.Entity || require ('./Entity').default
	}

	create(inputMessage) {
		let attendanceEntity = new this.Entity

		return attendanceEntity.validate(inputMessage)
			.then(outputMessage => {
				attendanceEntity.create(outputMessage)
			})
	}
}