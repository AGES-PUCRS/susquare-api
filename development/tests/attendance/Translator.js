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
})