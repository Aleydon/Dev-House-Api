import { Router } from 'express';

import UserController from './controllers/User.controller';

const route = Router();

route.get('/', UserController.index);
route.post('/', UserController.store);
route.delete('/:id', UserController.destroy);

export default route;
