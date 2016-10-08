import mongoose from 'mongoose'

export default mongoose.model('Establishment', {
      codUnidade: String,
      tempoEspera: Number,
      emailAgendamento: String,
      uriAtendimento: String
});
