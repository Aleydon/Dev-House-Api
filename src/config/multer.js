import multer from 'multer';
import path from 'path';

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),

    filename(req, file, cb) {
      const extension = path.extname(file.originalname);
      const name = path.basename(file.originalname, extension);

      cb(null, `${name}-${Date.now()}${extension}`);
    }
  })
};
