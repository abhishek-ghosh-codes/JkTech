import { IncomingHttpHeaders } from "http";
import { Constant } from "../utils/constants";
const jwt = require('jsonwebtoken');

// const jwksClient = require('jwks-rsa');
export const authHandler = async (token: IncomingHttpHeaders, callback: { (err: {}, _data: {}): void; (arg0: unknown, arg1: boolean | null): void; }) => {
    try {
        console.log('inside auth');
       
        console.log(typeof(token.authorization));
        if(token.authorization){
            jwt.verify(token.authorization, Constant.secretKey, (err: { message: any; }, decoded: any) => {
                if (err) {
                  
                  console.error('Token verification failed:', err.message);
                  callback(err, null)
                } else {
                  
                  console.log('Token verified successfully');
                  console.log('Decoded payload:', decoded);
                  callback(null, true)
                }
              });
        }
        else{
            throw new Error("missing token")
        }
       
        //callback(null,true);
        } catch (error) {

        callback(error, null)
    }
}

