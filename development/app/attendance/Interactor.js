export default class AttendanceInteractor {
	constructor (deps = {}) {
		this.Entity = deps.Entity || require('./Entity').default
	}

	create(inputMessage) {
		let attendanceEntity = new this.Entity

		return attendanceEntity.validate(inputMessage)
			.then(outputMessage => {
				return attendanceEntity.create(outputMessage)
			})
	}
}