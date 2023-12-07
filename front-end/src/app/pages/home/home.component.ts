
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { User } from './../../user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TimeRecordService } from 'src/app/services/time/time.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  dateTime: Date = new Date();

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private timeService:TimeRecordService

  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    timer(0,1000).subscribe(()=>{
      this.dateTime = new Date();
    })
    this.getUserById();
    this.getmytime();
  }

  getUserById(): void {
    const id = localStorage.getItem('user_id');

    if (id) {
      this.userService.getUserById(id).subscribe(
        (data) => {
          // Check if the received data is an Array
          if (Array.isArray(data)) {
            this.users = data; // Assign data directly to 'users' if it's an Array
          } else {
            this.users = [data.data]; // If not an Array, create an Array and assign data to 'users'
          }
          console.log('User by ID:', this.users);
        },
        (error) => {
          console.error('Error fetching user by ID:', error);
          // Handle errors here, such as notifying the user or additional data processing
        }
      );
    } else {
      console.error('User ID not found in localStorage');
      // Handle when the user ID is not found in localStorage
    }
  }

  getmytime() {
    this.router.navigate(['mytimereport']);
  }

  checkin() {
    // ส่งค่า check-in ไปยังหน้า scanner
    this.router.navigate(['scanner'], { queryParams: { type: 'checkin' } });
  }

  checkout() {
    // ส่งค่า check-out ไปยังหน้า scanner
    this.router.navigate(['scanner'], { queryParams: { type: 'checkout' } });
  }




}
