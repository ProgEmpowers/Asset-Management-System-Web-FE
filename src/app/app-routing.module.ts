import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetsComponent } from './assets/assets.component';
import { EmployeesComponent } from './employees/employees.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NewAssetComponent } from './forms/new-asset/new-asset.component';
import { LoginComponent } from './auth/login/login.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ViewAssetComponent } from './forms/view-asset/view-asset.component';
import { ViewEmployeeComponent } from './forms/view-employee/view-employee.component';

const routes: Routes = [
  { path:"", redirectTo: "dashboard", pathMatch:'full' },
  { path:"dashboard", component: DashboardComponent },
  { path:"assets/new", component: NewAssetComponent},
  { path:"assets/:id", component: ViewAssetComponent },
  {path:"employees/:id", component: ViewEmployeeComponent},
  { path:"assets", component: AssetsComponent },
  { path:"employees", component: EmployeesComponent },
  { path:"contracts", component: ContractsComponent },
  { path:"vendors", component: VendorsComponent },
  { path:"notifications", component:NotificationsComponent },
  { path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
