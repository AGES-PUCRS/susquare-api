import mongoose from 'mongoose'
//import appointmentModel from './Appointment'
const model = mongoose.model('Healthunit', {
		codUnidade: String,
		tempoEspera: Number,
		emailAgendamento: String,
        //agendamentos: [appointmentModel],
        agendamentos: [String], //placeholder
        uriEstabelecimento: String
});

export default model