'use strict';
module.exports = (sequelize, DataTypes) => {
  var ElectionArea = sequelize.define('ElectionArea', {
    name: DataTypes.STRING,
    village: DataTypes.STRING,
    patwarHalka: DataTypes.STRING,
    tehsil: DataTypes.STRING,
    district: DataTypes.STRING,
    blockCode: DataTypes.STRING,
    unionCouncil: DataTypes.STRING
  }, {});
  ElectionArea.associate = function(models) {
    ElectionArea.hasMany(models.Voter, {
      foreignKey: 'electionAreaId',
      as: 'voters'
    })
  };
  return ElectionArea;
};