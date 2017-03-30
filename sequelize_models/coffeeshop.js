/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('coffeeshop', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'coffeeshop'
  });
};
