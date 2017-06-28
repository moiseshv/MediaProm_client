import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';
import { ParseCategoryService } from './parse.category.service';
import { Category } from './../app.model/category';
import { ServiceResponse } from './../app.model/service.response';

@Injectable()
export class CategoryService {

  constructor(private _parseCategoryService: ParseCategoryService) {

  }


  /*
  * Devuelve la lista de Categorias 
  */
  async getCategories(filter: string) {
    console.log("get Categories Service...");
    //Videos
    try {
      var response = await this._parseCategoryService.getCategories(filter);
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

        var Arr = [];
        if (response !== undefined) {

          for (var i = 0; i < response.length; i++) {
            const category = new Category();
            category.fromParseJSON(response[i]);
            Arr.push(category);
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


  /*
    * Elimina una Categoria
    */
  public async removeCategory(id: string) {
    console.log("remove Category  Service...");
    //Videos
    try {
      var response = await this._parseCategoryService.removeCategory(id);
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
         console.log(response);
        const successResponse = ServiceResponse.createSuccessResponse(undefined);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
       console.log(errResponse);
       return errResponse;
    }
  }

  /*
   * Adiciona una Categoria OK
   */
  public async addCategory(name: string, description: string) {
    console.log("Add Category  Service...");
    //Videos
    try {
      var response = await this._parseCategoryService.addCategory(name, description);
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
        var category = new Category();
        category.fromParseJSON(response);
        const successResponse = ServiceResponse.createSuccessResponse(category);
        return successResponse;
      }
    } catch (error) {
      const errResponse = ServiceResponse.createErrorResponseByCode('900');
      console.log(errResponse);
      return errResponse;
    }
  }

}
