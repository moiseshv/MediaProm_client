import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseMediaItemService } from './parse.mediaitem.service';
import { MediaItem } from './../app.model/mediaitem';
import { ServiceResponse } from './../app.model/service.response';

@Injectable()
export class MediaItemService {

  constructor(private _parseMediaItemService: ParseMediaItemService) {

  }

  async addOrUpdateMediaItem(objectid: string,name: string, description: string, mrl: string, type: string, ownerid: string, duration: number, priority: number, ) {
    console.log("Add MediaItem  Service...");

    try {
      var response = await this._parseMediaItemService.addOrUpdateMediaItem(objectid,name, description, mrl, type, ownerid, duration, priority);
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
        var mediaitem = new MediaItem();
        mediaitem.fromParseJSON(response);
        const successResponse = ServiceResponse.createSuccessResponse(mediaitem);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }

  }

  /*
     * Elimina una Media
     */
  public async removeMediaItem(id: string) {
    console.log("remove MediaItem  Service...");
    //Videos
    try {
      var response = await this._parseMediaItemService.removeMediaItem(id);
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
        const successResponse = ServiceResponse.createSuccessResponse(undefined);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }
  }



  public async addCategory(videoid: string, categories: string[]) {
    console.log("Add Category to video Service...");

    //Videos
    try {
      var response = await this._parseMediaItemService.addCategoryRest(videoid, categories);
      if (response === undefined) {
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


  public async removeCategory(videoid: string, categories: string[]) {
    console.log("Add Category to video Service...");
    //Videos
    try {
      var response = await this._parseMediaItemService.removeCategory(videoid, categories);
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

  public async getMediaItemsByCategory(categories: string[], withcategory: boolean) {
    console.log("get   of Category Service...");
    //Videos
    try {
      var response = await this._parseMediaItemService.getMediaItemsByCategory(categories, withcategory);
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

        var mediaArr = [];
        if (response != undefined) {
          for (var i = 0; i < response.length; i++) {
            //console.log(response[i]);
            var media = new MediaItem();
            media.fromParseJSON(response[i]);
            mediaArr.push(media);
          }


        }
        const successResponse = ServiceResponse.createSuccessResponse(mediaArr);
        return successResponse;

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

        var mediaArr = [];
        if (response !== undefined) {
          for (var i = 0; i < response.length; i++) {
            var media = new MediaItem();
            media.fromParseJSON(response[i]);
            mediaArr.push(media);
          }

        }
        const successResponse = ServiceResponse.createSuccessResponse(mediaArr);
        return successResponse;

      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }

  }





}
