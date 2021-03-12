import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => console.log('Get Route'));

export default route;
