/* eslint-disable comma-dangle */
import { model, Schema, ObjectId } from 'mongoose';

const HouseSchema = Schema(
  {
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: String,
    type: {
      ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Houses', HouseSchema);
