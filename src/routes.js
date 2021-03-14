import { Router } from 'express';

import UserController from './controllers/UserController';

const route = Router();

route.get('/', UserController.index);
route.post('/', UserController.store);
route.delete('/:id', UserController.destroy);
route.put('/:id', UserController.update);

export default route;
