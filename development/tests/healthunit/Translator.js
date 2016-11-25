import expect from 'expect.js'
import HealthunitTranslator from '../../app/healthunit/Translator'

describe('The Healthunit Translator', () => {
	describe('post method', () => {
		it('should call interactor create method with post data', () => {
			let createdCalled = false
            let receivedMessage = null

            let deps = {
                Interactor: class {
                    create(inputMessage) {
                        createdCalled = true
                        receivedMessage = inputMessage
                        return new Promise ((resolve, reject) => {
                            resolve()
                        })
                    }
                }
            }

            let req = {
                body: {
                    some: 'data'
                }
            }

            let instance = new HealthunitTranslator(deps)
            instance.post(req)
            expect(createdCalled).to.be(true)
            expect(receivedMessage).to.eql({some:'data'})
		})
	})
})