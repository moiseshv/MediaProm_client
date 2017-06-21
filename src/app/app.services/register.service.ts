import { Injectable } from '@angular/core';
import { MEDIA_SERVER_URL, API_END } from './../app.configs';


@Injectable()
export class RegisterService {
  private serverUrl = MEDIA_SERVER_URL + API_END;
  constructor() {

  }

  public async register(newuser) {
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
