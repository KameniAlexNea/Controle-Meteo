import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatabaseUserService } from '../service/database/database-user.service';


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
   constructor(private userService: DatabaseUserService) { }

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
      this.userService.isValid(formValue['email'], formValue['password']).then(
         (res) => {
            this.loading = res as boolean;
            console.log(res as boolean);
         }
      ).catch((err) => {
         console.log(err)
         this.loginForm.setErrors(err)
      });
      //this.authentification.emit(this.isAuth);
   }

   revert() {
      this.loginForm.reset()
   }
}