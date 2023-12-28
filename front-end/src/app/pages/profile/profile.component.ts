import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/user';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isloggedIn: boolean = false;
  users: User[] = [];

  constructor(private authService: AuthService, private router: Router, private userService: UserService,private location: Location) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/line']);

    }

    this.getUserById();

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


  goBack(): void {
    this.router.navigate(['']);
  }

}
