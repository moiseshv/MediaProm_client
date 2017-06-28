/*
* Servicio que reune los métodos para gestion de los devices
*/


import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';

@Injectable()
export class ParseDeviceService {
  private serverUrl = MEDIA_SERVER_URL + API_END;

  constructor() {
    Parse.initialize(SERVER_APPLICATION_ID);
    Parse.serverURL = this.serverUrl;

  }


  /* Adiciona o Modifica un Device
  * Para adicionar solo pasar el deviceid en undefined
     */
  public async addorUpdateDevice(deviceid: string, name: string, model: string, address: string, location: object, devicetypeid: string, ownerid: string,
    planid: string, statusid: string, capacity: number, sharedcapacity: number, onSystem: boolean) {

    console.log("Add Media Item request Parse");
    var DeviceClass = Parse.Object.extend("Device");
    var device = new DeviceClass();
    
    if (deviceid !== undefined) {
      device.id = deviceid;
    }
    device.set('name', name);
    device.set('model', model);
    device.set('address', address);
    device.set('onSystem', onSystem);
    device.set('totalCapacity', capacity);
    device.set('sharedCapacity', sharedcapacity);
    var point = new Parse.GeoPoint(location); //{latitude: 40.0, longitude: -30.0}
    device.set('location', point);

    //User
    var UserClass = Parse.Object.extend('_User');
    var user = new UserClass();
    user.id = ownerid;
    device.set('owner', user);

    // Type
    var DeviceTypeClass = Parse.Object.extend('DeviceType');
    var deviceType = new DeviceTypeClass();
    deviceType.id = devicetypeid;
    device.set('type', deviceType);

    // Status
    var DeviceStatusClass = Parse.Object.extend('DeviceStatus');
    var deviceStatus = new DeviceStatusClass();
    deviceStatus.id = statusid;
    device.set('status', deviceStatus);

    // Plan
    var PlanClass = Parse.Object.extend('Plan');
    var plan = new PlanClass();
    plan.id = planid;
    device.set('plan', plan);

    try {
      //Primero verificar si existe ya existe ese video en caso que no hayan pasado el ID
      if (deviceid === undefined) {
        var query = new Parse.Query("Device");
        query.equalTo('name', name);     
        query.equalTo('owner', user);
        var existResponse = await query.find();
        if (existResponse !== undefined && (existResponse as Array<any>).length > 0) {
          console.log('Media Item already exist');
          var errResult = { "code": 909, "message": "Device already exist." };
          return errResult;
        }
      }
      //Sino se repite se agrega o modifica
      var req_response = await device.save();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not Add Video" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }

 /*
  * Elimina un Device
  */
  public async removeDevice(id: string) {
    console.log("Remove Device request Parse");
    var DeviceClass = Parse.Object.extend("Device");
    var device = new DeviceClass();
    device.id = id;

    try {
      var req_response = await device.destroy();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not Delete Device" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }


  /*
    * Devuelve la lista de Device que tiene un usuario OK
    */
  public async getDevicesByUser(userid: string) {
    console.log("Get videos by user request Parse");
    var query = new Parse.Query("Device");
    //Primero formar un el user
    console.log(userid);
    if (userid == undefined) {
      return { "code": "901", "error": "No user defined" };
    }
    let user = new Parse.User();
    user.id = userid;
    try {
      //Ordenado por nombre      
      query.ascending("name");
      //Que incluya los datos del owner
      query.include("owner");
      query.include("type");
      query.include("plan");
      query.include("status");
      query.equalTo("owner", user);
      var req_response = await query.find();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not get Devices" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }

   /*
  * Devuelve la lista de Devices que tienen o no (withcategory) la categorías
  * si withcategory, responde la lista de los devices que al menos tengan una categoria
  * se no withcategory, devuelve la lista de los devices que no tienen ninguna de las categorias solicitadas
  */
  public async getDeviceByCategory(categories: string[], withcategory: boolean) {
    console.log("Get device by categories request Parse");
    var query = new Parse.Query("Device");
    //Primero formar un arreglo de categories
    var Arr = [];
    var catclass = Parse.Object.extend("Category");
    categories.forEach(element => {
      var category = catclass.createWithoutData(element);
      Arr.push(category);
    });

    try {
      //Ordenado por nombre      
      query.ascending("name");
      //Que incluya los datos del owner
      query.include("owner");
      //Que incluya los datos del plan
      query.include("plan");
      //Que incluya los datos del status      
      query.include("status");
      //Que incluya los datos del type      
      query.include("type");

      if (withcategory) {
        query.containedIn("categories", Arr);
      }
      else {
        query.notContainedIn("categories", Arr);
      }

      var req_response = await query.find();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not get Devices" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }



  /* REST*/

  public async addCategory(deviceid: string, categories: string[]) {
    console.log("Category Add to Device request Parse");

    //Primero formar un arreglo de categories
    var categoryArr = [];
    categories.forEach(element => {
      var category = { "__type": "Pointer", "className": "Category", "objectId": element };
      categoryArr.push(category);
    });

    var videoserverurl = this.serverUrl + 'classes/Device/' + deviceid;
    var requestbody = JSON.stringify({ "categories": { "__op": "AddRelation", "objects": categoryArr } });
    console.log(requestbody);

    try {
      var req_response = await fetch(videoserverurl, {
        method: "PUT",
        body: requestbody,
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": SERVER_APPLICATION_ID
        }
      }
      );
    } catch (error) {
      console.log(error)
    }

    try {
      var userdata = await req_response.json();
    } catch (error) {
      console.log(error)
    }
    //console.log(userdata)
    return userdata;
  }



  /*
  * Retorna la lista de videos por usuario
  */
  public async getDevicesbyUserREST(userid: string) {
    //where={"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}
    // userid = "wJ1XDdGTFf";
    console.log("Devices request");
    console.log(userid);
    var requestobj = { "owner": { "__type": "Pointer", "className": "_User", "objectId": "wJ1XDdGTFf" } };
    requestobj.owner.objectId = userid;
    var deviceserverurl = this.serverUrl + 'classes/Device/';
    var strobj = JSON.stringify(requestobj);//'{"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}';
    deviceserverurl = deviceserverurl + '?order=name&where=' + strobj;

    var headers = {
      "Content-Type": "Application/json",
      "X-Parse-Application-Id": "MEDIA_PROM",
      "Access-Control-Allow-Origin": "*"
    }
    if (userid != undefined) {
      // var whereStr = JSON.stringify(requestobj);
      // headers["where"] =whereStr;         
    }
    var req = {
      method: "GET",
      headers
    }

    console.log(req);
    try {
      var req_response = await fetch(deviceserverurl, { method: "GET", headers });
      console.log(req_response);
    } catch (error) {
      console.log('Error1')
    }

    console.log(req_response);
    try {
      var userdata = await req_response.json();
    } catch (error) {
      console.log(error)
    }
    //console.log(userdata)
    return userdata;
  }




  public async removeCategory(deviceid: string, categories: string[]) {
    console.log("Category remove to Device request Parse");

    //Primero formar un arreglo de categories
    var categoryArr = [];
    categories.forEach(element => {
      var category = { "__type": "Pointer", "className": "Category", "objectId": element };
      categoryArr.push(category);
    });

    var videoserverurl = this.serverUrl + 'classes/Device/' + deviceid;
    var requestbody = JSON.stringify({ "categories": { "__op": "RemoveRelation", "objects": categoryArr } });
    console.log(requestbody);

    try {
      var req_response = await fetch(videoserverurl, {
        method: "PUT",
        body: requestbody,
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": SERVER_APPLICATION_ID
        }
      }
      );
    } catch (error) {
      console.log(error)
    }

    try {
      var userdata = await req_response.json();
    } catch (error) {
      console.log(error)
    }
    //console.log(userdata)
    return userdata;
  }


  public async addMediaItem(deviceid: string, mediaItems: string[]) {
    console.log("Video Add to Device request Parse");

    //Primero formar un arreglo de categories
    var Arr = [];
    mediaItems.forEach(element => {
      var video = { "__type": "Pointer", "className": "MediaItem", "objectId": element };
      Arr.push(video);
    });

    var videoserverurl = this.serverUrl + 'classes/Device/' + deviceid;
    var requestbody = JSON.stringify({ "items": { "__op": "AddRelation", "objects": Arr } });
    console.log(requestbody);

    try {
      var req_response = await fetch(videoserverurl, {
        method: "PUT",
        body: requestbody,
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": SERVER_APPLICATION_ID
        }
      }
      );
    } catch (error) {
      console.log(error)
    }

    try {
      var userdata = await req_response.json();
    } catch (error) {
      console.log(error)
    }
    //console.log(userdata)
    return userdata;
  }

  public async removeMediaItems(deviceid: string, mediaItems: string[]) {
    console.log("Video remove to Device request Parse");

    //Primero formar un arreglo de categories
    var Arr = [];
    mediaItems.forEach(element => {
      var video = { "__type": "Pointer", "className": "MediaItem", "objectId": element };
      Arr.push(video);
    });

    var videoserverurl = this.serverUrl + 'classes/Device/' + deviceid;
    var requestbody = JSON.stringify({ "items": { "__op": "RemoveRelation", "objects": Arr } });
    console.log(requestbody);

    try {
      var req_response = await fetch(videoserverurl, {
        method: "PUT",
        body: requestbody,
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": SERVER_APPLICATION_ID
        }
      }
      );
    } catch (error) {
      console.log(error)
    }

    try {
      var userdata = await req_response.json();
    } catch (error) {
      console.log(error)
    }
    //console.log(userdata)
    return userdata;
  }

 




}
