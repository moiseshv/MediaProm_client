import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseDeviceService } from './parse.device.service';
import { Device } from './../app.model/device';
import { ServiceResponse } from './../app.model/service.response';

@Injectable()
export class DeviceService {

  constructor(private _parseDeviceService: ParseDeviceService) {

  }

 /* Adiciona un Video
  * O Lo modifica si pasan el ID
   */
  public async addorUpdateDevice(deviceid: string, name: string, model: string, address: string, location: object, devicetypeid: string,
                                 ownerid: string, planid: string, statusid: string, capacity: number, sharedcapacity: number, onSystem: boolean) {
   console.log("Add or Update Devices By User Service...");
    //Devices
    try {
      var response = await this._parseDeviceService.addorUpdateDevice(deviceid, name, model, address, location, devicetypeid, 
                                                                      ownerid,planid, statusid,capacity, sharedcapacity, onSystem);
      if (response === undefined) {
        const errResponse = ServiceResponse.createErrorResponseByCode('901');
        console.log(errResponse);
        return errResponse;
      }
      else {
        const existError = response['code'] !== undefined;
        if (existError) {
          const errResponse = ServiceResponse.createErrorResponse(response['code'], response['message']);
          console.log(errResponse);
          return errResponse;
        }

        var device = new Device();
        device.fromParseJSON(response);
        const successResponse = ServiceResponse.createSuccessResponse(device);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }

  }

   /*
     * Elimina un Device
     */
  public async removeDevice(id: string) {
    console.log("remove Device  Service...");
    //Device
    try {
      var response = await this._parseDeviceService.removeDevice(id);
      if (response === undefined) {
        const errResponse = ServiceResponse.createErrorResponseByCode('901');
        console.log(errResponse);
        return errResponse;
      }
      else {
        const existError = response['code'] !== undefined;
        if (existError) {
          const errResponse = ServiceResponse.createErrorResponse(response['code'], response['message']);
          console.log(errResponse);
          return errResponse;
        }
        const successResponse = ServiceResponse.createSuccessResponse(undefined);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }
  }


  
 public async getDevicesByUser(userid: string) {
    console.log("get Devices By User Service...");
    //Devices
    try {
      var response = await this._parseDeviceService.getDevicesByUser(userid);
      if (response == undefined) {
        const errResponse = ServiceResponse.createErrorResponseByCode('901');
        console.log(errResponse);
        return errResponse;
      }
      else {
        const existError = response['code'] !== undefined;
        if (existError) {
          const errResponse = ServiceResponse.createErrorResponse(response['code'], response['message']);
          console.log(errResponse);
          return errResponse;
        }

        var Arr = [];
        if (response != undefined) {
          for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            var device = new Device();
            device.fromParseJSON(response[i]);
            Arr.push(device);
          }        

        }
        const successResponse = ServiceResponse.createSuccessResponse(Arr);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
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
        if (response !== undefined) {
          for (var i = 0; i < response.length; i++) {
            //console.log(response[i]);
            var device = new Device();
            device.fromParseJSON(response[i]);
            deviceArr.push(device);
          }
        }
        const successResponse = ServiceResponse.createSuccessResponse(deviceArr);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }
  }


  public async addCategory(deviceid: string, categories: string[]) {
    console.log("Add Category to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.addCategory(deviceid, categories);
      if (response == undefined) {
        const errResponse = ServiceResponse.createErrorResponseByCode('901');
        console.log(errResponse);
        return errResponse;
      }
      else {
        console.log(response);
        var errorcode: string = response["code"];
        if (errorcode !== undefined) {
          const existError = response['code'] !== undefined;
          if (existError) {
            const errResponse = ServiceResponse.createErrorResponse(response['code'], response['error']);
            console.log(errResponse);
            return errResponse;
          }
        }
        else {
          const successResponse = ServiceResponse.createSuccessResponse(undefined);
          return successResponse;
        }
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }

  }


  public async removeCategory(deviceid: string, categories: string[]) {
    console.log("Add Category to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.removeCategory(deviceid, categories);
      if (response == undefined) {
       const errResponse = ServiceResponse.createErrorResponseByCode('901');
        console.log(errResponse);
        return errResponse;
      }
      else {
        var errorcode: string = response["code"];
        if (errorcode != undefined) {
          const existError = response['code'] !== undefined;
          if (existError) {
            const errResponse = ServiceResponse.createErrorResponse(response['code'], response['error']);
            console.log(errResponse);
            return errResponse;
          }
        }
        else {
          const successResponse = ServiceResponse.createSuccessResponse(undefined);
          return successResponse;
        }
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;

    }

  }


  public async addMediaItem(deviceid: string, mediaItems: string[]) {
    console.log("Add Video to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.addMediaItem(deviceid, mediaItems);
      if (response == undefined) {
        const errResponse = ServiceResponse.createErrorResponseByCode('901');
        console.log(errResponse);
        return errResponse;
      }
      else {
        console.log(response);
        var errorcode: string = response["code"];
        if (errorcode !== undefined) {
          const existError = response['code'] !== undefined;
          if (existError) {
            const errResponse = ServiceResponse.createErrorResponse(response['code'], response['error']);
            console.log(errResponse);
            return errResponse;
          }
        }
        else {
          const successResponse = ServiceResponse.createSuccessResponse(undefined);
          return successResponse;
        }
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }

  }

  public async removeMediaItems(deviceid: string, mediaItems: string[]) {
    console.log("Add Video to Device Service...");
    //Videos
    try {
      var response = await this._parseDeviceService.removeMediaItems(deviceid, mediaItems);
      if (response == undefined) {
        const errResponse = ServiceResponse.createErrorResponseByCode('901');
        console.log(errResponse);
        return errResponse;
      }
      else {
        console.log(response);
        var errorcode: string = response["code"];
        if (errorcode != undefined) {
          const existError = response['code'] !== undefined;
          if (existError) {
            const errResponse = ServiceResponse.createErrorResponse(response['code'], response['error']);
            console.log(errResponse);
            return errResponse;
          }
        }
        else {
          const successResponse = ServiceResponse.createSuccessResponse(undefined);
          return successResponse;
        }
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }

  }


 




}
