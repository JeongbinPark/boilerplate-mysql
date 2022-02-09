import mysql from 'mysql';
import info from './config/mysqlLoginConfig';

const connection = mysql.createConnection(info);

export default connection;