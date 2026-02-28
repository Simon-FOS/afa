import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';

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


        //console.log(result.rows)
        res.render('index', {
            pageTitle: "Home",
            pageLogo: page_logo
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

// Event Page controller
export const event_view = async (req, res) => {
    try {
        res.render('event', {
            pageTitle: "Event",
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

