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
      return;}

    this.getAllUsers();

  }


  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        (data) => {
          this.users = data.data;
          console.log('All Users:', this.users);
        },
        (error) => {
          console.error('Error fetching all users:', error);
        }
      );
  }

  }



