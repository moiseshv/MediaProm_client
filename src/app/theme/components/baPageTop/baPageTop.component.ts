import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { LoginService } from '../../../app.services/login.service';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  providers: [LoginService]
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public isUserLogged: boolean = false;
  public sessionToken: string = "";
  public username: string = "";
  public avatarfilename: string = "sign_in_avatar";
  public userActionName = "Sign In";
  private _user: Object;


  constructor(private router: Router, private _state: GlobalState, private _loginservice: LoginService) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this._state.subscribe('session.token', (token) => {
      this.sessionToken = token;
    });

    this._state.subscribe('user.isLogged', (isLogged) => {
      this.isUserLogged = isLogged;
      this.userActionName = isLogged ? "Sign Out" : "Sign In";
    });

    this._state.subscribe('user.current', (user) => {

      if (user != undefined) {
        this._user = user;
        this.username = user['name'];
        this.avatarfilename = user['photo'];
        if(!this.avatarfilename){
         // this.avatarfilename = 'sign_in_avatar';

          }
      }
    });

  }

  public toggleMenu() {
     this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public logOut() {
    if (this.isUserLogged) {
      this._logout(this.sessionToken);
    }
    else {
      this.router.navigate(['/pages/login']);
    }
    return false;
  }

  public register() {
    this.router.navigate(['/pages/register']);
    return false;
  }

public resetPassword() {
    this.router.navigate(['/pages/resetpassword']);
    return false;
  }



  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }



  private async _logout(token: string) {
    try {
      var userdata = await this._loginservice.logout(token);
    } catch (error) {
        alert("Error. Can not connect to server. Please try again later.");
    }
    

    if (userdata == undefined) {
      var message = "Can not logout in this moment. Please try again later.";
      alert(message);
    }
    else {
      console.log(userdata);
      var errorcode: string = userdata["code"];
      if (errorcode != undefined) {
        message = userdata["error"];
        alert(message);
      }
      else {
        //Salvar el usuario actual  
        message = "Logout Process OK!!!";
        this.isUserLogged = false;
        // Se guarda el current user id
        sessionStorage.setItem('user.current.id', undefined);
        this._state.notifyDataChanged('user.isLogged', this.isUserLogged);
        this.username = "";
        this.avatarfilename = 'sign_in_avatar';
        console.log(message);
      }
    }
  }
}
