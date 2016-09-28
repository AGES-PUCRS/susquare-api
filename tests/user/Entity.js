import expect from 'expect.js'
import UserEntity from '../../app/user/Entity'

describe('The User Entity', () => {
    describe('createValidation method', () => {
        let deps = {
            adapter: {}
        }

        it('should require name', () => {
            let inputMessage = {
                email: 'example@example.com',
                password: '123'
            }

            let expectedError = {
                error: {
                    name: 'ValidationError',
                    messages: ['"name" is required']
                }
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage).catch(outputMessage => {
                expect(outputMessage).to.eql(expectedError)
            })
        })

        it('should require password', () => {
            let inputMessage = {
                name: 'Gabriel',
                email: 'gabriel@gabriel.com'
            }

            let expectedError = {
                error: {
                    name: 'ValidationError',
                    messages: ['"password" is required']
                }
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage).catch(outputMessage => {
                expect(outputMessage).to.eql(expectedError)
            })
        })

        it('should require email', () => {
            let inputMessage = {
                name: 'Gabriel',
                password: '123'
            }

            let expectedError = {
                error: {
                    name: 'ValidationError',
                    messages: ['"email" is required']
                }
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage).catch(outputMessage => {
                expect(outputMessage).to.eql(expectedError)
            })
        })

        it('password should be at least 8 characters long', () => {
            let inputMessage = {
                name: 'Gabriel',
                email: 'gabriel@gabriel.com',
                password: '123'
            }

            let expectedError = {
                error: {
                    name: 'ValidationError',
                    messages: ['"password" length must be at least 8 characters long']
                }
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage)
                .catch((error) => {
                    expect(error).to.eql(expectedError)
                })
        })


        it('should not allow additional parameters', () => {
            let inputMessage = {
                name: 'Gabriel',
                email: 'gabriel@gabriel.com',
                password: '12345789',
                extra: 'param'
            }

            let expectedError = {
                error: {
                    name: 'ValidationError',
                    messages: ['"extra" is not allowed']
                }
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage)
                .catch((error) => {
                    expect(error).to.eql(expectedError)
                })
        })

        it('should not allow invalid email', () => {
            let inputMessage = {
                name: 'Gabriel',
                password: '123456789',
                email: '123'
            }

            let expectedError = {
                error: {
                    name: 'ValidationError',
                    messages: ['"email" must be a valid email']
                }
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage)
                .catch((error) => {
                    expect(error).to.eql(expectedError)
                })
        })

        it('should verify if name is a string', () => {
            let inputMessage = {
                name: 123,
                email: 'gabriel@gabriel.com',
                password: '123456789'
            }

            let expectedError = {
                error: {
                    name: 'ValidationError',
                    messages: ['"name" must be a string']
                }
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage)
                .catch((error) => {
                    expect(error).to.eql(expectedError)
                })
        })

        it('should return the data if validation succeeded', () => {
            let inputMessage = {
                name: 'Gabriel',
                email: 'gabriel@gabriel.com',
                password: '12346789'
            }

            let expectedOutput = {
                name: 'Gabriel',
                email: 'gabriel@gabriel.com',
                password: '12346789'
            }

            let instance = new UserEntity(deps)

            return instance.createValidation(inputMessage)
                .then(output => {
                    expect(output).to.eql(expectedOutput)
                })
        })
    })

    describe('create method', () => {
        const inputMessage = {
            name: 'Gabriel',
            email: 'gabriel@gabriel.com',
            password: '12346789'
        }

        it('should generate an unique id and call adapter save method', function() {
            let expectedInputMessage = {
                id: 123,
                name: 'Gabriel',
                email: 'gabriel@gabriel.com',
                password: '12346789'
            }

            let saveMethodCalled = false
            let receivedMessage = null

            let deps = {
                adapter: class {
                    save(inputMessage) {
                        saveMethodCalled = true
                        receivedMessage = inputMessage

                        return new Promise(resolve => resolve())
                    }
                },

                uuid: {
                    v4() {

                        return 123
                    }
                }
            }

            let instance = new UserEntity(deps)
            instance.create(inputMessage)

            expect(receivedMessage).to.eql(expectedInputMessage)
        })
    })
})
