import { apiMethod } from "../common/api-constants";
import { apiResponse } from "../common/api-response";
import { Dao } from "../dao/dataAccessLayer";
import { deleteObjectRules } from "../utils/deleteObjectRules";
import validate from "../utils/payload-validator";

export class DeleteObjectService{
    public delete = async (req:{}, event:{}, context:{}) => {
        try {
            let response:any;
            validate({event},deleteObjectRules)
            const objDao = new Dao();
            console.log('start');
            
            let result = await objDao.deleteObject(event);
            if(result.rowCount===0){
                result ='Object does not Exists'
            }
            else{
                result = 'Object Deleted'
            }
            console.log(`Line 10`);
          if (result) {
            console.log(`Line 12`);
             response= apiResponse(event, context, result, apiMethod.DELETE, false, '');
          }
          console.log('response',response);
          return response;
        }
        catch (error) {
         
            const message = 'error';
            
            apiResponse(event, context, {}, apiMethod.DELETE, true, message);
            return error;
        }
        return true;
      }
}