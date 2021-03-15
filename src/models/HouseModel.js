/* eslint-disable comma-dangle */
import { model, Schema, ObjectId } from 'mongoose';

const HouseSchema = Schema(
  {
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
      type: ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default model('Houses', HouseSchema);
