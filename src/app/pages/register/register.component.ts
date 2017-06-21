import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import { RegisterService } from '../../app.services/register.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
   providers: [RegisterService]
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

  constructor(fb:FormBuilder,private _regservice: RegisterService, private modalService: NgbModal) {
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
       var newuser = {'name': '', 'username': '', 'email': '', 'password':''};
       newuser['username'] = this.username.value;
       newuser['name'] = this.name.value;
       newuser['email'] = this.email.value;
       newuser['password'] = this.password.value;
      this.registerUser(newuser);       

    }
  }

  private async registerUser(newuser: Object) {
    var userdata = await this._regservice.register(newuser);

    if (userdata == undefined) {
      var message = "Can not login in this moment. Please try again later.";
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
