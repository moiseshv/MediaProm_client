import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { DeviceService } from './device.service';
import { MediaItemService } from './mediaitem.service';
import { Device } from './../app.model/device';
import { MediaItem } from './../app.model/mediaitem';
import { Plan } from './../app.model/plan';
import { ServiceResponse } from './../app.model/service.response';

@Injectable()
export class AnalyticsService {
  private serverUrl = MEDIA_SERVER_URL + API_END;
  //contiene los devices asociados al usuario actual
  private devices: Array<Device>;
  //contiene los videos asociados al usuario actual
  private videos: Array<MediaItem>;
  //contiene los planes asociados al usuario actual
  private plans: Array<Plan>;
  // user
  private userId: string;
  // cantidad de devices
  private devicescount: number;
  // cantidad de videos
  private videoscount: number;
  // cantidad de videos
  private planscount: number;


  constructor(private _deviceService: DeviceService, private _MediaItemService: MediaItemService) {
  }

  public getDevices() {
    return this.devices;
  }
  public getVideos() {
    return this.getVideos
  }
  public getPlans() {
    return this.getPlans;
  }
  public getUserId() {
    return this.userId;
  }


  public async getResumeData(userid: string) {


    console.log("Resume Service...");
    console.log(userid);

    var devicedata = {
      description: 'dashboard.devices',
      stats: -1,
      helperdata: 'fa fa-desktop fa-3x',
    }

    var videodata = {
      description: 'dashboard.videos',
      stats: -1,
      helperdata: 'fa fa-file-movie-o fa-3x',
    }

    var plandata = {
      description: 'dashboard.plans',
      stats: -1,
      helperdata: 'fa fa-money fa-3x',
    }

    var shareddata = {
      description: 'dashboard.shared_devices',
      stats: -1,
      helperdata: 'fa fa-share-alt fa-3x',
    }


    try {
      var rdevices = await this._deviceService.getDevicesByUser(userid);
      if (rdevices == undefined) {
        var message = "Can not get devices in this moment.";
        console.log(message);
      }
      else {
        console.log(rdevices);
        var errorcode: string = rdevices["code"];
        if (errorcode != undefined) {
          message = rdevices["error"];
          console.log(message);
        }
        else {
           const succ = ServiceResponse.isResposeSuccess(rdevices);
          if (succ) {
            this.devices = rdevices['value'] as Device[];
            devicedata['stats'] = (rdevices !== undefined) ? Object.keys(this.devices).length : -1;
          }      
         

        }
      }
    } catch (error) {
      console.log(error);

    }


    //Videos
    try {
      var rvideos = await this._MediaItemService.getMediaItemsByUser(userid);
      if (rvideos === undefined) {
        var message = "Can not get videos in this moment.";
        console.log(message);
      }
      else {         
          const succ = ServiceResponse.isResposeSuccess(rvideos);
          if (succ) {
            this.videos = rvideos['value'] as MediaItem[];
            videodata['stats'] = ((this.videos !== undefined)) ? Object.keys(this.videos).length : -1;
          }       
      }
    } catch (error) {

    }

    // Visualizar datos estaditicos
    var returnObj = [devicedata, videodata, plandata, shareddata];
    const successResponse = ServiceResponse.createSuccessResponse(returnObj);
    return successResponse;
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
    return [devicedata, videodata, plandata, shareddata];


  }





}
