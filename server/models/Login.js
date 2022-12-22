const { Model, DataTypes } = require("Sequelize");
class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }
}
module.exports = Login;
