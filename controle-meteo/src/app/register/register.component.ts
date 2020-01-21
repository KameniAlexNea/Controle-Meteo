import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../model/user';
import { DatabaseUserService } from '../service/database/database-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private userService:DatabaseUserService) { 
    
  }

  registerForm:FormGroup;
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.registerForm=new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
    surname:new FormControl('',Validators.required),
    picture:new FormControl('',Validators.required),
    sex:new FormControl('',Validators.required),
    birthday:new FormControl('',Validators.required),

    });
    
  }
  onSubmitForm(){
    const formValue=this.registerForm.value;
    const newUser = new User(formValue['email'],
    formValue['password'],
    formValue['name'],
    formValue['surname'],
    formValue['picture'],
    formValue['sex'],
    formValue['birthday']);
    console.log(newUser);
    this.userService.saveUser(newUser);
  }
}
