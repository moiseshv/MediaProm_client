import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../app.services/auth.service';
import { NgaModule } from '../../theme/nga.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'resetPassword',
  templateUrl: './resetpass.html',
  styleUrls: ['./resetpass.scss'],
  providers: [AuthService]
})
export class ResetPassword {

  public form:FormGroup;
  public email:AbstractControl;
  public submitted:boolean = false;

  public titlemsg: string = 'Enter email address and send request.'

  constructor(fb:FormBuilder, private _loginservice: AuthService, private modalService: NgbModal) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.email = this.form.controls['email'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid ){
       console.log("User: " + values["email"] + " is trying to reset password" );
       this.resetpass(values["email"]);
    }
  }

    private async resetpass(email: string) {

      try {
        var userdata = await this._loginservice.resetPassword(email);
      } catch (error) {
         var message = "Can not connect with server. Please try again later.";
          this.titlemsg = message;
      }
    

    if (userdata == undefined) {
      var message = "Can not reset password in this moment. Please try again later.";
           this.titlemsg = message;
    }
    else {
      console.log(userdata);
      var errorcode: string = userdata["code"];
      if (errorcode != undefined) {
        message = userdata["error"];
        this.titlemsg = message;
      }
      else {
        //Salvar el usuario actual 
        message = "Reset Request Sended";
         this.titlemsg = message;
        console.log(message);
      }
    }
  }
   
}
