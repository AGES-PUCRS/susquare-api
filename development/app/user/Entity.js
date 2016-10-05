import Joi from 'joi'

export default class UserEntity {
    constructor(deps = {}) {
        this.adapter = deps.adapter || require('./Adapter').default
        this.uuid = deps.uuid || require('node-uuid')
    }

    createValidation(inputMessage) {
        return new Promise((resolve, reject) => {
            let schema = Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).required()
            })

            let result = Joi.validate(inputMessage, schema)

            if (result.error) {
                let outputMessage = {
                    error: {
                        name: 'ValidationError',
                        messages: result.error.details.map(e => e.message)
                    }
                }

                reject(outputMessage)
            } else {
                resolve(result.value)
            }
        })
    }

    create(inputMessage) {
        let adapter = new this.adapter
        let data = {
            id: this.uuid.v4(),
            ...inputMessage
        }

        return adapter.save(data)
    }
}
