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

  public async removeMediaItem(deviceid: string, mediaItems: string[]) {
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
      console.log(error)
      return error;
    }

  }


 /*
  * Devuelve la lista de Device que tiene un usuario
  */
  public async getDevicesByUser(userid: string) {
    console.log("Get videos by user request Parse");
    var query = new Parse.Query("Device");
    //Primero formar un el user
    console.log(userid);
    if(userid == undefined){
      return {"code":"901","error":"No user defined"};
    }
    let user = new Parse.User();    
    user.id = userid;
    try {
      //Ordenado por nombre      
      query.ascending("name");
      //Que incluya los datos del owner
      query.include("owner");
      query.equalTo("owner", user);
      var req_response = await query.find();
      return req_response;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

}
