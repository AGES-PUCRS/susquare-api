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
		let Comment = mongoose.model('Comment')
		
		return Comment.find(function (err, tipoComment) {
		if (err) return handleError(err);
		console.log('deu ruim')
		}).then(data => data)
	}
}