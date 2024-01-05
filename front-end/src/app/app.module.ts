import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './componenst/footer/footer.component';
import { HeaderComponent } from './componenst/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LineComponent } from './pages/line/line.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MytimereportComponent } from './pages/mytimereport/mytimereport.component';
import { UserslistComponent } from './pages/userslist/userslist.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';


LOAD_WASM().subscribe()

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LineComponent,
    LoginComponent,
    ScannerComponent,
    MytimereportComponent,
    UserslistComponent,
    EdituserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxScannerQrcodeModule,
    ZXingScannerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
