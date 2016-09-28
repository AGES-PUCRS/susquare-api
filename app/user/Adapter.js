export default class UserAdapter {
    constructor(deps = {}) {
        this.http = deps.http || require('axios')
        this.config = deps.config || require('../../config').default
    }

    save(data) {
        const url = this.config.databaseUrl + '/user/' + data.id + '.json'

        return this.http.post(url, data).then(response => {
            return JSON.stringify(response.data)
        })
    }
}
