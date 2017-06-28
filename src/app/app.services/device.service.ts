import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseDeviceService } from './parse.device.service';
import { Device } from './../app.model/device';

@Injectable()
export class DeviceService {

  constructor(private _parseDeviceService: ParseDeviceService) {

  }


  public async addCategory(deviceid: string, categories: string[]) {
    console.log("Add Category to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.addCategory(deviceid, categories);
      if (response == undefined) {
        var message = "Can not add categories to video in this moment.";
        console.log(message);
      }
      else {
        console.log(response);
        var errorcode: string = response["code"];
        if (errorcode != undefined) {
          message = response["error"];
          console.log(message);
        }
        else {
          return response;
        }
      }
    } catch (error) {

    }

  }


  public async removeCategory(deviceid: string, categories: string[]) {
    console.log("Add Category to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.removeCategory(deviceid, categories);
      if (response == undefined) {
        var message = "Can not add categories to video in this moment.";
        console.log(message);
      }
      else {
        var errorcode: string = response["code"];
        if (errorcode != undefined) {
          message = response["error"];
          console.log(message);
        }
        else {
          return response;
        }
      }
    } catch (error) {

    }

  }


  public async addMediaItem(deviceid: string, mediaItems: string[]) {
    console.log("Add Video to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.addMediaItem(deviceid, mediaItems);
      if (response == undefined) {
        var message = "Can not add categories to video in this moment.";
        console.log(message);
      }
      else {
        console.log(response);
        var errorcode: string = response["code"];
        if (errorcode != undefined) {
          message = response["error"];
          console.log(message);
        }
        else {
          return response;
        }
      }
    } catch (error) {

    }

  }

  public async removeMediaItem(deviceid: string, mediaItems: string[]) {
    console.log("Add Video to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.removeMediaItem(deviceid, mediaItems);
      if (response == undefined) {
        var message = "Can not add categories to video in this moment.";
        console.log(message);
      }
      else {
        console.log(response);
        var errorcode: string = response["code"];
        if (errorcode != undefined) {
          message = response["error"];
          console.log(message);
        }
        else {
          return response;
        }
      }
    } catch (error) {
      console.log(message);
      var error = "";

    }

  }


  public async getDeviceByCategory(categories: string[], withcategory: boolean) {
    console.log("get Device of Category Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.getDeviceByCategory(categories, withcategory);
      if (response == undefined) {
        var message = "Can not get devices in this moment.";
        console.log(message);
      }
      else {
        var deviceArr = [];
        if (response != undefined) {
          for (var i = 0; i < response.length; i++) {
            //console.log(response[i]);
            var device = new Device();
            device.fromParseJSON(response[i]);
            deviceArr.push(device);
          }
        }
        return deviceArr;
      }
    } catch (error) {
      console.log(error);
      var errormessage = "Error trying to connect with server";
      return { "code": "900", "error": errormessage };
    }
  }


 public async getDevicesByUser(userid: string) {
    console.log("get Devices By User Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.getDevicesByUser(userid);
      if (response == undefined) {
        var message = "Can not get devices in this moment.";
        console.log(message);
      }
      else {
        var Arr = [];
        if (response != undefined) {
          for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            var device = new Device();
            device.fromParseJSON(response[i]);
            Arr.push(device);
          }        

        }
        return Arr;
      }
    } catch (error) {
      console.log(error);
      var errormessage = "Error trying to connect with server";
      return { "code": "900", "error": errormessage };
    }

  }


}
