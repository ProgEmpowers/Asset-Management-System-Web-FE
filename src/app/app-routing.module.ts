import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetsComponent } from './assets/assets.component';
import { EmployeesComponent } from './employees/employees.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NewAssetComponent } from './forms/new-asset/new-asset.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path:"", redirectTo: "dashboard", pathMatch:'full' },
  { path:"dashboard", component: DashboardComponent },
  { path:"assets/new", component: NewAssetComponent},
  { path:"assets", component: AssetsComponent },
  {path:"disposals",component: DisposalsComponent},
  { path:"employees", component: EmployeesComponent },
  { path:"vendors", component: VendorsComponent },
  { path:"notifications", component:NotificationsComponent },
  { path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
