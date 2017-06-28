import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../app.services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GlobalState} from '../../../app/global.state';
import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [AuthService]
})
export class Login {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public email: AbstractControl;
  public submitted: boolean = false;

  public currentUser: Object;

  constructor(private router: Router, private _state:GlobalState, fb: FormBuilder, private _loginservice: AuthService, private modalService: NgbModal) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];

    this._state.subscribe('user.current', (user) => {
      this.currentUser = user;
    });


  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log("User: " + values["username"] + " is trying to login");
      this.login(values);

    }
  }

  private async login(values: Object) {
    try {
      var userdata = await this._loginservice.login(values["username"], values["password"]);
    } catch (error) {
      console.log(error);
      this.childModalShow(message, 'Error!! Failed to connect with server. Please Try again later.');
    }
    

    if (userdata == undefined) {
      var message = "Can not login in this moment. Please try again later.";
      this.childModalShow(message, 'Error Notification');
    }
    else {
      console.log(userdata);
      var errorcode: string = userdata["code"];
      if (errorcode != undefined) {
        message = userdata["error"];
        this.childModalShow(message, 'Error Notification');
      }
      else {
        //Salvar el usuario actual 
        message = "Login Process OK!!!";
        console.log(message);
       console.log( userdata);
        // Se guarda el current user id
        sessionStorage.setItem('user.current.id', userdata['objectId']);
        var user = sessionStorage.getItem('user.current.id');

        this._state.notifyDataChanged('user.current', userdata);
        this._state.notifyDataChanged('session.token', userdata['sessionToken']);
        this._state.notifyDataChanged('user.isLogged', true);
       
        this.router.navigate(['/']);
       // this.childModalShow(message, 'Notification');
      }
    }
  }

 childModalShow(message : string, title:string) {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = title;
    activeModal.componentInstance.modalContent = message;
  }

}
