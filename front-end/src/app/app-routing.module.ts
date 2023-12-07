import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LineComponent } from './pages/line/line.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { MytimereportComponent } from './pages/mytimereport/mytimereport.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent},
  {path:'line',component:LineComponent },
  {path:'scanner',component:ScannerComponent },
  {path:'mytimereport',component:MytimereportComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
