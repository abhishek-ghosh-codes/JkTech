import { apiMethod } from "../common/api-constants";
import { apiResponse } from "../common/api-response";
import { Dao } from "../dao/dataAccessLayer";
import { addObjectRules } from "../utils/addObjectRules";
import validate from "../utils/payload-validator";


export class CreateObjectService{
    public insert = async (req:{}, event:any, context:{}) => {
        try {
            let response:any;
            validate({event},addObjectRules);
            const objDao = new Dao();
            let result;
            const checkObject = await objDao.checkObject(event.file);
            if(checkObject.rowCount>0){
                result = 'File replaced in the S3 Bucket';
            }
            else{
                const dbResponse = await objDao.addObject(event);
                if(dbResponse.rowCount>0){
                    result = 'File created in the S3 bucket';
                }
                else{
                    result = 'File Not Created';
                }
            }
            
            console.log(`Line 10`);
          if (result) {
            console.log(`Line 12`);
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