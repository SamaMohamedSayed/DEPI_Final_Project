import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-loginform',
  standalone: false,
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  constructor(private router:Router,public global:GlobalService){}

  isSubmitted=false

    loginForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
    })
    
    get formControl(){
      return this.loginForm.controls
    }


    handleSubmit(){
      this.isSubmitted=true
      if(this.loginForm.valid){
        this.global.isLogin=true
        console.log(this.loginForm.value)
        this.router.navigateByUrl('/')

      }
    }
}
