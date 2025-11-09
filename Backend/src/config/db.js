import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const db_conn = process.env.DB_CONN_STRING

const CONNECT_DB = async () => {
    try {
        await mongoose.connect(db_conn, {
            autoIndex: true
        });
        console.log(`DB connected sucessfully. \n`)
    } catch (error) {
        console.log('Error connecting DB', error);
        process.exit(1);
    }
}

export default CONNECT_DB;