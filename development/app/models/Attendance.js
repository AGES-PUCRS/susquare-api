import mongoose from 'mongoose'
const schema = new mongoose.Schema(
	 {
      codUnidade: String,
      checkInMetodo: Number,
      latCheckIn: Number,
      longCheckIn: String,
      timestampCheckIn: String,
      dispositivoModelo: String,
      dispositivoMarca: String,
      dispositivoSisOp: String,
      dispositivoSisOpVersao: String
  }, { timestamps: { createdAt: 'created_at' } }
)

const model = mongoose.model('Attendance', schema);

export default model