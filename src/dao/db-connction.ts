const { Client } =  require('pg');
require('dotenv').config();


export const getClient =()=>{
    return new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        schema:process.env.SCHEMA
    })
}

export const connectDB = async (client:any)=>{
    try{
        console.log(process.env.DBPORT)
        await client.connect();
        console.log("database connected");
    }
    catch(err){
        console.log(err);

    }
}

export const disconnectDB = async (client:any)=>{
    try{
        await client.end();
        console.log("database disconnected");
    }
    catch(err){
        console.log(err);

    }
}

