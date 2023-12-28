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
      if (liff.isLoggedIn()) {
        this.loginline();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }


  async loginline() {
    try {
      const profile = await liff.getProfile();
      const data = {
        userId: profile.userId,
        firstName: profile.displayName,
        profileImage: profile.pictureUrl

      };

      this.authService.loginLineService(data).subscribe({
        next: (res) => {
          localStorage.setItem('user_id', res.data._id);
          this.authService.isloggedIn$.next(true);
          this.router.navigate(['']);

        }
      });
    }  catch (error: any) { // ใช้ 'error: any' เพื่อระบุว่าตัวแปร 'error' เป็นอะไรบางอย่าง
      console.error(error);

      if (error.status === 500) {
        this.reloadPage();
      } else {
        this.router.navigate([""]);
      }
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
