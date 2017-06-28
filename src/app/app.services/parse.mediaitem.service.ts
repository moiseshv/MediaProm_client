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


  public async addCategory(videoid: string, categories: string[]) {
    console.log("Categor Add to Video request");

    //Primero formar un arreglo de categories
    var categoryArr = [];
    categories.forEach(element => {
      var category = { "__type": "Pointer", "className": "Category", "objectId": element };
      categoryArr.push(category);
    });

    var videoserverurl = this.serverUrl + 'classes/MediaItem/' + videoid;
    var requestbody =   JSON.stringify( {"categories":{"__op":"AddRelation","objects":categoryArr}} );
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
    var requestbody =   JSON.stringify( {"categories":{"__op":"RemoveRelation","objects":categoryArr}} );
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


/*
  * Devuelve la lista de Videos que tienen o no (withcategory) la categorías
  * si withcategory, responde la lista de los videos que al menos tengan una categoria
  * se no withcategory, devuelve la lista de los videos que no tienen ninguna de las categorias solicitadas
  */
  public async getMediaItemsByUser(userid: string) {
    console.log("Get videos by user request Parse");
    var query = new Parse.Query("MediaItem");
    //Primero formar un el user
    console.log(userid);
    if(userid == undefined){
      return {"code":"901","error":"No user defined"};
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
      console.log(error)
      return error;
    }
  }

  /*
  * Devuelve la lista de Videos que tiene un usuario
  */
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
      console.log(error)
      return error;
    }
  }


}
