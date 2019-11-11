import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { WelcomeComponent } from './welcome/welcome.component';



@NgModule({
  declarations: [LogInComponent, SignUpComponent, SendMailComponent, ChangePasswordComponent, WelcomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }
    ),
    RouterModule.forChild ([
      {path:'welcome', component:WelcomeComponent},
      { path:'signup', component: SignUpComponent },
      { path:'login', component: LogInComponent },
      { path:'', redirectTo: 'welcome', pathMatch: 'full' },
      { path:'sendmail', component: SendMailComponent },
      { path:':userId/change', component: ChangePasswordComponent}
    ])
  ]
})
export class UserModule { }
