import { Router } from 'express';
import multer from 'multer';

import configUpload from './config/multer';
import DashboardController from './controllers/DashboardController';
import HouseController from './controllers/HouseController';
import UserController from './controllers/UserController';

const route = Router();
const uploadFile = multer(configUpload);

// User / Session routes
route.get('/', UserController.index);
route.post('/', UserController.store);
route.delete('/:id', UserController.destroy);
route.put('/:id', UserController.update);

// House routes
route.post('/houses', uploadFile.single('thumbnail'), HouseController.store);
route.get('/houses', HouseController.index);
route.delete('/houses', HouseController.destroy);
route.put(
  '/houses/:house_id',
  uploadFile.single('thumbnail'),
  HouseController.update
);

// Dashboard route
route.get('/dashboard', DashboardController.show);

route.get('/files', (req, res) => {
  const image = req.file;
  return res.send(image);
});

export default route;
