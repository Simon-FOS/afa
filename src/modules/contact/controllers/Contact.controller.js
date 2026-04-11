import * as service from '../services/Contact.service.js';
import { contactConfirmationToSender, contactNotificationToAdmin, sendEmail } from '../../../utils/email.js';
import dotenv from 'dotenv';
dotenv.config();


export const renderCreate = async (req, res) => {
  try {
    res.status(200).render('./contact', {
      pageTitle: "Create Contact",
    });
  } catch (err) {
    console.log(err)
    res.status(500).render('errors/500', { error: err });
  }
};

export const create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json({ success: true, redirectTo: "/contact", message: "Created successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
  (async () => {
    try {
      await sendEmail({
        to: req.body.email,
        subject: "We Received Your Message",
        html: contactConfirmationToSender(req.body.first_name),
      });
      await sendEmail({
        to: process.env.ADMIN_CONTACT_EMAIL,
        subject: "New Contact Form Submission",
        html: contactNotificationToAdmin(req.body.first_name, req.body.email, req.body.message),
      });
    } catch (err) {
      console.error("Error sending contact emails:", err);
    }
  })();
};