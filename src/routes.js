import { Router } from 'express';
import multer from 'multer';

import configUpload from './config/multer';
import UserController from './controllers/UserController';
import HouseController from './controllers/HouseController';

const route = Router();
const upload = multer(configUpload);

// User / Session routes
route.get('/', UserController.index);
route.post('/', UserController.store);
route.delete('/:id', UserController.destroy);
route.put('/:id', UserController.update);

// House routes
route.post('/houses', upload.single('thumbnail'), HouseController.store);

export default route;
