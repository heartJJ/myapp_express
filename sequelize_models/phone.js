/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Phone =  sequelize.define('phone', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    apple: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'phone'
  });

  /**
   * 此方法会向数据库生成表和数据
   * 注意会自动添加 createdAt 和 updatedAt两个字段
   */
  // Phone.sync({force: true}).then(function () {
  //   // Table created
  //   return Phone.create({
  //     brand: 'one plus',
  //     name: 'A3001',
  //     price: 2699.00
  //   });
  // });

  return Phone;
};
