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
      }

      this.authService.loginLineService(data).subscribe({
        next: (res) => {
          if (res && res.status === 200 && res.data) { // Ensure proper data handling based on the response structure
            alert("Login success");
            localStorage.setItem("user_id", res.data._id);
            this.authService.isloggedIn$.next(true);
            this.router.navigate(['home']);
          } else {
            alert("User not registered. Redirecting to register page.");
            this.router.navigate(['register']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
