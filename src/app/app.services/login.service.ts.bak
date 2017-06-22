import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';


@Injectable()
export class LoginService {
  private serverUrl = MEDIA_SERVER_URL + API_END;
  constructor() {
  }

  public async login(username: string, password: string) {
    console.log("Login Service...");
    var serverurl = this.serverUrl + 'login' + '?' + 'username=' + username + '&' + 'password=' + password;
    var req_response = await fetch(serverurl, {
      method: "GET",
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


  public async resetPassword(email: string) {
    console.log("Reset Pass Service...");
    var serverurl = this.serverUrl + 'requestPasswordReset';
    var req_response = await fetch(serverurl, {
      method: "POST",
      body: JSON.stringify({ 'email': email }),
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "MEDIA_PROM"
      }

    });

    console.log(req_response);
    var userdata = await req_response.json();
    return userdata;
  }



  public async logout(tokenSession: string) {
    console.log("Logout Service...");
    var serverurl = this.serverUrl + 'logout';
    var req_response = await fetch(serverurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "MEDIA_PROM",
        "X-Parse-Session-Token": tokenSession
      }
    });
    console.log(req_response);
    var userdata = await req_response.json();
    return userdata;

  }

}




