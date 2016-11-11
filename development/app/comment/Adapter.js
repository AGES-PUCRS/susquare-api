import config from '../../config'
import mongoose from 'mongoose'

export default class CommentAdapter {
	constructor(deps = {}) {
		this.Comment = mongoose.model('Comment')
	}

	save(inputMessage) {
		let comment = new this.Comment(inputMessage)

		return comment.save().then((data) => data)
	}
	
	finde(tipoComentario){
		
		return this.Comment.find(tipoComentario).then(data => data)
	}
}