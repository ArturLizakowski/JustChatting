import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatHostComponent } from './chat-host/chat-host.component';
import { LoginComponent } from './login/login.component';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbThemeModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbToastrModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { FullScreenLayoutComponent } from './full-screen-layout/full-screen-layout.component';
import { EqualValidator } from './validators/equal-validator';
import { PasswordStrengthValidator } from './validators/password-strength-validator';

const components = [
  AppComponent,
  ChatHostComponent,
  LoginComponent,
  RegisterComponent,
  FullScreenLayoutComponent,
];

const validators = [
  EqualValidator,
  PasswordStrengthValidator
]

@NgModule({
  declarations: [...components, ...validators],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbSpinnerModule,
    NbButtonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
