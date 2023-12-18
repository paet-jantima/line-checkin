import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from './../../user';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  userForm: FormGroup;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    // สร้างฟอร์มโดยใช้ FormBuilder
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      jobPosition: [''],
      nickname: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/line']);

    }
    this.getUserById();
  }

  onSubmit(): void {
    const userId = localStorage.getItem('user_id');
    const userData = this.userForm.value;
    if (userId) {
      this.userService.updateById(userId, userData).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          alert('User updated successfully');
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error updating user:', error);
          // จัดการข้อผิดพลาดที่เกิดขึ้นในการอัปเดตข้อมูลผู้ใช้
        }
      );
    } else {
      console.error('User ID not found in URL');
      // จัดการเมื่อไม่พบ User ID ใน URL
    }
  }

  getUserById(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (userData) => {
          this.userForm.patchValue({
            firstName: userData.data.firstName || '',
            lastName: userData.data.lastName || '',
            email: userData.data.email || '',
            phoneNumber: userData.data.phoneNumber || '',
            address: userData.data.address || '',
            jobPosition: userData.data.jobPosition || '',
            nickname: userData.data.nickname || '',
            gender: userData.data.gender || ''
          });
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }
}
