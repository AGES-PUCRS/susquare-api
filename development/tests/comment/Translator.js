import expect from 'expect.js'
import CommentTranslator from '../../app/comment/Translator'

describe('The Comment Translator', () => {
	describe('post method', () => {
		it('should call create from interactor', () => {
			let createdCall = false;
			let receivedMessage = null;
			
			let deps = {
				interactor: class {
					create(inputMessage) {
						createdCalled = true
						receivedMessage = inputMessage
						return new Promise ((resolve, reject) =>{
							resolve()
						})
					}
				}
			}
			
			let req = {
                body: {
                    some: 'comment data'
                }
            }
			
			let instance = new CommentTranslator(deps)
            instance.post(req)
            expect(createdCalled).to.be(true)
            expect(receivedMessage).to.eql({some:'comment data'})
		})
		
		it('should respond with status code 201', () => {
			let deps = {
				interactor: class {
					create() {
						return new Promise ((resolve, reject) =>{
							resolve()
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
			
			let instance = new CommentTranslator(deps)
			instance.post(null, res)
		})
		
		it('should respond with status code ???')
		it('should respond with status code ???')
		it('should respond with status code ???')
	}
}