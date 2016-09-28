export default class UserInteractor {
    constructor(deps = {}) {
        this.userEntity = deps.userEntity || require('./Entity').default
    }

    create(inputMessage) {
        let userEntity = new this.userEntity
        return userEntity.createValidation(inputMessage)
            .then(outputMessage => userEntity.create(outputMessage))
    }
}
