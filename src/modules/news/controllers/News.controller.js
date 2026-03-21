import * as service from '../services/News.service.js';
import { findAll as resouceFindAll } from '../../resource/services/admin.Resource.service.js'

export const findAll = async (req, res) => {
  const { page, limit, offset } = req.pagination
  try {
    const data = await service.findAll({ limit, offset });
    const resources = await resouceFindAll({ limit: 5, offset: 0 });
    res.status(200).render('./news_list', {
      success: true,
      pageTitle: "",
      resources: resources.resources,
      newss: data.newss,
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
    res.status(200).render('./news_single', {
      success: true,
      pageTitle: "Details",
      news: data,
    });
  } catch (err) {
    console.log(err)
    res.status(404).render('errors/404', { error: err });
  }
};