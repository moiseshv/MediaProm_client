/*
* Representa un usuario
*/
export class User {

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public phone: string;
  public photo: string;
  public sessionToken: string;

  //parseObject
  public createdAt: string;
  public updatedAt: Date;
  public emailVerified: boolean;
  public objectId: string;
  public _email_verify_token: string;
  public _email_verify_token_expires_at: string;
  public _perishable_token: string;

  constructor() {
   }

  //Construye un objeto User a partir de un Pasrse _User
  fromParseJSON(parseObject: Object) {
    //name
    if (parseObject.hasOwnProperty('name')) {
      this.name = parseObject['name'];
    }
    //username
    if (parseObject.hasOwnProperty('username')) {
      this.username = parseObject['username'];
    }
    //email
    if (parseObject.hasOwnProperty('email')) {
      this.email = parseObject['email'];
    }
    //password
    if (parseObject.hasOwnProperty('password')) {
      this.password = parseObject['password'];
    }
    //phone
    if (parseObject.hasOwnProperty('phone')) {
      this.email = parseObject['phone'];
    }
    //photo
    if (parseObject.hasOwnProperty('photo')) {
      this.email = parseObject['photo'];
    }
    //sessionToken
    if (parseObject.hasOwnProperty('sessionToken')) {
      this.email = parseObject['sessionToken'];
    }
    //updatedAt
    if (parseObject.hasOwnProperty('updatedAt')) {
      var uaStr = parseObject['updatedAt'];
      if (uaStr != undefined) {
        this.updatedAt = new Date();
      }
    }

    //emailVerified
    if (parseObject.hasOwnProperty('emailVerified')) {
      this.emailVerified = parseObject['emailVerified'];
    }

    //objectId
    if (parseObject.hasOwnProperty('objectId')) {
      this.objectId = parseObject['objectId'];
    }

  }

  toJSON() {
    return Object.assign({}, this, {
      created: this.toString()
    });
  }


}
