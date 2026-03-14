import { Router } from "express";
import * as rootController from "../controllers/root.controller.js";
import { dashboard_view } from "../controllers/admin.controller.js";


const router = Router();

// Home Route
router.get('/', rootController.index_view);
router.get('/about', rootController.about_view);
router.get('/contact', rootController.contact_view);
router.get('/executive-board', rootController.executive_board_view);
router.get('/news', rootController.news_view);
router.get('/admin', dashboard_view)


export default router;