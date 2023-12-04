
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
    const data = {
      userId: localStorage.getItem('user_id')
    };


    this.timeService.getMytime(data.userId).subscribe(
      (timeData) => {
        // Handle successful response here
        console.log('User time data:', timeData);
        // You can assign the time data to a variable or perform any other actions
      },
      (error) => {
        // Handle errors here
        console.error('Error fetching user time:', error);
        // Perform error handling or show error messages to the user
      }
    );
  }

  checkin() {
    const data = {
      userId: localStorage.getItem('user_id')
    };

    this.timeService.checkIn(data).subscribe(
      (response) => {
        // Handle successful check-in response here
        console.log('Check-in successful:', response);
        // You can perform any necessary actions upon successful check-in
      },
      (error) => {
        // Handle errors here
        console.error('Error during check-in:', error);
        // Perform error handling or show error messages to the user
      }
    );
  }


  checkout() {
    const data = {
      userId: localStorage.getItem('user_id')
    };

    this.timeService.checkOut(data).subscribe(
      (response) => {
        // Handle successful checkout response here
        console.log('Checkout successful:', response);
        // You can perform any necessary actions upon successful checkout
      },
      (error) => {
        // Handle errors here
        console.error('Error during checkout:', error);
        // Perform error handling or show error messages to the user
      }
    );
  }




}
