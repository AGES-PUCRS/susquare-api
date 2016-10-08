import config from '../../config'
import mongoose from 'mongoose'

export default class AttendanceAdapter {
	constructor(deps = {}) {
		this.Attendance = mongoose.model('Attendance')
	}

	save(inputMessage) {
		return new Promise((resolve, reject) => {

			let attendance = new this.Attendance(inputMessage)

			attendance.save((err) => {
				if (err) {
					reject(err)
				} else {
					resolve({})
				}
			})
		})
	}
}