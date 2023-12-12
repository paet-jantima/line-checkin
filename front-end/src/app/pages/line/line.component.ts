import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import liff from '@line/liff';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLine();
  }

  initLine(): void {
    liff.init({ liffId: '2001900543-EvW7belD' }, () => {
      this.loginline();
    });
  }

  async loginline() {
    try {
      const profile = await liff.getProfile();
      const data = {
        userId: profile.userId,
        firstName: profile.displayName
      };

      this.authService.loginLineService(data).subscribe({
        next: (res) => {
          localStorage.setItem('user_id', res.data._id);
          this.authService.isloggedIn$.next(true);
          this.router.navigate(['']);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}