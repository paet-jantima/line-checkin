import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isloggedIn: boolean = false;
  router = inject(Router);
  ngOnInit(): void {
    this.authService.isloggedIn$.subscribe(res => {
      this.isloggedIn = this.authService.isLoggedIn();
    })

  }




  logout() {
    localStorage.clear();
    this.authService.isloggedIn$.next(false);
    window.location.reload();

  }
}
