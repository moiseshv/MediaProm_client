import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPassword } from './resetpass.component';
import { routing }  from './resetpass.routing';

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
    ResetPassword
  ]
})
export class ResetPassModule {}
