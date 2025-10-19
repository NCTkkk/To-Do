import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";

class Admin extends Model {
  public id!: string;
  public name!: string;
  public password!: string;
  public email!: string;
}
Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: true,
  }
);
export default Admin;
