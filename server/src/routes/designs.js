import express from 'express';
import multer from 'multer';
import * as designController from '../controllers/designs.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.single('image'), designController.createDesign);
router.get('/my-designs', protect, designController.getMyDesigns);

export default router;