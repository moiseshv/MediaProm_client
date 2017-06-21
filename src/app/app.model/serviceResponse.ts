


export class ServiceResponse {

  public message: String = "";
  public code: String = "0";
  public isError: boolean = false;

  constructor(message : string,
             code : string,
             isError: boolean) {
               
      this.code = code;
      this.message = message;
      this.isError = isError;
   
    }
  }
