import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LineComponent } from './pages/line/line.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { MytimereportComponent } from './pages/mytimereport/mytimereport.component';
import { UserslistComponent } from './pages/userslist/userslist.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent},
  {path:'line',component:LineComponent },
  {path:'scanner',component:ScannerComponent },
  {path:'mytimereport',component:MytimereportComponent },
  {path:'userslist',component:UserslistComponent },
  {path:'edit',component:EdituserComponent},
  {path:'profile',component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
