import mongoose from 'mongoose'
import timeStamp from 'mongoose-timestamp'

const model = mongoose.model('Comment', {
    idAtendimento: String,
    tipoComentario: String, // C=Crítica, E=elogio como arruma isso?
    comentario: String,
	//timestampComentario: String,   //date?????????
	//imagens: [String]; /////como faz?
});

export default model