import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import liff from '@line/liff';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService);
  router = inject(Router);

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],

    });

  }
  login(){
   this.authService.loginService(this.loginForm.value)
   .subscribe({
    next:(res)=>{
      alert("Login success")
      localStorage.setItem("user_id",res.data._id);
      this.authService.isloggedIn$.next(true);
      this.router.navigate(['home']);
      this.loginForm.reset();
    },error:(err)=>{
      console.log(err)
    }
   })
   }

  initLine(): void {
    liff.init({ liffId: '2001900543-EvW7belD' }, () => {
      if (liff.isLoggedIn()) {
        this.router.navigate(['line']);
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }


}
