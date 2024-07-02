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
import { authGuard } from './auth/guards/auth.guard';
import { DisposalsComponent } from './disposals/disposals.component';
import { MyAssetsComponent } from './my-assets/my-assets.component';
import { ViewAssetComponent } from './forms/view-asset/view-asset.component';
import { ViewEmployeeComponent } from './forms/view-employee/view-employee.component';

const routes: Routes = [
  { path:"", redirectTo: "dashboard", pathMatch:'full' },
  { path:"dashboard", component: DashboardComponent , canActivate: [authGuard]},
  { path:"assets/new", component: NewAssetComponent, canActivate: [authGuard] },
  { path:"assets/:id", component: ViewAssetComponent , canActivate: [authGuard] },
  { path:"assets", component: AssetsComponent , canActivate: [authGuard] },
  { path:"my-assets/:id", component:ViewAssetComponent },
  { path:"my-assets", component:MyAssetsComponent },
  { path:"disposals/:id", component: ViewAssetComponent },
  { path:"disposals", component: DisposalsComponent },
  { path:"employees", component: EmployeesComponent, canActivate: [authGuard] },
  { path:"contracts", component: ContractsComponent , canActivate: [authGuard] },
  { path:"vendors", component: VendorsComponent , canActivate: [authGuard] },
  { path:"notifications", component:NotificationsComponent, canActivate: [authGuard] },
  { path:"assets/:id", component: ViewAssetComponent, canActivate: [authGuard] },
  {path:"employees/:id", component: ViewEmployeeComponent, canActivate: [authGuard]},

  { path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
