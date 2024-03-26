import { apiMethod } from "../common/api-constants";
import { apiResponse } from "../common/api-response";
import { Dao } from "../dao/dataAccessLayer";
import { createBucketRules } from "../utils/payload-rules";
import validate from "../utils/payload-validator";

export class CreateBucketService{
  public insert = async (req: {}, event: {}, context: {}) => {
    try {
      let response: any;
      validate({ event }, createBucketRules);
      const objDao = new Dao();
      let result;
      console.log('abhi')
      let checkResponse = await objDao.checkBucket(event);
      if (checkResponse.rowCount > 0) {
        result = 'Bucket already exists'
      }
      else {
        const dbResponse = await objDao.addBucket(event);
        if (dbResponse.rowCount === 1) {
          result = 'Bucket created';
        }
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