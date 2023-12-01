import { User } from './../../user';

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {
  users: User[] = [];
  userService = inject(UserService);
  router = inject(Router);
  authService = inject(AuthService);



  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.getUserById()

  }

  getUserById(): void {
    const id = localStorage.getItem('user_id');

    if (id) {
      this.userService.getUserById(id)
        .subscribe(
          (data) => {
            // ตรวจสอบว่าข้อมูลที่ได้รับมาเป็น Array หรือไม่
            if (Array.isArray(data)) {
              this.users = data; // ถ้าเป็น Array ให้เก็บข้อมูลลงในตัวแปร 'users' โดยตรง
            } else {
              this.users = [data.data]; // ถ้าไม่ใช่ Array ให้สร้าง Array และเก็บข้อมูลลงในตัวแปร 'users'
            }
            console.log('User by ID:', this.users);
          },
          (error) => {
            console.error('Error fetching user by ID:', error);
            // ทำการจัดการข้อผิดพลาดเช่น แจ้งเตือนผู้ใช้หรือประมวลผลข้อมูลเพิ่มเติมที่นี่
          }
        );
    } else {
      console.error('User ID not found in localStorage');
      // ทำการจัดการเมื่อไม่พบ ID ของผู้ใช้ใน localStorage
    }
  }

  }



