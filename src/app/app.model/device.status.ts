import { BaseObject } from './baseObject';
/*
* Representa un Device
*/
export class DeviceStatus extends BaseObject {

  public name: string;
  public description: string;
  
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
    console.log(atts);

    //name
    if ('name' in atts) {
      this.name = atts['name'];
    }

    //type
    if ('description' in atts) {
      this.description = atts['description'];
    }
  }

  toJSON() {
    return Object.assign({}, this, {
      created: this.toString()
    });
  }


}
