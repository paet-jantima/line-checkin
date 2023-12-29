import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TimeRecordService } from 'src/app/services/time/time.service';
import { timeData } from 'src/app/timedata';
import { DatePipe, Location } from '@angular/common';

interface ProcessedTimeData extends timeData {
  checkinDate: string;
  checkinTime: string;
  checkoutDate: string;
  checkoutTime: string;
  createdAtDate: string;
  createdAtTime: string;
}

@Component({
  selector: 'app-mytimereport',
  templateUrl: './mytimereport.component.html',
  styleUrls: ['./mytimereport.component.scss'],
  providers: [DatePipe, Location]
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
    private location: Location,
    private datePipe: DatePipe
  ) { }

  ngAfterViewInit() {
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

    data.forEach((item) => {
      const processedItem: ProcessedTimeData = {
        ...item,
        checkinDate: item.checkin ? new Date(item.checkin).toLocaleDateString() : '',
        checkinTime: item.checkin ? new Date(item.checkin).toLocaleTimeString() : '',
        checkoutDate: item.checkout ? new Date(item.checkout).toLocaleDateString() : '',
        checkoutTime: item.checkout ? new Date(item.checkout).toLocaleTimeString() : '',
        createdAtDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
      };

      processedData.push(processedItem);
    })

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

  onPageChange(event: PageEvent) {
    this.paginator!.pageIndex = event.pageIndex;
    this.paginator!.pageSize = event.pageSize;
  }

  goBack() {
    this.location.back();
  }
}
