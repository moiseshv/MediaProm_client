import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../app.services/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [LoginService]
})
export class Login {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public email: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, private _loginservice: LoginService, private modalService: NgbModal) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log("User: " + values["username"] + " is trying to login");

      this.login(values);

    }
  }

  private async login(values: Object) {
    var userdata = await this._loginservice.login(values["username"], values["password"]);

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