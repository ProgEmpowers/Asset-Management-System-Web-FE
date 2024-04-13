import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetsComponent } from './assets/assets.component';
import { EmployeesComponent } from './employees/employees.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path:"", redirectTo: "dashboard", pathMatch:'full' },
  { path:"dashboard", component: DashboardComponent },
  { path:"assets/:id", redirectTo:"dashboard", pathMatch:'full'},
  { path:"assets", component: AssetsComponent },
  { path:"employees", component: EmployeesComponent },
  { path:"vendors", component: VendorsComponent },
  { path:"notifications", component:NotificationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
