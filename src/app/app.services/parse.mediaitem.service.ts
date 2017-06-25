/*
* Servicio que reune los métodos para gestion de videos
*/


import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';

@Injectable()
export class ParseMediaItemService {
  private serverUrl = MEDIA_SERVER_URL + API_END;
 
  constructor() {
  }


   public async getMediasbyUser(userid: string) {
    //where={"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}
     // userid = "wJ1XDdGTFf";
    console.log("Videos request");
    var requestobj = { "owner": { "__type": "Pointer", "className": "_User", "objectId": "wJ1XDdGTFf" }};
    requestobj.owner.objectId = userid;
    var videoserverurl = this.serverUrl + 'classes/MediaItem';
    var strobj =  JSON.stringify(requestobj);//'{"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}';
    videoserverurl = videoserverurl + '?where=' + strobj;

    var headers = {
        "Content-Type": "Application/json",
        "X-Parse-Application-Id": "MEDIA_PROM",
      }
    
    try {
       var req_response = await fetch(videoserverurl, {method: "GET", headers});
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
