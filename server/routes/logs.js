import express from 'express';
import multer from 'multer';
import empteyBody from '../middlewares/empteyBody.js';

import {
  getLogs,
  getSingleLog,
  getFiles,
  createLogs,
  deletLog,
  editLog,
  authPost,
} from '../controllers/logs.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()};;${file.originalname}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router
  .route('/logs')
  .get(getLogs)
  .post(upload.array('files'), empteyBody, createLogs);

router.route('/files/:fileName').get(getFiles);

router
  .route('/logs/:id')
  .get(getSingleLog)
  .delete(deletLog)
  .put(upload.array('files'), empteyBody, editLog);

router.route('/auth').post(authPost);
export default router;
