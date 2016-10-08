import mongoose from 'mongoose'

let UserSchema = new mongoose.schema({
	numTelefone: String,
	favoritos: [String]
}, timestamps: {
	timestampCadastro: 'created_at'
})

export default mongoose.model('User', UserSchema)