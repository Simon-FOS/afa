import dotenv from 'dotenv';
import { findAll as get_all_announcement } from '../modules/announcement/services/admin.Announcement.service.js';
import { findAll as get_all_event } from '../modules/event/services/admin.Event.service.js';

// Derive the equivalent of __dirname
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();


const page_logo = process.env.PAGELOGO

// Home Page controller
export const index_view = async (req, res) => {
    try {

        const get_all_announcement_result = await get_all_announcement({ limit: 1, offset: 0 });
        const get_all_event_result = await get_all_event({ limit: 1, offset: 0 });
        //console.log(result.rows)
        res.render('index', {
            pageTitle: "Home",
            pageLogo: page_logo,
            announcements: get_all_announcement_result.announcements,
            events: get_all_event_result.events
        });
    } catch (err) {
        res.status(500).render('./errors/500', { message: 'Internal Server Error', error: err.message });
    }
};

// About Page controller
export const about_view = async (req, res) => {
    try {
        res.render('about', {
            pageTitle: "About",
            pageLogo: page_logo
        });
    } catch (err) {
        res.status(500).render('./errors/500', { message: 'Internal Server Error', error: err.message });
    }
};

// Contact Page controller
export const contact_view = async (req, res) => {
    try {
        res.render('contact', {
            pageTitle: "Contact",
            pageLogo: page_logo
        });
    } catch (err) {
        res.status(500).render('./errors/500', { message: 'Internal Server Error', error: err.message });
    }
};

// Executive-board Page controller
export const executive_board_view = async (req, res) => {
    try {
        res.render('executive-board', {
            pageTitle: "Executive Board",
            pageLogo: page_logo
        });
    } catch (err) {
        res.status(500).render('./errors/500', { message: 'Internal Server Error', error: err.message });
    }
};

// News Page controller
export const news_view = async (req, res) => {
    try {
        res.render('news', {
            pageTitle: "News",
            pageLogo: page_logo
        });
    } catch (err) {
        res.status(500).render('./errors/500', { message: 'Internal Server Error', error: err.message });
    }

};

