export enum apiMethod {
    POST   = 'post',
    GET    = 'get',
    DELETE = 'delete',
    PUT    = 'update',
}

export enum apiResponseCode { 
    POST      = '201',  // Successful creation of a resource.   -- Resource that was created
    GET       = '200',  // No error, operation successful.  -- Resource
    DELETE    = '200',  // No error, operation successful.  -- Resource
    UPDATE    = '200',  // No error, operation successful.  -- Resource
    ACCEPTED  = '202',  // The request was received. for POST,DELETE,PUT -- N/A  
    NOT_FOUND = '404'   // Resource not found.for GET, POST, PUT, DELETE --- Error Message
}