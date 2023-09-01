import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
const connectDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Se ha establecido la conexión con la base de datos');
  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error);
  }
};

export { connectDB, sequelize, DataTypes };
