import { User } from './../../user';

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

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



  ngOnInit(): void {

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



