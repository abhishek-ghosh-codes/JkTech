
const {disconnectDB,getClient,connectDB}= require('./db-connction');
import { Constant } from "../utils/constants";
import * as fs from "fs";
export class Dao {
    checkObject = async (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const result = await client.query(Constant.checkObjectQuery, [params.originalname]);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    loginUser = async (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const result = await client.query(Constant.checkUserCredentialQuery, [params.username,params.password]);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    checkUser = async (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const result = await client.query(Constant.checkUserQuery, [params.username]);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    checkBucket = async (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const result = await client.query(Constant.checkBucketQuery, [params.name]);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    deleteObject = (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const result = await client.query(Constant.deleteObjectQuery, [params.bucket_id,params.filename]);
                if(result.rowCount>0){
                    const filePath = `uploads/${params.filename}`;

                // Use fs.unlink() to delete the file
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
                }
                
                console.log(result);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    addObject = (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const url = `${params.query.bucket_name}/${params.file.originalname}`
                const result = await client.query(Constant.addObjectQuery, [params.query.bucket_id,params.file.originalname,url]);
                console.log(result);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    addBucket = (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                console.log('params ->',params.name,params.user_id)
                const result = await client.query(Constant.addBucketQuery, [params.name,params.user_id]);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    addUser = (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const result = await client.query(Constant.addUserQuery, [params.username,params.password,params.role]);
                //onst result = await client.query(`SELECT current_database()`);
                console.log(result);
                resolve(result);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    getUser = (params:any): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const client = getClient();
            try {
                await connectDB(client);
                const result = await client.query(`select * from s3.users`);
                //onst result = await client.query(`SELECT current_database()`);
                console.log(`Line 179`);
                resolve(result.rows);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally {
                console.log('inside finally');
                await disconnectDB(client);
            }
        }

        )

    }
    getBucket =(params:any): Promise<any>=>{
        return new Promise(async(resolve,reject)=>{
            const client = getClient();
            try{
                await connectDB(client);
                const result = await client.query(Constant.getBucketQuery)
                resolve(result.rows);
            }
            catch(err){
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally{
                console.log('inside finally');
                await disconnectDB(client);
            }
        })

    }
    getObject =(params:any): Promise<any>=>{
        return new Promise(async(resolve,reject)=>{
            const client = getClient();
            try{
                await connectDB(client);
                const result = await client.query(Constant.getObjectQuery,[params.bucket_id])
                resolve(result.rows);
            }
            catch(err){
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally{
                console.log('inside finally');
                await disconnectDB(client);
            }
        })

    }
    readObject =(params:any): Promise<any>=>{
        return new Promise(async(resolve,reject)=>{
            const client = getClient();
            try{
                await connectDB(client);
                const result = await client.query(Constant.readObjectQuery,[params.bucket_id,params.filename])
                if (result.rowCount > 0) {
                    const filePath = `./uploads/${params.filename}`;
                    const dataFile = await fs.readFileSync(filePath, 'utf8')
                    resolve(dataFile)
                }
                resolve(false);
            }
            catch(err){
                console.log(JSON.stringify(err));
                reject(err);
            }
            finally{
                console.log('inside finally');
                await disconnectDB(client);
            }
        })

    }
}
