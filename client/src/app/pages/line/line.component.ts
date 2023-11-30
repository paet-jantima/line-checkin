import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import liff from '@line/liff';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})

export default class LineComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.initLine();
  }

  initLine(): void {
    liff.init({ liffId: '2001900543-EvW7belD' }, () => {

      this.loginline()

    });
  }


  async loginline() {
    try {
      const profile = await liff.getProfile();
      var data={
        userId: profile.userId,
        firstName:profile.displayName
      }
      console.log(data);

      this.authService.loginLineService(data).subscribe({
        next: (res) => {
            localStorage.setItem("user_id", res.data._id);
            this.authService.isloggedIn$.next(true);
            this.router.navigate(['']);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
