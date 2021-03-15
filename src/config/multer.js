import multer from 'multer';
import path from 'path';

export default multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/tmp/my-uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  }
});
