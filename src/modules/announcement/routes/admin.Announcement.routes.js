import express from 'express';
import useModuleViews from '../../../middlewares/moduleViews.js';
import { withPagination } from '../../../middlewares/paginations.js';
import * as controller from '../controllers/admin.Announcement.controller.js';
import setSection from '../../../middlewares/uploadLocation.js';
import upload from '../../../config/multerConfig.js';

const router = express.Router();

router.use(useModuleViews('announcement'));

// Admin view routes
router.route('/')
  .get(withPagination(10), controller.findAll)
  .post(setSection('announcements'), upload.fields([{ name: 'image_url', maxCount: 1 }]), controller.create);


router.route('/create')
  .get(controller.renderCreate)
  .post(setSection('announcements'), upload.fields([{ name: 'image_url', maxCount: 1 }]), controller.create);

router.route('/:id')
  .get(controller.findById)
  .put(setSection('announcements'), upload.fields([{ name: 'image_url', maxCount: 1 }]), controller.update)
  .delete(controller.destroy);

export default router;
