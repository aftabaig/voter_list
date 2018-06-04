'use strict';
module.exports = (sequelize, DataTypes) => {
  var Voter = sequelize.define('Voter', {
    serialNumber: DataTypes.STRING,
    familyNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    idCardNumber: DataTypes.STRING,
    age: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Voter.associate = function(models) {
    Voter.belongsTo(models.ElectionArea, {
      foreignKey: 'electionAreaId',
      as: 'electionArea'
    })
  };
  return Voter;
};