import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../../../app.configs';

@Injectable()
export class ResumeService {
  private serverUrl = MEDIA_SERVER_URL + API_END;
  public devices: Array<Object>;
  public videos: Object;
  public plans: Object;

  constructor() {
  }

  public async getResumeData(userid: string) {
    console.log("Resume Service...");

   
    var devicedata = {
      description: 'dashboard.devices',
      stats: -1,
      icon: 'fa fa-desktop fa-5x',
    }

    var videodata = {
      description: 'dashboard.videos',
      stats: -1,
      icon: 'fa fa-file-movie-o fa-5x',
    }

    var plandata = {
      description: 'dashboard.plans',
      stats: -1,
      icon: 'fa fa-money fa-5x',
    }

    var shareddata = {
      description: 'dashboard.shared_devices',
      stats: -1,
      icon: 'fa fa-share-alt fa-5x',
    }


     try {
      var udevices = await this.getDevicesbyUser(userid);
      if (udevices == undefined) {
        var message = "Can not get devices in this moment.";
        console.log(message);
      }
      else {
        console.log(udevices);
        var errorcode: string = udevices["code"];
        if (errorcode != undefined) {
          message = udevices["error"];
          console.log(message);       }
        else {
          this.devices = udevices;                   
          devicedata['stats'] = ((udevices != undefined) && (udevices.results != undefined))? Object.keys(udevices.results).length : -1;
          
        }
      }
    } catch (error) {

    }


    try {
      var uvideos = await this.getVideosbyUser(userid);
      if (uvideos == undefined) {
        var message = "Can not get videos in this moment.";
        console.log(message);
      }
      else {
        console.log(uvideos);
        var errorcode: string = uvideos["code"];
        if (errorcode != undefined) {
          message = udevices["error"];
          console.log(message);
        }
        else {
          this.videos = uvideos;
          videodata['stats'] = ((uvideos != undefined) && (uvideos.results != undefined))? Object.keys(uvideos.results).length : -1;
        }
      }
    } catch (error) {

    }

    // Visualizar datos estaditicos
    var returnObj = [devicedata, videodata, plandata, shareddata];

    return returnObj;


  }


  public getDummyData() {

 
    var devicedata = {
      description: 'dashboard.devices',
      stats: 'NA',
      icon: 'fa fa-desktop fa-5x',
    }

    var videodata = {
      description: 'dashboard.videos',
      stats: 'NA',
      icon: 'fa fa-file-movie-o fa-5x',
    }

    var plandata = {
      description: 'dashboard.plans',
      stats: 'NA',
      icon: 'fa fa-money fa-5x',
    }

    var shareddata = {
      description: 'dashboard.shared_devices',
      stats: 'NA',
      icon: 'fa fa-share-alt fa-5x',
    }
     
      // Visualizar datos estaditicos
    return [devicedata,videodata,plandata,shareddata];  
    

  }



  private async getDevicesbyUser(userid: string) {
    //where={"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}
    userid = "wJ1XDdGTFf";
    console.log("Devices request");
    var requestobj = { "owner": { "__type": "Pointer", "className": "_User", "objectId": "wJ1XDdGTFf" }};
    requestobj.owner.objectId = userid;
    var deviceserverurl = this.serverUrl + 'classes/Device';
    var str = '{"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}';
    var headers = {
        "Content-Type": "Application/json",
        "X-Parse-Application-Id": "MEDIA_PROM",
        "Access-Control-Allow-Origin": "*",
        "where" :  str  //JSON.stringify(requestobj)
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




   private async getVideosbyUser(userid: string) {
    //where={"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}
     // userid = "wJ1XDdGTFf";
    console.log("Videos request");
    var requestobj = { "owner": { "__type": "Pointer", "className": "_User", "objectId": "wJ1XDdGTFf" }};
    requestobj.owner.objectId = userid;
    var deviceserverurl = this.serverUrl + 'classes/MediaItem';

    var headers = {
        "Content-Type": "Application/json",
        "X-Parse-Application-Id": "MEDIA_PROM",
      }
    if(userid != undefined){         
         var whereStr = JSON.stringify(requestobj);
         headers["where"] =whereStr;         
    }
    var req ={
      method: "GET",
      headers
    }

    try {
       var req_response = await fetch(deviceserverurl, {method: "GET", headers});
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
