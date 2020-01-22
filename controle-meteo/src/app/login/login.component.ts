import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../service/authentificate/authentication.service';
import { Router } from '@angular/router';


@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   loading = false; // Gestion du login
   submitted = false;
   returnUrl: string;
   error: string;
   constructor(private authS: AuthenticationService, private router: Router) {
      this.testAuthentification()
   }

   ngOnInit() {
      this.initForm();
   }

   initForm() {
      this.loginForm = new FormGroup({
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', [Validators.required, Validators.min(8)])
      });
   }

   onSubmitForm() {
      this.submitted = true;
      const formValue = this.loginForm.value;
      console.log(formValue['email'], formValue['password']);
      this.authS.login(formValue['email'], formValue['password'])
      this.testAuthentification()
   }

   testAuthentification() {
      if (this.authS.isAuthenticate) {
         if (this.submitted)
            this.error = ""
         this.router.navigate(['controle-meteo/'])
      } else {
         if (this.submitted)
            this.error = "Mail ou Mot de passe Incorrect";
      }
   }

   revert() {
      this.loginForm.reset()
   }

   goToLogout() {
      this.router.navigate(['controle-meteo/signUp'])
   }
}