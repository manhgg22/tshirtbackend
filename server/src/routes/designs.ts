import express from 'express';
import multer from 'multer';
import * as designController from '../controllers/designs';
import { protect } from '../middlewares/auth'; // ✅ ĐÚNG

const router = express.Router();

// ví dụ cấu hình upload (nếu bạn đã có thì giữ cái của bạn)
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.single('image'), designController.createDesign); // ✅
router.get('/my-designs', protect, designController.getMyDesigns);               // ✅

export default router;
