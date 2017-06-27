import { BaseObject } from './baseObject';
import { User } from './user';

/*
* Representa un Device
*/
export class MediaItem extends BaseObject {

  public name: string;
  public mrl: string;
  public videoType: string;
  public planned : boolean;
  public categories: object[]; //relation
  public priority: number;
  public owner: User;//User

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

    //mrl
    if ('mrl'in atts) {
      this.mrl  = atts['mrl'];     
    }

    //videoType
    if ('videoType'in atts) {
      this.planned = atts['videoType'];
    }

    //planned
    if ('planned' in atts) {
      this.planned = atts['planned'];
    }

    //categories
    if ('categories' in atts) {
      this.categories = atts['categories'];
    }

    //owner
    if ('owner' in atts) {
       var user = new User();  
      var userparse = atts['owner'];
      user.fromParseJSON(userparse);
      this.owner = user;
    }

    

    //totalCapacity
    if ('priority' in atts) {
      this.priority = atts['priority'];
    }
   
  }

  toJSON() {
    return Object.assign({}, this, {
      created: this.toString()
    });
  }


}
