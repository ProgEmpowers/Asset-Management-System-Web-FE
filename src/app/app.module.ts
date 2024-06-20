import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetsComponent } from './assets/assets.component';
import { EmployeesComponent } from './employees/employees.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReportsComponent } from './reports/reports.component';
import { HeaderComponent } from './header/header.component';
import { MenuModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { AssetCardComponent } from './components/asset-card/asset-card.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AssetsWidgetComponent } from './components/widgets/assets-widget/assets-widget.component';
import { EmployeeWidgetComponent } from './components/widgets/employee-widget/employee-widget.component';
import { VendorsWidgetComponent } from './components/widgets/vendors-widget/vendors-widget.component';
import { GridModule, PageService, PagerModule, PdfExportService, SortService } from '@syncfusion/ej2-angular-grids';
import { AssetTableComponent } from './components/tables/asset-table/asset-table.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { EmployeeTableComponent } from './components/tables/employee-table/employee-table.component';
import { VendorsTableComponent } from './components/tables/vendors-table/vendors-table.component';
import { NotificationsTableComponent } from './components/tables/notifications-table/notifications-table.component';
import { NewAssetComponent } from './forms/new-asset/new-asset.component';
import { NewEmployeeComponent } from './forms/new-employee/new-employee.component';
import { NewVendorComponent } from './forms/new-vendor/new-vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrModule } from 'ngx-toastr';
import { UploadComponent } from './components/upload/upload.component';
import { DeleteRecordComponent } from './forms/delete-record/delete-record.component';
import { LoginComponent } from './auth/login/login.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { SentReportsComponent } from './sent-reports/sent-reports.component';
import { SentRequestsComponent } from './sent-requests/sent-requests.component';
import { EditVendorComponent } from './forms/edit-vendor/edit-vendor.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractTableComponent } from './components/tables/contract-table/contract-table.component';
import { SendContractComponent } from './forms/send-contract/send-contract.component';
import { ViewAssetComponent } from './forms/view-asset/view-asset.component';
import { AssignAssetsComponent } from './forms/assign-assets/assign-assets.component';
import { ViewEmployeeComponent } from './forms/view-employee/view-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    DashboardComponent,
    AssetsComponent,
    EmployeesComponent,
    VendorsComponent,
    NotificationsComponent,
    ReportsComponent,
    HeaderComponent,
    AssetCardComponent,
    AssetListComponent,
    AssetsWidgetComponent,
    EmployeeWidgetComponent,
    VendorsWidgetComponent,
    AssetTableComponent,
    EmployeeTableComponent,
    VendorsTableComponent,
    NotificationsTableComponent,
    NewAssetComponent,
    NewEmployeeComponent,
    NewVendorComponent,
    UploadComponent,
    DeleteRecordComponent,
    LoginComponent,
    Sidebar2Component,
    SentReportsComponent,
    SentRequestsComponent,
    UploadComponent,
    EditVendorComponent,
    DeleteRecordComponent,
    ContractsComponent,
    ContractTableComponent,
    SendContractComponent,
    ViewAssetComponent,
    AssignAssetsComponent,
    ViewAssetComponent,
    ViewEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    NgbPaginationModule,
    SidebarModule,
    GridModule,
    PagerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    ToastrModule.forRoot()
  ],
  providers: [PageService, SortService, PdfExportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
