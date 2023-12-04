import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isloggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isloggedIn$.subscribe(res => {
      this.isloggedIn = this.authService.isLoggedIn();
    });
  }

  logout(): void {
    localStorage.clear();
    this.authService.isloggedIn$.next(false);
    window.location.reload();
  }
}
