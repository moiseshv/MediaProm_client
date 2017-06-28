/*
* Representa un usuario
*/
export class BaseObject {

 
  //parseObject
  public createdAt: Date;
  public updatedAt: Date;
  public objectId: string;

  constructor() {
   }

  //Construye un objeto User a partir de un Parse Object
  fromParseJSON(parseObject: Object) {   
    //updatedAt
    if ('updatedAt' in parseObject) {
      var uaStr = parseObject['updatedAt'];
      if (uaStr != undefined) {
        this.updatedAt = new Date(uaStr);
      }
    }

     //createdAt
    if ('createdAt' in parseObject) {
      var uaStr = parseObject['createdAt'];
      if (uaStr != undefined) {
        this.createdAt = new Date(uaStr);
      }
    }
   
    //objectId
  if ('id' in parseObject) {
      this.objectId = parseObject['id'];
   }
       //objectId
  if ('objectId' in parseObject) {
      this.objectId = parseObject['objectId'];
   }

  }


 


}
