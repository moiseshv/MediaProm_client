/*
* Servicio que reune los métodos para gestion de los devices
*/


import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';

@Injectable()
export class ParseDeviceService {
  private serverUrl = MEDIA_SERVER_URL + API_END;


  constructor() {
    Parse.initialize(SERVER_APPLICATION_ID);
    Parse.serverURL = this.serverUrl;
  }




  /*
  * Devuelve la lista de Categorias 
  */
  public async getCategories(filter : string) {
    console.log("Get Categories Parse");
    var query = new Parse.Query("Category");
    
    try {
      //Ordenado por nombre      
      query.ascending("name");
      if(filter != undefined  )
      {
         query.startsWith("name", filter );
      }
     
      var req_response = await query.find();
      return req_response;
    } catch (error) {
      console.log(error)
      return error;
    }

  }


 /*
  * Adiciona una Categoria
  */
  public async addCAtegory(name: string, description : string) {
    console.log("Add Category request Parse");
    var CategoryClass = Parse.Object.extend("Category");
    var category = new CategoryClass();
    category.set("name",name);
    category.set("description",description);

    try {      
      var req_response = await category.save();
      return req_response;
    } catch (error) {
      console.log(error)
      return {"code": 902,"error": "Can not add a Category"};
    }
  }


/*
  * Adiciona una Categoria
  */
  public async removeCategory(id: string) {
    console.log("Add Category request Parse");
    var CategoryClass = Parse.Object.extend("Category");
    var category = new CategoryClass();
    category.id = id;
   
    try {      
      var req_response = await category.destroy();
      return req_response;
    } catch (error) {
      console.log(error)
      return {"code": 902,"error": "Can not Delete a Category"};
    }
  }

 
 

}
