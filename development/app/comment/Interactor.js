export default class CommentInteractor {
	constructor (deps = {}) {
		this.Entity = deps.Entity || require('./Entity').default
	}

	create(inputMessage) {
		let commentEntity = new this.Entity

		return commentEntity.validate(inputMessage)
			.then(outputMessage => commentEntity.create(outputMessage))
	}
	
	finde(tipoComentario){
		let commentEntity = new this.Entity
		
		return commentEntity.finde(tipoComentario)
	}
}