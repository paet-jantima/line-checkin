import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator'; // Import PageEvent
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TimeRecordService } from 'src/app/services/time/time.service';
import { timeData } from 'src/app/timedata';
import { Location } from '@angular/common';
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
export class MytimereportComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['date', 'checkinTime', 'checkoutTime', 'status'];
  dataSource: MatTableDataSource<ProcessedTimeData> = new MatTableDataSource<ProcessedTimeData>();

  constructor(
    private router: Router,
    private timeService: TimeRecordService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngAfterViewInit() {
    // Ensure that the paginator is set after the view is initialized
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/line']);
    }
    this.getMyTime();
  }

  getMyTime() {
    const userId = localStorage.getItem('user_id');
    this.timeService.getMytime(userId).subscribe(
      (timeData: timeData[]) => {
        const processedData = this.processDateTimeData(timeData);
        this.dataSource = new MatTableDataSource<ProcessedTimeData>(processedData);
        // Set up the paginator after data is loaded
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.setupSorting();
      },
      (error) => {
        console.error('Error fetching user time:', error);
        // Handle errors here
      }
    );
  }

  private processDateTimeData(data: timeData[]): ProcessedTimeData[] {
    const processedData: ProcessedTimeData[] = [];

    const formatDate = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());
      return `${day}/${month}/${year}`;
    };

    const formatTime = (date: Date): string => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    data.forEach((item) => {
      const processedItem: ProcessedTimeData = {
        ...item,
        checkinDate: item.checkin ? formatDate(new Date(item.checkin)) : '',
        checkinTime: item.checkin ? formatTime(new Date(item.checkin)) : '',
        checkoutDate: item.checkout ? formatDate(new Date(item.checkout)) : '',
        checkoutTime: item.checkout ? formatTime(new Date(item.checkout)) : '',
      };

      processedData.push(processedItem);
    });

    return processedData;
  }
  setupSorting() {
    if (this.sort) {
      this.dataSource.sortingDataAccessor = (item, header) => {
        switch (header) {
          case 'date': return item.checkinDate;
          case 'checkinTime': return item.checkinTime;
          case 'checkoutTime': return item.checkoutTime;
          case 'status': return item.status;
          default: return '';
        }
      };
      this.dataSource.sort = this.sort;
    }
  }

  // Function to handle page change event from the paginator
  onPageChange(event: PageEvent) {
    this.paginator!.pageIndex = event.pageIndex;
    this.paginator!.pageSize = event.pageSize;

  }
  goBack() {
    this.location.back();
  }

}
