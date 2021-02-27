import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
  NbAutocompleteModule,
  NbListModule,
  NbUserModule,
  NbIconModule,
  NbChatModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { FullScreenLayoutComponent } from './full-screen-layout/full-screen-layout.component';
import { EqualValidator } from './validators/equal-validator';
import { PasswordStrengthValidator } from './validators/password-strength-validator';
import { ChatContactListComponent } from './chat-contact-list/chat-contact-list.component';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChatMessengerComponent } from './chat-messenger/chat-messenger.component';

const components = [
  AppComponent,
  ChatHostComponent,
  ChatContactListComponent,
  LoginComponent,
  RegisterComponent,
  FullScreenLayoutComponent,
  ChatMessengerComponent
];

const validators = [EqualValidator, PasswordStrengthValidator];

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
    NbAutocompleteModule,
    NbListModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    NbInputModule,
    NbSpinnerModule,
    NbButtonModule,
    FormsModule,
    NbChatModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
