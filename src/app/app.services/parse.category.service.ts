/*
* Servicio que reune los métodos para gestion de categorias.
*/


import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';

@Injectable()
export class ParseCategoryService {
  private serverUrl = MEDIA_SERVER_URL + API_END;


  constructor() {
    Parse.initialize(SERVER_APPLICATION_ID);
    Parse.serverURL = this.serverUrl;
  }

  /*
  * Devuelve la lista de Categorias 
  */
  public async getCategories(filter: string) {
    console.log("Get Categories Parse");
    var query = new Parse.Query("Category");

    try {
      //Ordenado por nombre      
      query.ascending("name");
      if (filter != undefined) {
        query.startsWith("name", filter);
      }

      var req_response = await query.find();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not get Categories" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }

  }


  /*
   * Adiciona una Categoria
   */
  public async addCategory(name: string, description: string) {
    console.log("Add Category request Parse");
    var CategoryClass = Parse.Object.extend("Category");
    var category = new CategoryClass();
    category.set("name", name);
    category.set("description", description);

    try {
      //Primero verificar si existe ya la categoría
      var query = new Parse.Query("Category");
      query.equalTo('name', name);
      var existResponse = await query.find();
      if (existResponse !== undefined && (existResponse as Array<any>).length > 0) {
         console.log(existResponse);
        console.log('Category already exist');
        var errResult = { "code": 909, "message": "Category already exist." };
        return errResult;
      }

      var req_response = await category.save();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not Add Category" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }


  /*
    * Elimina una Categoria
    */
  public async removeCategory(id: string) {
    console.log("Remove Category request Parse");
    var CategoryClass = Parse.Object.extend("Category");
    var category = new CategoryClass();
    category.id = id;

    try {
      var req_response = await category.destroy();
      return req_response;
    } catch (error) {
      var errRes = ('code' in error) ? error : { "code": 900, "message": "Can not Delete Category" };
      console.log('error');
      console.log(errRes);
      return errRes;
    }
  }




}
