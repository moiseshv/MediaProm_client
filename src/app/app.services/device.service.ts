import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseDeviceService } from './parse.device.service';

@Injectable()
export class DeviceService {
  
  constructor(private _parseDeviceService: ParseDeviceService) {

  }

 
  public async addCategory(deviceid: string, categories: string[]) {
    console.log("Add Category to Device Service...");     
     //Videos
    try {
      var response = await this._parseDeviceService.addCategory(deviceid,categories);
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
      var response = await this._parseDeviceService.removeCategory(deviceid,categories);
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


 public async addMediaItem(deviceid: string, mediaItems: string[]) {
    console.log("Add Video to Device Service...");     
     //Videos
    try {
      var response = await this._parseDeviceService.addMediaItem(deviceid,mediaItems);
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
      var response = await this._parseDeviceService.removeMediaItem(deviceid,mediaItems);
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

 
 
}
