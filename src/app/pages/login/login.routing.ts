import { Routes, RouterModule } from '@angular/router';

import { Login } from './login.component';
import { ResetPassword } from './resetpass.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Login
    ,
    children: [
      { path: 'resetPassword', component: ResetPassword }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
