
/*
* Representa una Respuesta
*/
export class ServiceResponse {

  constructor() {
  
  }

static createSuccessResponse(value: Object) { 
    return { 'success': true , value }; 
}

static createErrorResponse(code: string, error: string) { 
    return { 'success': false, 'code': code, 'error': error }; 
}

static createErrorResponseByCode(code: string) { 
   
   const error = this.errorcodes[code];

   const errorM = ( error !== undefined) ? error : 'General error. Please contact support';
   
   return { 'success': false, 'code': code, 'error': errorM }; 
   
}

static getErroMsg(response: ServiceResponse) { 
   const errorM = ( response !== undefined) && ( response['error'] !== undefined) ? response['error'] : 'General error. Please contact support';
   
   return errorM; 
   
}

static isResposeSuccess(response: ServiceResponse){
   const succ = ( response !== undefined) && ( response['success'] !== undefined) ? response['success'] : false;
   return succ;
}

static errorcodes = { 
              '900' : 'Failing to connect with server. Contact to Support' ,
              '901' : 'Empty Server Response. Contact to Support' ,
              '905' : 'User must be valid' ,
              '906' : 'Device must be valid' ,
              '907' : 'Video must be valid' ,
              '908' : 'Category must be valid',
              '909' : 'Category already exist',
            };

}
