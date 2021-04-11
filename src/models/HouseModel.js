import { model, Schema } from 'mongoose';

const HouseSchema = Schema(
  {
    thumbnail: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default model('Houses', HouseSchema);
