import { Component, OnInit } from '@angular/core';
import { User } from './../../user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/line']);
      return;
    }
    this.getAllUsers(); // เรียกใช้เมื่อ Component ถูกโหลดขึ้นมา
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.data;
        console.log(this.users);
      }
    );
  }

}
