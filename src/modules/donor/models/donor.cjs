'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Donor.hasMany(models.Donation, { foreignKey: 'donor_id', as: 'donations' });
    }
  }
  Donor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Donor',
    tableName: 'donors',
    underscored: true,
  });
  return Donor;
};