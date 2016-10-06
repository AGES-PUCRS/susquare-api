import expect from 'expect.js'
import AttendanceTranslator from '../../app/attendance/Translator'

describe('The Attendance Translator', () => {
	describe('The post method', () => {
		it('should call the interactor create method with post data', () => {
			let createWasCalled = false
			let receivedMessage = null

			const deps = {
				Interactor: class {
					create(inputMessage) {
						createWasCalled = true
						receivedMessage = inputMessage
						return new Promise((resolve, reject) => resolve())
					}
				}
			}

			let instance = new AttendanceTranslator(deps)
			
			const req = {
				body: {
					some: 'data'
				}
			}

			instance.post(req)

			expect(createWasCalled).to.be(true)
			expect(receivedMessage).to.eql({some: 'data'})
		})
	})

	it('should respond with status code 201 when a attendance was created', (done) => {
		const deps = {
			Interactor: class {
				create() {
					return new Promise((resolve, reject) => {
						resolve({})
					})
				}
			}
		}

		let res = {
			json(statusCode, body) {
				expect(statusCode).to.eql(201)
				done()
			}
		}

		let instance = new AttendanceTranslator(deps)

		instance.post(null, res)
	})

	it('should respond with status code 500 when occurs a server error', (done) => {
		const deps = {
			Interactor: class {
				create(inputMessage) {
					return new Promise((resolve, reject) => {
						reject({})
					})
				}
			}
		}

		const res = {
			json(statusCode, body) {
				expect(statusCode).to.eql(500)
				done()
			}
		}

		let instance = new AttendanceTranslator(deps)

		instance.post(null, res)
	})

	it('should respond with 401 when occurs a validation error', (done) => {
		const expectedError = {error: {name:'ValidationError'}}

		let deps = {
			Interactor: class {
				create(inputMessage) {
					return new Promise((resolve, reject) => {
						reject(expectedError)	
					})
				}
			}
		}

		let res = {
			json(statusCode, body) {
				expect(body).to.eql(expectedError)
				done()
			}
		}

		let instance = new AttendanceTranslator(deps)
		instance.post(null, res)
	})
})