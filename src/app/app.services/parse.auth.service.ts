/*
* Servicio que reune los métodos para Login, Logout, Registro  y Reinicio de clave
* Utilizando para ellos el server basado en ParseJs
*/

import { Injectable } from '@angular/core';
// Configuraciones de la Aplicacion
import { MEDIA_SERVER_URL, API_END, SERVER_APPLICATION_ID } from './../app.configs';


@Injectable()
export class ParseAuthService {
  //http://138.197.99.140:4040/parse  apunta a la API CRUD de Pase
  private serverUrl = MEDIA_SERVER_URL + API_END;
  constructor() {
  }

/*
* Login asyncronico, devuelve el objeto _User de Parse tiene su session token
* O un código de error {code , message}
* Recibe username  password
*/
  public async login(username: string, password: string) {
    console.log("Parse Login Service...");
    //http://138.197.99.140:4040/parse/login/?username=moises&password=password;
    var serverurl = this.serverUrl + 'login' + '?' + 'username=' + username + '&' + 'password=' + password;
    var req_response = await fetch(serverurl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": SERVER_APPLICATION_ID,
        "X-Parse-Revocable-Session": "1"
      }

    });
    console.log(req_response);
    var userdata = await req_response.json();
    return userdata;

  }

/*
* Logout asyncronico, 
* O un código de error {code , message}
* Recibe tokenSession  
*/
   public async logout(tokenSession: string) {
    //http://138.197.99.140:4040/parse/logout
    console.log("Parse Logout Service...  " + tokenSession );
    var serverurl = this.serverUrl + 'logout';
    var req_response = await fetch(serverurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": SERVER_APPLICATION_ID,
        "X-Parse-Session-Token": tokenSession
      }
    });
    console.log(req_response);
    var userdata = await req_response.json();
    return userdata;

  }


/*
* Reset asyncronico, devuelve vacío 
* O un código de error {code , message}
* Se pasa el email
*/
  public async resetPassword(email: string) {
    console.log("Parse Reset Pass Service...");
   //http://138.197.99.140:4040/requestPasswordReset
    var serverurl = this.serverUrl + 'requestPasswordReset';
    
    var req_response = await fetch(serverurl, {
      method: "POST",
      body: JSON.stringify({ 'email': email }),
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": SERVER_APPLICATION_ID
      }

    });

    console.log(req_response);
    var userdata = await req_response.json();
    return userdata;
  }


/*
* Logout asyncronico, 
* O un código de error {code , message}
* Recibe _User  de Parse
*/
 public async register(newuser) {
   console.log("Parse Register Service...");
    //http://138.197.99.140:4040/users
    var serverurl = this.serverUrl + 'users';
    var req_response = await fetch(serverurl, {
      method: "POST",
      body: JSON.stringify(newuser),
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "MEDIA_PROM",
        "X-Parse-Revocable-Session": "1"
      }

    });

    console.log(req_response);
    var userdata = await req_response.json();
    return userdata;

  }

}




