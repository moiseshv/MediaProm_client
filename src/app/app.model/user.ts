import { BaseObject } from './baseObject';

/*
* Representa un usuario
*/
export class User extends BaseObject {

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public phone: string;
  public photo: string;
  public sessionToken: string;

  //parseObject
  public emailVerified: boolean;
  public _email_verify_token: string;
  public _email_verify_token_expires_at: string;
  public _perishable_token: string;

  constructor() {
    super();
   }

  //Construye un objeto User a partir de un Pasrse _User
  fromParseJSON(parseObject: Object) {
    super.fromParseJSON(parseObject);
    var atts = parseObject;
    if ('attributes' in parseObject) {
      atts = parseObject["attributes"];
    }

    //name
    if ('name' in atts) {
      this.name = atts['name'];
    }
    //username
    if ('username' in atts) {
      this.username = atts['username'];
    }
    //email
    if ('email' in atts) {
      this.email = atts['email'];
    }
    //password
    if ('password' in atts) {
      this.password = atts['password'];
    }
    //phone
    if ('phone' in atts) {
      this.phone = atts['phone'];
    }
    //photo
    if ('photo' in atts) {
      this.photo = atts['photo'];
    }
    //sessionToken
    if ('sessionToken' in atts) {
      this.sessionToken = atts['sessionToken'];
    }
  
    //emailVerified
    if ('emailVerified' in atts) {
      this.emailVerified = atts['emailVerified'];
    }

  }

   toJSON() {
    return Object.assign({}, this, {
      created: this.toString()
    });
   }


}
