import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { Register } from './register.component';
import { routing }  from './register.routing';

//import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    NgbDropdownModule,
    NgbModalModule,
   
    routing
  ],
  declarations: [
     Register  
  ],
  entryComponents: [    
  ]
})
export class RegisterModule {}

