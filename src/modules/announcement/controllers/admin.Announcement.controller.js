import * as service from '../services/admin.Announcement.service.js';
import { getPublicIdFromUrl } from '../../../utils/utils.js';
import cloudinary from '../../../config/cloudinaryConfig.js';

export const findAll = async (req, res) => {
  const { page, limit, offset } = req.pagination
  try {
    const data = await service.findAll({ limit, offset });
    res.status(200).render('./admins/announcement_list', {
      success: true,
      pageTitle: "Admin",
      layout: "admin",
      PageTitle: "Admin",
      announcements: data.announcements,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      currentPage: page
    });
  } catch (err) {
    console.log(err)
    res.status(500).render('errors/500', { error: err });
  }
};

export const findById = async (req, res) => {
  try {
    const data = await service.findById(req.params.id);
    res.status(200).render('./admins/announcement_update', {
      success: true,
      pageTitle: "Update Record",
      layout: "admin",
      PageTitle: "Admin",
      announcement: data,
    });
  } catch (err) {
    console.log(err)
    res.status(404).render('errors/404', { error: err });
  }
};

export const create = async (req, res) => {
  try {

    //handle images
    if (req.files && req.files['image_url'] && req.files['image_url'][0]) {
      req.body.image_url = req.files['image_url'][0].path; // Store the path of the uploaded image
    }

    const data = await service.create(req.body);
    res.status(201).json({ success: true, redirectTo: "/admin/announcement", message: "Created successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const update = async (req, res) => {
  try {
    const imageUrl = req.files && req.files['image_url'] && req.files['image_url'][0] ? req.files['image_url'][0].path : undefined;
    const data = { ...req.body, image_url: imageUrl };

    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Announcement not found' });

    if (data.image_url === undefined || data.image_url === null || data.image_url === '') {
      data.image_url = item.image_url; // Remove image_url from data if it's 'undefined' or not provided
    }

    if (data.image_url && item.image_url && data.image_url !== item.image_url) {
      // If there's a new image_url and it's different from the existing one, delete the old image from Cloudinary
      const publicId = getPublicIdFromUrl(item.image_url);
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log('Error deleting image from Cloudinary:', err);
        throw new Error('Error deleting old image from Cloudinary: ' + err.message);
      }
    }
    const upate = await service.update(req.params.id, data);
    res.status(200).json({ success: true, data, redirectTo: `/admin/announcement/${req.params.id}`, message: "Updated successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const destroy = async (req, res) => {
  try {
    const data = await service.destroy(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully', redirectTo: "/admin/announcement" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const renderCreate = async (req, res) => {
  try {
    res.status(200).render('./admins/announcement_create', {
      pageTitle: "Create Announcement",
      layout: "admin",
      PageTitle: "Admin"
    });
  } catch (err) {
    console.log(err)
    res.status(500).render('errors/500', { error: err });
  }
};