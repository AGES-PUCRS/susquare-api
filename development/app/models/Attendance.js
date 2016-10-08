import mongoose from 'mongoose'

const model = mongoose.model('Attendance', {
      codUnidade: String,
      checkInMetodo: Number,
      latCheckIn: Number,
      longCheckIn: String,
      timestampCheckIn: String,
      dispositivoModelo: String,
      dispositivoMarca: String,
      dispositivoSisOp: String,
      dispositivoSisOpVersao: String,
})

export default model