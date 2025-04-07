import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

const database = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
}
)

database.connect((err)=>{

  if(err){
 throw err;
  }
  console.log("connected successfuly to the Database ");
});

export default database;