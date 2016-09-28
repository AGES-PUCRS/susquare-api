import expect from 'expect.js'
import UserInteractor from '../../app/user/Interactor'

describe('The User Interactor', () => {
    describe('create method', () => {
        it('should call entity validation to check the params', () => {
            let createValidationCalled = false
            let receivedParams = null
            let inputMessage = {
                some: 'Message'
            }

            let deps = {
                userEntity: class {
                    createValidation(params) {
                        createValidationCalled = true
                        receivedParams = params

                        return new Promise(r => r())
                    }

                    create() {}
                }
            }

            let instance = new UserInteractor(deps)
            instance.create(inputMessage)
            expect(createValidationCalled).to.be.ok()
            expect(receivedParams).to.eql(inputMessage)
        })

        it('should return an error if validation failed', () => {
            let expectedOutputMessage = {
                error: 'Invalid input'
            }

            let deps = {
                userEntity: class {
                    createValidation(params) {
                        return new Promise((resolve,reject) => {
                            reject(expectedOutputMessage)
                        })
                    }
                }
            }

            let instance = new UserInteractor(deps)
            return instance.create().catch((outputMessage) => {
                expect(outputMessage).to.eql(expectedOutputMessage)
            })
        })

        it('should call create method if validation was ok', () => {
            let expectedOutputMessage = {
                data: 'Some data'
            }

            let deps = {
                userEntity: class {
                    createValidation(params) {
                        return new Promise((resolve, reject) => {
                            resolve(expectedOutputMessage)
                        })
                    }

                    create(inputMessage) {
                        expect(inputMessage).to.eql(expectedOutputMessage)
                        return new Promise((resolve, reject) => resolve())
                    }
                }
            }

            let instance = new UserInteractor(deps)
            return instance.create()
        })

        it('should return the result from the creation', () => {
            let expectedOutputMessage = {
                data: 'some data'
            }

            let deps = {
                userEntity: class {
                    createValidation(params) {
                        return new Promise((resolve, reject) => resolve())
                    }

                    create() {
                        return new Promise((resolve, reject) => resolve(expectedOutputMessage))
                    }
                }
            }

            let instance = new UserInteractor(deps)

            return instance.create()
                .then(outputMessage => {
                    expect(outputMessage).to.eql(expectedOutputMessage)
                })
        })
    })
})
