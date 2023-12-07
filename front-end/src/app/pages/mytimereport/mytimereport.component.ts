import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeRecordService } from 'src/app/services/time/time.service';

@Component({
  selector: 'app-mytimereport',
  templateUrl: './mytimereport.component.html',
  styleUrls: ['./mytimereport.component.scss']
})
export class MytimereportComponent {

  constructor(
    private router: Router,
    private timeService:TimeRecordService,
  ) {}

  ngOnInit(): void {

  }

  getmytime() {
    const data = {
      userId: localStorage.getItem('user_id')
    };


    this.timeService.getMytime(data.userId).subscribe(
      (timeData) => {
        // Handle successful response here
        console.log('User time data:', timeData);
        // You can assign the time data to a variable or perform any other actions
      },
      (error) => {
        // Handle errors here
        console.error('Error fetching user time:', error);
        // Perform error handling or show error messages to the user
      }
    );
  }
}
