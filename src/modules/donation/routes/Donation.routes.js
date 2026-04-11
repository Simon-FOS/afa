import express from 'express';
import useModuleViews from '../../../middlewares/moduleViews.js';
import { withPagination } from '../../../middlewares/paginations.js';
import * as controller from '../controllers/Donation.controller.js';

const router = express.Router();

router.use(useModuleViews('donation'));

// Public view routes
router.get('/', controller.donationForm);
router.post('/', controller.initiateDonation);
router.get('/verify', controller.verifyDonation);


export default router;
