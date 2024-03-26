'use strict';
import { apiMethod } from './api-constants';

export function apiResponse(event:{}, context:{}, jsonResponse: {}, method: apiMethod, flag: boolean, errMessage: {}) {

  if ((apiMethod.POST === method || apiMethod.GET === method || apiMethod.PUT === method || apiMethod.DELETE === method) && flag == false) {
      console.log(`Line 7`);
    if (Object.keys(jsonResponse).length < 1) {
      console.log(`Line 9`);
      jsonResponse = "No Content";
    }
  }
  else if (flag) {
    jsonResponse = errMessage;
  }
  console.log(`Line 17`)

  const response = {
    body: jsonResponse
  };
  console.log('body',response);

  return response;
}