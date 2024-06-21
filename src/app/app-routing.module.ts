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

const routes: Routes = [
  { path:"", redirectTo: "dashboard", pathMatch:'full' },
  { path:"dashboard", component: DashboardComponent , canActivate: [authGuard]},
  { path:"assets/new", component: NewAssetComponent, canActivate: [authGuard] },
  { path:"assets", component: AssetsComponent , canActivate: [authGuard] },
  { path:"employees", component: EmployeesComponent, canActivate: [authGuard] },
  { path:"contracts", component: ContractsComponent , canActivate: [authGuard] },
  { path:"vendors", component: VendorsComponent , canActivate: [authGuard] },
  { path:"notifications", component:NotificationsComponent, canActivate: [authGuard] },
  { path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
