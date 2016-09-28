import expect from 'expect.js'
import UserAdapter from '../../app/user/Adapter'
import config from '../../config'

describe('The User Adapter', () => {

    describe('save method', () => {
        let inputMessage = {
            id: '123',
            name: 'gabriel',
            email: 'gabriel@gabriel.com',
            password: '123456789'
        }

        it('should post to the database with the right data', () => {
            let expectedData = null

            let deps = {
                http: {
                    post: (url, data) => {
                        expectedData = data
                        return new Promise(resolve => resolve(data))
                    }
                }
            }

            let instance = new UserAdapter(deps)

            instance.save(inputMessage)

            expect(expectedData).to.eql(inputMessage)
        })
    })
})
