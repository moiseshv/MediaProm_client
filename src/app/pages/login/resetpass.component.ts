import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../../app.services/login.service';
import { NgaModule } from '../../theme/nga.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';

@Component({
  selector: 'resetPassword',
  templateUrl: './resetpass.html',
  styleUrls: ['./login.scss'],
  providers: [LoginService]
})
export class ResetPassword {

  public form:FormGroup;
  public email:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,private _loginservice: LoginService, private modalService: NgbModal) {
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
    var userdata = await this._loginservice.resetPassword(email);

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
        message = "Reset Process OK!!!";
        console.log(message);
        this.childModalShow(message, 'Notification');
      }
    }
  }
   childModalShow(message : string, title:string) {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = title;
    activeModal.componentInstance.modalContent = message;
  }
}
