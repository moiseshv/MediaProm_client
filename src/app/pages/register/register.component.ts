import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import { AuthService } from '../../app.services/auth.service';
import { User } from '../../app.model/user';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
   providers: [AuthService]
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public username:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder,private _regservice: AuthService, private modalService: NgbModal) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
       console.log("Registering:" + this.email );
       var new_user = new User();
       new_user.name = this.name.value;
       new_user.username = this.username.value;
       new_user.email = this.email.value;
       new_user.password = this.password.value;      
       this.registerUser(new_user);
    }
  }

  private async registerUser(newuser: User) {
    var userdata = await this._regservice.register(newuser);

    if (userdata == undefined) {
      var message = "Can not register in this moment. Please try again later.";
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
        message = "Register Process OK!!!";
         alert(message);
         console.log(message);
      }
    }
  }


}
