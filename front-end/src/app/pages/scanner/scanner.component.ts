import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner/public_api';
import { BarcodeFormat, Result } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { TimeRecordService } from 'src/app/services/time/time.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {

  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;

  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo ;

  hasDevices!: boolean;
  qrResultString!: string;
  qrResult!:Result;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  checkType: string = '';

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  hasPermission!: boolean;

  constructor(
    private router: Router,
    private timeService:TimeRecordService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location

  ) {}




  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/line']);
      return;
    }
    this.route.queryParams.subscribe(params => {
      this.checkType = params['type'];
      // ทำอะไรกับค่า checkType ที่ได้รับมา ในที่นี้คือการส่งไปยังหน้า scanner

    });
  }

  sendToScanner(type: string) {
    // ทำตามที่ต้องการกับค่า type ที่ได้รับมา


    if (type === 'checkin') {
      this.checkin(); // เรียกใช้ฟังก์ชัน checkin() หาก type เท่ากับ 'checkin'
    } else if (type === 'checkout') {
      this.checkout(); // เรียกใช้ฟังก์ชัน checkout() หาก type เท่ากับ 'checkout'
    } else {
      // กรณีอื่นๆ ที่ไม่ตรงเงื่อนไข
      console.error('Unknown type:', type);
    }
  }

  clearResult(): void {
    this.qrResultString = "";
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    if (this.qrResultString === 'Therabbittech') {
      this.sendToScanner(this.checkType);
    }
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  checkin() {
    const data = {
      userId: localStorage.getItem('user_id')
    };

    this.timeService.checkIn(data).subscribe(
      (response) => {
        // Handle successful check-in response here
        alert('Checked in successfully!');
        this.router.navigate([''])
        // You can perform any necessary actions upon successful check-in
      },
      (error) => {
        // Handle errors here
        console.error('Error during check-in:', error);
        alert('Check-in failed: ' + error.message);
        this.router.navigate([''])
        // Perform error handling or show error messages to the user
      }
    );
  }


  checkout() {
    const data = {
      userId: localStorage.getItem('user_id')
    };

    this.timeService.checkOut(data).subscribe(
      (response) => {
        // Handle successful checkout response here
        alert('Checked out successfully!');
        this.router.navigate([''])
        // You can perform any necessary actions upon successful checkout

      },
      (error) => {
        // Handle errors here
        console.error('Error during checkout:', error);
        alert('Check-out failed: ' + error.message);
        this.router.navigate([''])

        // Perform error handling or show error messages to the user
      }
    );
  }

  goBack() {

    this.router.navigate([''])
  }






}
