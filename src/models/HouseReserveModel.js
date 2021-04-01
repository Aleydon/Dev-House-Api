import { Schema, model } from 'mongoose';

const ReserveSchema = Schema({
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  house: {
    type: Schema.Types.ObjectId,
    ref: 'Houses'
  }
});

export default model('Reserve', ReserveSchema);
