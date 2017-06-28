import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseMediaItemService } from './parse.mediaitem.service';
import { MediaItem } from './../app.model/mediaitem';

@Injectable()
export class MediaItemService {
  
  constructor(private _parseMediaItemService: ParseMediaItemService) {

  }

 
  public async addCategory(videoid: string, categories: string[]) {
    console.log("Add Category to video Service...");     

    videoid = 'iQmxrzPava';
    categories = ['XUM9McE2db','qQuJFZEWcz'];
     //Videos
    try {
      var response = await this._parseMediaItemService.addCategory(videoid,categories);
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


 public async removeCategory(videoid: string, categories: string[]) {
    console.log("Add Category to video Service...");     
     //Videos
    try {
      var response = await this._parseMediaItemService.removeCategory(videoid,categories);
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

 public async getMediaItemsByCategory(categories: string[], withcategory: boolean) {
    console.log("get   of Category Service...");
    //Videos
    try {
      var response = await this._parseMediaItemService.getMediaItemsByCategory(categories, withcategory);
      if (response == undefined) {
        var message = "Can not get devices in this moment.";
        console.log(message);
      }
      else {
        console.log(' de parse');
        console.log(response);
        var mediaArr = [];
        if (response != undefined) {
          for (var i = 0; i < response.length; i++) {
            //console.log(response[i]);
            var media = new MediaItem();
            media.fromParseJSON(response[i]);
            mediaArr.push(media);
          }
         

        }
        console.log('arr');
        console.log(mediaArr);
        return mediaArr;
      }
    } catch (error) {
      console.log(error);
      var errormessage = "Error trying to connect with server";
      return { "code": "900", "error": errormessage };
    }

  }

  public async getMediaItemsByUser(userid: string) {
    console.log("get MediaItems By User Service...");
    //Videos
    try {
      var response = await this._parseMediaItemService.getMediaItemsByUser(userid);
       console.log('req_response ');
        console.log('response ');
      if (response == undefined) {
        var message = "Can not get devices in this moment.";
        console.log(message);
      }
      else {
        var mediaArr = [];
        if (response != undefined) {
          for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            var media = new MediaItem();
            media.fromParseJSON(response[i]);
            mediaArr.push(media);
          }        

        }
        return mediaArr;
      }
    } catch (error) {
      console.log(error);
      var errormessage = "Error trying to connect with server";
      return { "code": "900", "error": errormessage };
    }

  }



 
 
}
