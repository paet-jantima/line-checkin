import { AuthService } from './../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {confirmPasswordValidator} from '../../../app/validators/comfirm-password.validator'
import { Router } from '@angular/router';
import liff from '@line/liff';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder)
  authService = inject(AuthService);
  router = inject(Router);
  registerForm !: FormGroup;

  ngOnInit(): void {
    this.initLine();

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      jobPosition: ['', Validators.required],
      userId: [''] // Initialize userId here, or set it dynamically later
    });
  }

  async initLine(): Promise<void> {
    await liff.init({ liffId: '2001900543-EvW7belD' });
    const profile = await liff.getProfile();
    this.registerForm.patchValue({ userId: profile.userId });
  }

  async register(): Promise<void> {
    try {
      const response = await this.authService.registerService(this.registerForm.value).toPromise();
      if (response) {
        alert('User Created');
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }


}
