import { apiMethod } from "../common/api-constants";
import { apiResponse } from "../common/api-response";
import { Dao } from "../dao/dataAccessLayer";
import { readObjectRules } from "../utils/readObjectRules";
import validate from "../utils/payload-validator";
export class ReadObjectservice{
    public read = async (req:{}, event:{}, context:{}) => {
        try {
            let response:any;
            validate({event},readObjectRules);
            const objDao = new Dao();
            let result ='';

            let dbResponse = await objDao.readObject(event);
            if(dbResponse){
                result=dbResponse;
            }
            else{
                result ='No Object found';
            }
          if (result) {
             response= apiResponse(event, context, result, apiMethod.GET, false, '');
          }
          console.log('response',response);
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