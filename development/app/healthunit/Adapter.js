import config from '../../config'
import mongoose from 'mongoose'

export default class HealthunitAdapter {
	constructor(deps = {}) {
		this.Attendance = mongoose.model('Healthunit')
	}

	save(inputMessage) {
		let attendance = new this.Attendance(inputMessage)

		return attendance.save().then((data) => {
			return data
		})
	}
}