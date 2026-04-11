import db from '../../../models/index.cjs';



export const findAll = async ({ limit, offset }) => {
  try {
    const { rows: events, count: totalItems } = await db.Event.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['created_at', 'DESC'], ['updated_at', 'DESC']],
    })
    return {
      events,
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
    const item = await db.Event.findByPk(id);
    if (!item) throw new Error('Not found');
    return item;
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching record: ' + error.message);
  }
};