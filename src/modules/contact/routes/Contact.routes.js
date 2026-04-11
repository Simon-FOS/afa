import express from 'express';
import useModuleViews from '../../../middlewares/moduleViews.js';
import * as controller from '../controllers/Contact.controller.js';

const router = express.Router();

router.use(useModuleViews('contact'));

// Public view routes


router.get('/', controller.renderCreate);
router.post('/', controller.create);

export default router;
