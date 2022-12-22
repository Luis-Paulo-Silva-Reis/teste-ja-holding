const { Model, DataTypes } = require("Sequelize");
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        
        name: DataTypes.STRING,
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
module.exports = User;
