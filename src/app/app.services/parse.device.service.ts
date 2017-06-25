/*
* Servicio que reune los métodos para gestion de los devices
*/


import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';

@Injectable()
export class ParseDeviceService {
  private serverUrl = MEDIA_SERVER_URL + API_END;
 
  constructor() {
  }



/*
* Retorna la lista de videos por usuario
*/
  public async getDevicesbyUser(userid: string) {
    //where={"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}
   // userid = "wJ1XDdGTFf";
    console.log("Devices request");
     console.log(userid);
    var requestobj = { "owner": { "__type": "Pointer", "className": "_User", "objectId": "wJ1XDdGTFf" }};
    requestobj.owner.objectId = userid;
    var deviceserverurl = this.serverUrl + 'classes/Device/';
    var strobj =  JSON.stringify(requestobj);//'{"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}';
    deviceserverurl = deviceserverurl + '?where=' + strobj;
    
    var headers = {
        "Content-Type": "Application/json",
        "X-Parse-Application-Id": "MEDIA_PROM",
        "Access-Control-Allow-Origin": "*"
      }
    if(userid != undefined){         
        // var whereStr = JSON.stringify(requestobj);
        // headers["where"] =whereStr;         
    }
    var req ={
      method: "GET",
      headers
    }

     console.log(req);
    try {
       var req_response = await fetch(deviceserverurl, {method: "GET", headers});
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



 
}
