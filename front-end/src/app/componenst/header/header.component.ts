import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isloggedIn: boolean = false;
  users: User[] = [];

  constructor(private authService: AuthService, private router: Router, private userService: UserService,) { }
  ngOnInit(): void {
    this.authService.isloggedIn$.subscribe(res => {
      this.isloggedIn = res;
      if (res) {
        this.getUserById();
      } else {
        this.users = []; // Clear user data when logged out
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.authService.isloggedIn$.next(false);
    this.router.navigate(['line']); // Redirect to login page after logout
  }

  // Function to fetch user data by ID
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
}
