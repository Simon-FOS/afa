'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {

    }
  }

  News.init({
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
    country: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'News',
    tableName: 'news',
    timestamps: true,
    underscored: true
  });

  return News;
};