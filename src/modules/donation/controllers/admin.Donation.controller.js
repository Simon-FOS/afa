import * as service from '../services/admin.Donation.service.js';

export const findAll = async (req, res) => {
  const {page, limit, offset} = req.pagination
  try {
    const data = await service.findAll({limit, offset});
    res.status(200).render('./admins/donation_list', {
      success: true,
      pageTitle: "Admin",
      layout: "admin", 
      PageTitle: "Admin",
      donations: data.donations,
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
    res.status(200).render('./admins/donation_update', {
      success: true,
      pageTitle: "Update Record",
      layout: "admin", 
      PageTitle: "Admin",
      donation: data,
    });
  } catch (err) {
  console.log(err)
    res.status(404).render('errors/404', { error: err });
  }
};

export const create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json({ success: true, redirectTo: "/admin/donation", message: "Created successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const update = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.status(200).json({ success: true, data, redirectTo: `/admin/donation/${req.params.id}`, message: "Updated successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const destroy = async (req, res) => {
  try {
    const data = await service.destroy(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully', redirectTo: "/admin/donation" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const renderCreate = async (req, res) => {
  try {
    res.status(200).render('./admins/donation_create', {
      pageTitle: "Create Donation", 
      layout: "admin", 
      PageTitle: "Admin"
    });
  } catch (err) {
    console.log(err)
    res.status(500).render('errors/500', { error: err });
  }
};