import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from './../../user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'jobPosition', 'absentDays', 'lateDays'];
  displayedData = this.displayedColumns.slice(0, 5);
  dataSource: MatTableDataSource<User>= new MatTableDataSource<User>();
  pageIndex: number = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef ,// เพิ่ม ChangeDetectorRef ไปยัง constructor
    private location: Location
  ) {

  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/line']);
       return;
    }
    this.applySortingAndPagination(); // ก่อนจะดึงข้อมูล
    this.getAllUsers();
  }

  ngAfterViewInit() {
    this.applySortingAndPagination(); // เรียกใช้งานการตั้งค่า Sort และ Paginator
  }

  applySortingAndPagination() {
    if (this.sort && this.paginator) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator.page.subscribe((event: PageEvent) => {
        this.pageIndex = event.pageIndex; // อัพเดตค่า pageIndex เมื่อเปลี่ยนหน้า
      });
    }
  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<User>(data.data); // กำหนด dataSource เป็น MatTableDataSource<User>
        if (this.sort) {
          this.dataSource.sort = this.sort; // เชื่อมโยง sort อีกครั้ง
          if (this.paginator) {
            this.dataSource.paginator = this.paginator; // เชื่อมโยง paginator อีกครั้ง
          }
        }
        this.changeDetectorRef.detectChanges(); // เรียกใช้ detectChanges() เมื่อจำเป็น
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.paginator!.pageIndex = event.pageIndex;
    this.paginator!.pageSize = event.pageSize;

  }



  goBack() {
    this.location.back();
  }

}
