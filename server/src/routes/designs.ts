import express from 'express';
import multer from 'multer';
import path from 'path';
import * as designController from '../controllers/designs';
import { auth } from '../middlewares/auth';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', auth, upload.single('image'), designController.createDesign);
router.get('/my-designs', auth, designController.getMyDesigns);
router.get('/public', designController.getPublicDesigns);

export default router;
