import db from '../../../models/index.cjs';



export const findAll = async ({ limit, offset }) => {
  try {
    const { rows: news, count: totalItems } = await db.News.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['created_at', 'DESC'], ['updated_at', 'DESC']],
    })
    return {
      news,
      totalItems,
      totalPages: Math.ceil(totalItems / limit)
    };
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching records: ' + error.message);
  }
};

export const findById = async (id) => {
  try {
    const item = await db.News.findByPk(id);
    if (!item) throw new Error('Not found');
    return item;
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching record: ' + error.message);
  }
};

export const create = async (data) => {
  try {
    return await db.News.create(data);
  } catch (error) {
    console.log(error)
    throw new Error('Error creating record: ' + error.message);
  }
};

export const update = async (id, data) => {
  try {
    const item = await db.News.findByPk(id);
    if (!item) throw new Error('Not found');
    return await item.update(data);
  } catch (error) {
    console.log(error)
    throw new Error('Error updating record: ' + error.message);
  }
};

export const destroy = async (id) => {
  try {
    const item = await db.News.findByPk(id);
    if (!item) throw new Error('Not found');
    return await item.destroy();
  } catch (error) {
    console.log(error)
    throw new Error('Error deleting record: ' + error.message);
  }
};