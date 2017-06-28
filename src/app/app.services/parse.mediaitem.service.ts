/*
* Servicio que reune los métodos para gestion de videos
*/


import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';
import { Parse } from 'parse';

@Injectable()
export class ParseMediaItemService {
  private serverUrl = MEDIA_SERVER_URL + API_END;

  constructor() {
    Parse.initialize(SERVER_APPLICATION_ID);
    Parse.serverURL = this.serverUrl;
  }

  /* Adiciona un Video
  * O Lo modifica si pasan el ID
   */
  public async addOrUpdateMediaItem(objectid: string, name: string, description: string, mrl: string, type: string, ownerid: string, duration: number, priority: number) {
    console.log("Add Media Item request Parse");
    var MediaItemClass = Parse.Object.extend("MediaItem");
    var mediaItem = new MediaItemClass();

    if (objectid !== undefined) {
      mediaItem.id = objectid;  
      console.log('id definido');   
    }
    mediaItem.set('name', name);
    mediaItem.set('description', description);
    mediaItem.set('priority', priority);
    mediaItem.set('mrl', mrl);
    mediaItem.set('duration', 3);
    mediaItem.set('videoType', type);
  
    //User
    var UserClass = Parse.Object.extend('_User');
    var user = new UserClass();
    user.id = ownerid;
    mediaItem.set('owner', user);

    try {
      //Primero verificar si existe ya existe ese video
      if (objectid === undefined) {
        var query = new Parse.Query("MediaItem");
        query.equalTo('mrl', mrl);
        var queryowner = new Parse.Query("MediaItem");
        query.equalTo('owner', user);

        //var query = Parse.Query.and(querymrl, queryowner);     

        var existResponse = await query.find();
        if (existResponse !== undefined && (existResponse as Array<any>).length > 0) {
          console.log('Media Item already exist');
          var errResult = { "code": 909, "message": "Media already exist." };
          return errResult;
        }
      }

      console.log(mediaItem);
      var req_response = await mediaItem.save();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not Add Video" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }

  /*
  * Elimina un MediaItem
  */
  public async removeMediaItem(id: string) {
    console.log("Remove MediaItem request Parse");
    var MediaItemClass = Parse.Object.extend("MediaItem");
    var mediaitem = new MediaItemClass();
    mediaitem.id = id;

    try {
      var req_response = await mediaitem.destroy();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not Delete Media" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }

  /*
  * Devuelve la lista de Videos que tienen o no (withcategory) la categorías
  * si withcategory, responde la lista de los videos que al menos tengan una categoria
  * se no withcategory, devuelve la lista de los videos que no tienen ninguna de las categorias solicitadas
  */
  //OK
  public async getMediaItemsByUser(userid: string) {
    console.log("Get videos by user request Parse");
    var query = new Parse.Query("MediaItem");
    //Primero formar un el user
    console.log(userid);
    if (userid == undefined) {
      return { "code": "901", "error": "No user defined" };
    }
    let user = new Parse.User();
    user.id = userid;
    try {
      //Ordenado por nombre      
      query.ascending("name");
      //Que incluya los datos del owner
      query.include("owner");
      query.equalTo("owner", user);
      var req_response = await query.find();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not get Media Items" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }

  /*
  * Devuelve la lista de Videos que tiene un usuario
  */
  //OK
  public async getMediaItemsByCategory(categories: string[], withcategory: boolean) {
    console.log("Get videos by categories request Parse");
    var query = new Parse.Query("MediaItem");
    //Primero formar un arreglo de categories
    var Arr = [];
    var catclass = Parse.Object.extend("Category");
    categories.forEach(element => {
      var category = catclass.createWithoutData(element);
      Arr.push(category);
    });

    try {
      //Ordenado por nombre      
      query.ascending("name");
      //Que incluya los datos del owner
      query.include("owner");

      if (withcategory) {
        query.containedIn("categories", Arr);
      }
      else {
        query.notContainedIn("categories", Arr);
      }
      var req_response = await query.find();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not get Media Items" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }






  //REST 
  public async getMediasbyUser(userid: string) {
    //where={"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}
    // userid = "wJ1XDdGTFf";
    console.log("Videos request");
    var requestobj = { "owner": { "__type": "Pointer", "className": "_User", "objectId": "wJ1XDdGTFf" } };
    requestobj.owner.objectId = userid;
    var videoserverurl = this.serverUrl + 'classes/MediaItem';
    var strobj = JSON.stringify(requestobj);//'{"owner":{"__type":"Pointer","className":"_User","objectId":"wJ1XDdGTFf"}}';
    videoserverurl = videoserverurl + '?where=' + strobj;

    var headers = {
      "Content-Type": "Application/json",
      "X-Parse-Application-Id": SERVER_APPLICATION_ID,
    }

    try {
      var req_response = await fetch(videoserverurl, { method: "GET", headers });
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


  public async addCategoryRest(videoid: string, categories: string[]) {
    console.log("Categor Add to Video request");

    //Primero formar un arreglo de categories
    var categoryArr = [];
    categories.forEach(element => {
      var category = { "__type": "Pointer", "className": "Category", "objectId": element };
      categoryArr.push(category);
    });

    var videoserverurl = this.serverUrl + 'classes/MediaItem/' + videoid;
    var requestbody = JSON.stringify({ "categories": { "__op": "AddRelation", "objects": categoryArr } });
    console.log(requestbody);

    try {
      var req_response = await fetch(videoserverurl, {
        method: "PUT",
        body: requestbody,
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": SERVER_APPLICATION_ID
        }
      }
      );
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


  public async removeCategory(videoid: string, categories: string[]) {
    console.log("Remove Category to Video request");

    //Primero formar un arreglo de categories
    var categoryArr = [];
    categories.forEach(element => {
      var category = { "__type": "Pointer", "className": "Category", "objectId": element };
      categoryArr.push(category);
    });

    var videoserverurl = this.serverUrl + 'classes/MediaItem/' + videoid;
    var requestbody = JSON.stringify({ "categories": { "__op": "RemoveRelation", "objects": categoryArr } });
    console.log(requestbody);

    try {
      var req_response = await fetch(videoserverurl, {
        method: "PUT",
        body: requestbody,
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": SERVER_APPLICATION_ID
        }
      }
      );
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
