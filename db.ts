/*// // db.ts
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

// // Membuat koneksi database
const db = createPool({
     host: 'localhost', // Host database Anda
     user: 'root',      // Username MySQL
     password: 'Mirabeledina28',      // Password MySQL Anda
     database: 'master', // Nama database yang sudah dibuat
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
 });

 export { db }; */


import mysql, {Connection} from 'mysql2/promise';

const pool = mysql.createPool ({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0.
})

export const getConnection = async (): Promise<Connection> => {
    try{
        const connection = await mysql.createConnection(pool);
        return connection;
    } catch (error){
        console.error('Database connection failed', error);
        throw error;
    }
}

export const closeConnection = async (connection: Connection | null): Promise<void> => {
    if(connection){
        try{
            await connection.end();
        } catch (error){
            console.error('failed to close', error);
        }
    }
};

export const executeQuery = async (query: string, params: any[]) => {
    const connection = await getConnection();
    try{
        const [results] = await connection.execute(query, params);
        return results;
    } catch (error){
        console.error('Query execution failed', error);
    } finally {
        await closeConnection(connection)
    }
};

export default pool;
/*

*/