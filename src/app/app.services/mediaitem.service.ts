import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseMediaItemService } from './parse.mediaitem.service';

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




 
 
}
