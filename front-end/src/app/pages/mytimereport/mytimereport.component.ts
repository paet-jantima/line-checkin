import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeRecordService } from 'src/app/services/time/time.service';
import { timeData } from 'src/app/timedata';


interface ProcessedTimeData extends timeData {
  checkinDate: string;
  checkinTime: string;
  checkoutDate: string;
  checkoutTime: string;
}

@Component({
  selector: 'app-mytimereport',
  templateUrl: './mytimereport.component.html',
  styleUrls: ['./mytimereport.component.scss']
})
export class MytimereportComponent implements OnInit {
  timeData: ProcessedTimeData[] = [];

  constructor(
    private router: Router,
    private timeService: TimeRecordService,
  ) {}

  ngOnInit(): void {
    this.getmytime();
  }

  getmytime() {
    const userId = localStorage.getItem('user_id');

    this.timeService.getMytime(userId).subscribe(
      (timeData: timeData[]) => {
        console.log('User time data:', timeData);
        this.timeData = this.processDateTimeData(timeData);
      },
      (error) => {
        console.error('Error fetching user time:', error);
        // Handle errors here
      }
    );
  }

  private processDateTimeData(data: timeData[]): ProcessedTimeData[] {
    const processedData: ProcessedTimeData[] = [];

    data.forEach((item) => {
      const checkinDateTime = new Date(item.checkin);
      const checkoutDateTime = new Date(item.checkout);

      const processedItem: ProcessedTimeData = {
        ...item,
        checkinDate: item.checkin ? new Date(item.checkin).toLocaleDateString() : '',
    checkinTime: item.checkin ? new Date(item.checkin).toLocaleTimeString() : '',
    checkoutDate: item.checkout ? new Date(item.checkout).toLocaleDateString() : '',
    checkoutTime: item.checkout ? new Date(item.checkout).toLocaleTimeString() : '',
      };

      processedData.push(processedItem);
    });
    console.log(processedData)

    return processedData;
  }
}
