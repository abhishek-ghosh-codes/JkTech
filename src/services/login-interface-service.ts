import { apiMethod } from "../common/api-constants";
import { apiResponse } from "../common/api-response";
import { Dao } from "../dao/dataAccessLayer";
import { Constant } from "../utils/constants";
import validate from "../utils/payload-validator";
import { loginRules } from "../utils/payload-rules";
const jwt = require('jsonwebtoken');
require('dotenv').config();
import Crypto from "crypto";


export class LoginService{
    public insert = async (req: {}, event: {}, context: {}) => {
        try {
            validate({ event }, loginRules);
            let response: any;
            const objDao = new Dao();
            let result;
            const checkResponse = await objDao.loginUser(event);
            if (checkResponse.rowCount > 0) {
                result = 'User already Exists. Please Login with your credentials.';
                //const secretKey = Crypto.randomBytes(32).toString('hex');
                const token = jwt.sign({ event }, Constant.secretKey, { expiresIn: '1h' });
                result = {
                    token: token,
                    response: 'Logged In'
                }
            }
            else {
                result = 'Unauthorized User';
            }

            if (result) {
                response = apiResponse(event, context, result, apiMethod.POST, false, '');
            }
            return response;
        }
        catch (error) {
            const message = 'error';
            apiResponse(event, context, {}, apiMethod.POST, true, message);
            return error;
        }
        return true;
    }
}