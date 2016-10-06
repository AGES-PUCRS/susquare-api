export default class AttendanceTranslator {
	constructor (deps = {}) {
		this.Interactor = deps.Interactor || require('./Interactor').default
	}

	post(req, res, next) {
		const inputMessage = req && req.body || {}
		const attendanceInteractor = new this.Interactor

		attendanceInteractor.create(inputMessage)
	}
}