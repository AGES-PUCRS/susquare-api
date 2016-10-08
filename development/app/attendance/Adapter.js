import config from '../../config'
import mongoose from 'mongoose'

export default class AttendanceAdapter {
	constructor(deps = {}) {

	}

	save(inputMessage) {

		mongoose.connect(config.databaseUrl);

		var Attendance = mongoose.model('tico', {
			codUnidade: String,
			checkInMetodo: Number,
			latCheckIn: Number,
			longCheckIn: String,
			timestampCheckIn: String,
			dispositivoModelo: String,
			dispositivoMarca: String,
			dispositivoSisOp: String,
			dispositivoSisOpVersao: String
		});

		var attendance = new Attendance(inputMessage);

		attendance.save(function (err) {
		if (err) {
		console.log(err);
		} else {
		console.log('meow');
		}
		});

		/*let Schema = mongoose.Schema;

		let attendanceSchema = new Schema()

		let Attendance 

		try {
			Attendance = mongoose.model('Attendance')
		} catch (error) {
			Attendance = mongoose.model('Attendance', attendanceSchema)
		}

		let attendance = new Attendance(inputMessage)
		
		mongoose.connect()

		attendance.save()

		mongoose.connection.close()*/
	}
}