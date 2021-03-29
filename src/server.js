/* Created by Roberto Aleydon */

import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import Route from './routes';

mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connection sucessful'))
  .catch((err) => console.log(`MongoDB connection failed ${err}`));

const app = express();
const PORT = process.env.PORT || 3333;

app.use(json());
app.use(cors());
app.use(Route);
app.use(express.urlencoded({ extended: false }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(PORT, (req, res) => console.log(`Server running on port ${PORT}`));
