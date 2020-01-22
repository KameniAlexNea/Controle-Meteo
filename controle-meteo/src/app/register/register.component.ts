import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../model/user';
import { DatabaseUserService } from '../service/database/database-user.service';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

   allowedMimeType = ['image/png', 'image/gif', 'image/jpeg'];

   constructor(private userService: DatabaseUserService, private router:Router) {

      this.uploader = new FileUploader({
         url: URL,
         disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
         formatDataFunctionIsAsync: true,
         formatDataFunction: async (item) => {
            return new Promise((resolve, reject) => {
               resolve({
                  name: item._file.name,
                  length: item._file.size,
                  contentType: item._file.type,
                  date: new Date()
               });
            });
         }
      });
      this.hasBaseDropZoneOver = false;
      this.hasAnotherDropZoneOver = false;
      this.response = '';
      this.uploader.response.subscribe(res => this.response = res);
   }

   goToLogin() {
      this.router.navigate(['controle-meteo/signIn'])
   }

   registerForm: FormGroup;

   ngOnInit() {
      this.initForm();
   }

   initForm() {
      this.registerForm = new FormGroup({
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', [Validators.required, Validators.minLength(4)]),
         name: new FormControl('', Validators.required),
         surname: new FormControl('', Validators.required),
         picture: new FormControl('', Validators.required),
         sexe: new FormControl('', Validators.required),
         birthday: new FormControl('', Validators.required),
      });
   }

   onSubmitForm() {
      const formValue = this.registerForm.value;
      const newUser = new User(
         formValue['email'],
         formValue['password'],
         formValue['name'],
         formValue['surname'],
         formValue['picture'],
         formValue['sexe'],
         formValue['birthday']);
      console.log(newUser);
      this.userService.saveUser(newUser);
      this.router.navigate(['controle-meteo/signIn'])
   }

   uploader: FileUploader;
   hasBaseDropZoneOver: boolean;
   hasAnotherDropZoneOver: boolean;
   response: string;


   public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
   }

   public fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
   }
}
