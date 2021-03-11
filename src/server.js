/* Created by Roberto Aleydon */

import express, { json } from 'express';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(json());

app.get('/', (req, res) => res.send('Server Work!!!'));

app.listen(PORT, (req, res) => console.log(`Server running on port ${PORT}`));
