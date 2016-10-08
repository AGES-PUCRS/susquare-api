import config from '../../config'
import mongoose from 'mongoose'

export default class AttendanceAdapter {
	constructor(deps = {}) {
		this.Attendance = mongoose.model('Attendance')
	}

	save(inputMessage) {
		let attendance = new this.Attendance(inputMessage)

		return attendance.save().then((data) => {
			return data
		})
	}
}