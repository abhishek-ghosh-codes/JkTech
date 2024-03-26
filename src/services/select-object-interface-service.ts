import { apiMethod } from "../common/api-constants";
import { apiResponse } from "../common/api-response";
import { Dao } from "../dao/dataAccessLayer";
import { getObjectRules } from "../utils/payload-rules";
import validate from "../utils/payload-validator";

export class SelectObjectService{
  public read = async (req: {}, event: {}, context: {}) => {
    try {
      let response: any;
      validate({ event }, getObjectRules);
      const objDao = new Dao();
      const result = await objDao.getObject(event);
      if (result) {
        response = apiResponse(event, context, result, apiMethod.GET, false, '');
      }
      return response;
    }
    catch (error) {
      const message = 'error';
      apiResponse(event, context, {}, apiMethod.GET, true, message);
      return error;
    }
    return true;
  }
}