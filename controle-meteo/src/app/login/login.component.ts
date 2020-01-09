import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatabaseUserService } from '../database-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private userService:DatabaseUserService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.loginForm=new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)

    });
    
  }

  onSubmitForm(){
    const formValue=this.loginForm.value;
    //this.isAuth=this.userService.isValidUser(formValue['email'],formValue['password'])
    //this.authentification.emit(this.isAuth);
  }
}