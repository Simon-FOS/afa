'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    image_url: {
      type: DataTypes.STRING
    },
    tag: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    underscored: true,
  });
  return Event;
};