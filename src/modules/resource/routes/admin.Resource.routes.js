import express from 'express';
import useModuleViews from '../../../middlewares/moduleViews.js';
import { withPagination } from '../../../middlewares/paginations.js';
import * as controller from '../controllers/admin.Resource.controller.js';
import setSection from '../../../middlewares/uploadLocation.js';
import upload from '../../../config/multerConfig.js';

const router = express.Router();

router.use(useModuleViews('resource'));

// Admin view routes
router.route('/')
  .get(withPagination(10), controller.findAll)
  .post(setSection('resources'), upload.fields([{ name: 'file_url', maxCount: 1 }]), controller.create);


router.route('/create')
  .get(controller.renderCreate)
  .post(setSection('resources'), upload.fields([{ name: 'file_url', maxCount: 1 }]), controller.create);

router.route('/:id')
  .get(controller.findById)
  .put(setSection('resources'), upload.fields([{ name: 'file_url', maxCount: 1 }]), controller.update)
  .delete(controller.destroy);

export default router;
