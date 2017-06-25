/*
* Servicio que reune los métodos para Login, Logout, Registro  y Reinicio de clave
* Este apunta al servicio de parse, se hace así para desacoplar de PArse
*/

import { Injectable } from '@angular/core';
import { ParseAuthService } from './parse.auth.service';
import { User } from './../app.model/user';

// Configuraciones de la Aplicacion
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';


@Injectable()
export class AuthService {
  //http://138.197.99.140:4040/parse  apunta a la API CRUD de Pase
  private serverUrl = MEDIA_SERVER_URL + API_END;
  constructor(private _parseService: ParseAuthService) {
  }

  /*
  * Login asyncronico, devuelve el objeto _User de Parse tiene su session token
  * O un código de error {code , message}
  * Recibe username  password
  */
  public async login(username: string, password: string) {
    console.log("Login Service...");
    try {
      var userdata = await this._parseService.login(username, password);
    } catch (error) {
      var errorstr = "Error. Can not connect to server. Please try again later.";
      console.log(error);
      var errorResult = {'code' : 1, 'error': errorstr };
      return errorResult;
    }


    if (userdata == undefined) {
      var message = "Can not login in this moment. Please try again later.";
      console.log(message);
      var errorResult = {'code' : 1, 'error': errorstr };
      return errorResult;
    }
    else {
      console.log(userdata);
      var errorcode: string = userdata["code"];
      if (errorcode != undefined) {
        message = userdata["error"];
        console.log(message);
        return userdata;
      }
      else {
        //Salvar el usuario actual 
        message = "Login Process OK!!!";
        console.log(message);

        //Se guarda el usuario en el sessionStorage
        var user = new User();
        user.fromParseJSON(userdata);
        sessionStorage.setItem('user.current', userdata);
        sessionStorage.setItem('user.current.id', userdata['objectId']);
        return user;
      }
    }

  }

  /*
  * Logout asyncronico, 
  * O un código de error {code , message}
  * Recibe tokenSession  
  */
  public async logout(tokenSession: string) {
    try {
      var userdata = await this._parseService.logout(tokenSession);
    } catch (error) {
      var error = "Error. Can not connect to server. Please try again later.";
      var errorResult =  {'code' : 1, 'error': error };
      return errorResult;
    }


    if (userdata == undefined) {
      var message = "Can not logout in this moment. Please try again later.";
      errorResult = {'code' : 1, 'error': message };
      console.log(message);
      return errorResult;
     
    }
    else {
      console.log('response del logout');
      console.log(userdata);       
      return userdata;
      
    }
  }



  /*
  * Reset asyncronico, devuelve vacío 
  * O un código de error {code , message}
  * Se pasa el email
  */
  public async resetPassword(email: string) {
    try {
      var userdata = await this._parseService.resetPassword(email);      
    } catch (error) {
      var message = "Can not connect with server. Please try again later.";
      var errorResult =  {'code' : 1, 'error': message };
      return errorResult;
    }


    if (userdata == undefined) {
      var message = "Empty response from server. Please try again later.";
      var errorResult = {'code' : 1, 'error': message };
      return errorResult;
    }
    else {
      console.log(userdata);
      return userdata;
      
    }
  }



  /*
  * Logout asyncronico, 
  * O un código de error {code , message}
  * Recibe _User  de Parse
  */
  public async register(newuser : User) {
  var parseuser = newuser.toJSON();
  console.log(parseuser);

   try {
      var userdata = await this._parseService.register(parseuser);      
    } catch (error) {
      var message = "Can not connect with server. Please try again later.";
     var errorResult = {'code' : 1, 'error': message };
      return errorResult;
    }

 

  if (userdata == undefined) {
    var message = "Can not register in this moment. Please try again later.";
    var errorResult = {'code' : 1, 'error': message };
    return errorResult;
  }
  else {
    console.log(userdata);
    var errorcode: string = userdata["code"];
    if (errorcode != undefined) {
      return userdata;
    }
    else {
      //Salvar el usuario actual 
      message = "Register Process OK!!!";
      console.log(message);
       return userdata;
    }
  }

}




}




