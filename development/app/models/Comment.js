import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	idAtendimento: String,
    tipoComentario: String, // C=Crítica, E=elogio como arruma isso?
    comentario: String,
	imagens: [String]},
	{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
)

const model = mongoose.model('Comment', schema)
export default model