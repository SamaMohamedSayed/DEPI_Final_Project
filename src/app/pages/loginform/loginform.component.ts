import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginform',
  standalone: false,
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  constructor(private router:Router,public global:GlobalService,private toastr:ToastrService){}

  isSubmitted=false

    loginForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])
    })
    
    get formControl(){
      return this.loginForm.controls
    }


    handleSubmit() {
  this.isSubmitted = true;

  if (this.loginForm.valid) {
    this.global.login(this.loginForm.value).subscribe(
      res => {
        if (res.message === 'Login successful') {
          this.toastr.success(res.message);
          this.loginForm.reset();

          this.global.isLogin = true;

          // توجيه حسب نوع المستخدم
          if (res.userType === 'job_seeker') {
            this.router.navigateByUrl('/jobs');
          } else if (res.userType === 'employer') {
            this.router.navigateByUrl('/employer');
          } else {
            this.router.navigateByUrl('/');
          }

        } else {
          this.toastr.error(res.message); // لو السيرفر رجّع رسالة خطأ
          this.global.isLogin = false; // تأكيد إن الدخول فشل
        }
      },
      err => {
        this.toastr.error(err.error.message || "Login failed");
        console.log(err.error);
        this.global.isLogin = false; // فشل فعلي في الاتصال
      }
    );
  }
}

}
