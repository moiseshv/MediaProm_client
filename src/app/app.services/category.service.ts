import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseCategoryService } from './parse.category.service';
import { Category } from './../app.model/category';

@Injectable()
export class CategoryService {

  constructor(private _parseCategoryService: ParseCategoryService) {

  }


  /*
  * Devuelve la lista de Categorias 
  */
  public async getCategories(filter : string) {
    console.log("get Categories  Service...");
    //Videos
    try {
      var response = await this._parseCategoryService.getCategories(filter);
      if (response == undefined) {
        var message = "Can not get devices in this moment.";
        console.log(message);
      }
      else {
        var Arr = [];
        if (response != undefined) {
          for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            var categor = new Category();
            categor.fromParseJSON(response[i]);
            Arr.push(categor);
          }        

        }
        return Arr;
      }
    } catch (error) {
      console.log(error);
      var errormessage = "Error trying to connect with server";
      return { "code": "900", "error": errormessage };
    }
  }


/*
  * Elimina una Categoria
  */
  public async removeCategory(id: string) {
    console.log("remove Category  Service...");
    //Videos
    try {
      var response = await this._parseCategoryService.removeCategory(id);
      if (response == undefined) {
        var message = "Can not remove category  this moment.";
        console.log(message);
      }
      else {       
        return response;
      }
    } catch (error) {
      console.log(error);
      var errormessage = "Error trying to connect with server";
      return { "code": "900", "error": errormessage };
    }
  }

 /*
  * Adiciona una Categoria
  */
  public async addCategory(name: string, description : string) {
    console.log("Add Category  Service...");
    //Videos
    try {
      var response = await this._parseCategoryService.addCategory(name,description);
      if (response == undefined) {
        var message = "Can not remove category  this moment.";
        console.log(message);
      }
      else {       
        return response;
      }
    } catch (error) {
      console.log(error);
      var errormessage = "Error trying to connect with server";
      return { "code": "900", "error": errormessage };
    }
  }

}
