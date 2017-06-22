import { NgModule } from '@angular/core';
import { CommonModule }from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';

import { Login } from './login.component';
import { routing } from './login.routing';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
     NgbDropdownModule,
    NgbModalModule,
    routing
  ],
  declarations: [
    Login, 
    DefaultModal
  ],
  entryComponents: [
    DefaultModal
  ]
})
export class LoginModule {}
