import expect from 'expect.js'
import CommentInteractor from '../../app/comment/Interactor'

// Falhando os 2
describe('The Comment Interactor', () => {
    describe('create method', () => {
        it('should call entity validation to check the params', () => {
            let createValidationCalled = false
            let receivedParams = null
            let inputMessage = {
                some: 'Message'
            }

            let deps = {
                CommentEntity: class {
                    createValidation(params) {
                        createValidationCalled = true
                        receivedParams = params

                        return new Promise(resolve => resolve())
                    }

                    create() {}
                }
            }

            let instance = new CommentInteractor(deps)
            instance.create(inputMessage)
            expect(createValidationCalled).to.be.ok()
            expect(receivedParams).to.eql(inputMessage)
        })

        it('should return the result from the creation', () => {
            let expectedOutputMessage = {
                data: 'some data'
            }

            let deps = {
                CommentEntity: class {
                    createValidation(params) {
                        return new Promise((resolve, reject) => resolve())
                    }

                    create() {
                        return new Promise((resolve, reject) => resolve(expectedOutputMessage))
                    }
                }
            }

            let instance = new CommentInteractor(deps)

            return instance.create()
                .then(outputMessage => {
                    expect(outputMessage).to.eql(expectedOutputMessage)
                })
        })
    })
})
