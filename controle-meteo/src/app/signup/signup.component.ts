/*import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/modeles/user.model';
import { UserService } from 'src/app/service/database.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.signUpForm=new FormGroup({
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
    const formValue=this.signUpForm.value;
    const newUser = new User(formValue['email'],
    formValue['password'],
    formValue['name'],
    formValue['surname'],
    formValue['picture'],
    formValue['sex'],
    formValue['birthday']);
    console.log(newUser);
    this.userService.addUser(newUser);
    this.userService.saveUser(newUser);
    this.userService.save_user(formValue['email'],
    formValue['password'],
    formValue['name'],
    formValue['surname'],
    formValue['picture'],
    formValue['sex'],
    formValue['birthday'])
  }
  
}
*/