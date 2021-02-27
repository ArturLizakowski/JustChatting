import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHostComponent } from './chat-host/chat-host.component';
import { FullScreenLayoutComponent } from './full-screen-layout/full-screen-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: FullScreenLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'chatapp',
    component: ChatHostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
