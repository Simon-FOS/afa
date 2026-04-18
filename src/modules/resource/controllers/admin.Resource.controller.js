import * as service from '../services/admin.Resource.service.js';
import { getPublicIdFromUrl } from '../../../utils/utils.js';
import cloudinary from '../../../config/cloudinaryConfig.js';

export const findAll = async (req, res) => {
  const { page, limit, offset } = req.pagination
  try {
    const data = await service.findAll({ limit, offset });
    res.status(200).render('./admins/resource_list', {
      success: true,
      layout: "admin",
      PageTitle: "Admin - resources",
      resources: data.resources,
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
    res.status(200).render('./admins/resource_update', {
      success: true,
      pageTitle: "Update Record",
      layout: "admin",
      resource: data,
    });
  } catch (err) {
    console.log(err)
    res.status(404).render('errors/404', { error: err });
  }
};

export const create = async (req, res) => {
  try {
    //handle files
    if (req.files && req.files['file_url'] && req.files['file_url'][0]) {
      req.body.file_url = req.files['file_url'][0].path; // Store the path of the uploaded file
    }

    //handle french files
    if (req.files && req.files['french_file_url'] && req.files['french_file_url'][0]) {
      req.body.french_file_url = req.files['french_file_url'][0].path; // Store the path of the uploaded file
    }

    const data = await service.create(req.body);
    res.status(201).json({ success: true, redirectTo: "/admin/resource", message: "Created successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const update = async (req, res) => {
  try {
    const fileUrl = req.files && req.files['file_url'] && req.files['file_url'][0] ? req.files['file_url'][0].path : undefined;
    const frenchFileUrl = req.files && req.files['french_file_url'] && req.files['french_file_url'][0] ? req.files['french_file_url'][0].path : undefined;
    const data = { ...req.body, file_url: fileUrl, french_file_url: frenchFileUrl };

    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Resource not found' });

    if (data.file_url === undefined || data.file_url === null || data.file_url === '') {
      data.file_url = item.file_url; // Remove file_url from data if it's 'undefined' or not provided
    }

    if (data.french_file_url === undefined || data.french_file_url === null || data.french_file_url === '') {
      data.french_file_url = item.french_file_url; // Remove french_file_url from data if it's 'undefined' or not provided
    }

    if (data.file_url && item.file_url && data.file_url !== item.file_url) {
      // If there's a new file_url and it's different from the existing one, delete the old image from Cloudinary
      const publicId = getPublicIdFromUrl(item.file_url);
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log('Error deleting image from Cloudinary:', err);
        throw new Error('Error deleting old image from Cloudinary: ' + err.message);
      }
    }

    if (data.french_file_url && item.french_file_url && data.french_file_url !== item.french_file_url) {
      // If there's a new french_file_url and it's different from the existing one, delete the old image from Cloudinary
      const publicId = getPublicIdFromUrl(item.french_file_url);
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log('Error deleting image from Cloudinary:', err);
        throw new Error('Error deleting old image from Cloudinary: ' + err.message);
      }
    }
    const update = await service.update(req.params.id, data);
    res.status(200).json({ success: true, data, redirectTo: `/admin/resource/${req.params.id}`, message: "Updated successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const destroy = async (req, res) => {
  try {
    const data = await service.destroy(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully', redirectTo: "/admin/resource" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const renderCreate = async (req, res) => {
  try {
    res.status(200).render('./admins/resource_create', {
      pageTitle: "Create resource",
      layout: "admin",
    });
  } catch (err) {
    console.log(err)
    res.status(500).render('errors/500', { error: err });
  }
};