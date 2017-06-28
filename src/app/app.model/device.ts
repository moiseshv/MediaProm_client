import { BaseObject } from './baseObject';
import { DeviceStatus } from './device.status';
import { DeviceType } from './device.type';
import { Plan } from './plan';
import { User } from './user';

/*
* Representa un Device
*/
export class Device extends BaseObject {

   name: string;
   address: string;
   location: Object;
   model: string;
   categories: object[]; //{id, name, description}
   lastPingDate: Date;
   owner: User;
   plan: Plan; //{id, name, description}
   status: DeviceStatus;//{id, name, description}
   totalCapacity: number;
   currentCapacity: number;
   type: DeviceType; //{id, name, description}

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

    //lastPingDate
    if ('lastPingDate' in atts) {
      var uaStr = atts['lastPingDate'];
      if (uaStr != undefined) {
        this.lastPingDate = new Date(uaStr);
      }
    }

    //address
    if ('address' in atts) {
      this.address = atts['address'];
    }

    //location
    if ('location' in atts) {
      if ('latitude' in atts['location']) {
        var lat = atts['location']['latitude'];
      }
      else{
         lat = atts['location']['_latitude'];
      }

      if ('longitude' in atts['location']) {
        var lon = atts['location']['longitude'];
      }
      else{
         lat = atts['location']['_longitude'];
      }

      this.location = { 'latitude': lat, 'logitude': lon };
    }

    //model
    if ('model' in atts) {
      this.model = atts['model'];
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

    //plan
    if ('plan' in atts) {
      var plan = new Plan();  
      var planparse = atts['plan'];
      plan.fromParseJSON(planparse);
      this.plan = plan;
    }

    //status
    if ('status' in atts) {
      var status = new DeviceStatus();  
      var statusparse = atts['status'];
      status.fromParseJSON(statusparse);
      this.status = status;
    }

    //totalCapacity
    if ('totalCapacity' in atts) {
      this.totalCapacity = atts['totalCapacity'];
    }

    //currentCapacity
    if ('currentCapacity' in atts) {
      this.currentCapacity = atts['currentCapacity'];
    }

    //type
    if ('type' in atts) {
      var _type = new DeviceType();  
      var typeparse = atts['type'];
      _type.fromParseJSON(typeparse);
      this.type = _type;
    }
  }

  toJSON() {
    return Object.assign({}, this, {
      created: this.toString()
    });
  }


}
