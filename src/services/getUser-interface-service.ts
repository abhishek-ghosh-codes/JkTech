import { apiMethod } from "../common/api-constants";
import { apiResponse } from "../common/api-response";
import { Dao } from "../dao/dataAccessLayer";


export class GetUserService{
    public read = async (req:{}, event:{}, context:{}) => {
        try {
            let response:any;
            const objDao = new Dao();
            const result = await objDao.getUser(event);
            console.log(`Line 10`);
          if (result) {
            console.log(`Line 12`);
             response= apiResponse(event, context, result, apiMethod.GET, false, '');
          }
          console.log('response');
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