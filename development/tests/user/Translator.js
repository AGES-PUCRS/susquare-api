import expect from 'expect.js'
import UserTranslator from '../../app/user/Translator'

describe('The User Translator', () => {
    describe('post method', () => {
        it('should call Interactor create method with post data', () => {
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

            let instance = new UserTranslator(deps)
            instance.post(req)
            expect(createdCalled).to.be(true)
            expect(receivedMessage).to.eql({some:'data'})
        })

        it('should respond with status code 201 when user was created', (done) => {
            let deps = {
                Interactor: class {
                    create() {
                        return new Promise((resolve, reject) => {
                            resolve({})
                        })
                    }
                }
            }

            // Object with a function inside, that takes statusCode and body as params
            // it'll be called inside translator as res.json(statusCode, outputMessage)
            let res = {
                json(statusCode, body) {
                    expect(statusCode).to.eql(201)
                    done()
                }
            }

            let instance = new UserTranslator(deps)

            instance.post(null, res)
        })

        it('should respond with status code 401 if there was an validation error', (done) => {
            let expectedError = {error: {name: 'ValidationError'}}
            let deps = {
                Interactor: class {
                    create() {
                        return new Promise((resolve, reject) => {
                            reject(expectedError)
                        })
                    }
                }
            }

            let res = {
                json(statusCode, body) {
                    expect(statusCode).to.eql(400)
                    expect(body).to.eql(expectedError)
                    done()
                }
            }

            let instance = new UserTranslator(deps)

            instance.post(null, res)
        })

        it('should respond with status code 500 if there was an internal error', (done) => {
            let deps = {
                Interactor: class {
                    create() {
                        return new Promise((resolve, reject) => {
                            reject({error: 'some error'})
                        })
                    }
                }
            }

            let res = {
                json(statusCode, body) {
                    expect(statusCode).to.be.eql(500)
                    expect(body).to.be.eql({error: 'some error'})
                    done()
                }
            }

            let instance = new UserTranslator(deps)
            instance.post(null, res)
        })
    })
})
