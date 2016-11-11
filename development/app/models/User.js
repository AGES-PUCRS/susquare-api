import mongoose from 'mongoose'

const model = mongoose.model('User', {
      name: String,
      email: String,
      password: Number,
});

export default model