import expect from 'expect.js'
import AttendanceInteractor from '../../app/attendance/Interactor'

describe('the attendance interactor', () => {
	describe('the create method', () => {
		it('should call Entity validate method with the correct data', () => {
			let validateWasCalled = false
			let receivedParams = null

			let inputMessage = {
				some: 'data'
			}

			let deps = {
				Entity: class {
					validate(inputMessage) {
						validateWasCalled = true
						receivedParams = inputMessage
						return new Promise((resolve, reject) => {
							resolve({})
						});
					}

					create() {}
				}
			}


			let instance = new AttendanceInteractor(deps)

			instance.create(inputMessage)

			expect(validateWasCalled).to.be.ok()
			expect(receivedParams).to.eql(inputMessage)
		})

		it('should call the Entity create method with same params if validation was ok', () => {
			let deps = {
				Entity: class {
					validate(inputMessage) {
						return new Promise((resolve, reject) => {
							resolve(inputMessage)
						});
					}

					create(inputMessage) {
						return new Promise((resolve, reject) => {
							expect(inputMessage).to.eql(params)
							resolve({})
						});
					}
				}	
			}

			let params = {
				some: 'data'
			}

			let instance = new AttendanceInteractor(deps)

			return instance.create(params)
		})
	})
})