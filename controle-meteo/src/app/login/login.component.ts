import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseUserService } from '../database-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm:FormGroup;
  constructor(private FormBuilder:FormBuilder,
    private userService:DatabaseUserService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.signInForm=this.FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }

  onSubmitForm(){
    const formValue=this.signInForm.value;
    //this.isAuth=this.userService.isValidUser(formValue['email'],formValue['password'])
    //this.authentification.emit(this.isAuth);
  }
}
