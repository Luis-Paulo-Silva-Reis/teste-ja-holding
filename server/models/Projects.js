const { Model, DataTypes } = require("Sequelize");

class Todo extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        cost: DataTypes.INTEGER,
        done: DataTypes.BOOLEAN,
        deadline: DataTypes.DATE,
        username: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Todo;
