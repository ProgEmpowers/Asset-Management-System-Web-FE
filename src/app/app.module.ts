import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import {
  GridModule,
  PageService,
  PagerModule,
  PdfExportService,
  SortService,
} from '@syncfusion/ej2-angular-grids';
import { AssetTableComponent } from './components/tables/asset-table/asset-table.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
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
import { DeleteRecordComponent } from './popups/delete-record/delete-record.component';
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
import { authInterceptor } from './interceptors/auth.interceptor';
import { ReleaseAssetComponent } from './popups/release-asset/release-asset.component';
import { DisposeAssetComponent } from './popups/dispose-asset/dispose-asset.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DisposalsComponent } from './disposals/disposals.component';
import { DisposalAssetTableComponent } from './components/tables/disposal-asset-table/disposal-asset-table.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterAssetByStatusPipe } from './pipes/filter-asset-by-status.pipe';
import { FilterAssetByCategoryPipe } from './pipes/filter-asset-by-category.pipe';
import { MyAssetsComponent } from './my-assets/my-assets.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ViewEmployeeComponent } from './forms/view-employee/view-employee.component';
import { AssignAssetEmployeeSideComponent } from './forms/assign-asset-employee-side/assign-asset-employee-side.component';

import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MyAssesWidgetComponent } from './components/widgets/my-asses-widget/my-asses-widget.component';
import { SellAssetComponent } from './popups/sell-asset/sell-asset.component';
import { IntlTelInputModuleComponent } from './components/intl-tel-input-module/intl-tel-input-module.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { QRCodeModule } from 'angularx-qrcode';
import { ViewVendorComponent } from './forms/view-vendor/view-vendor.component';
import { SearchPipe } from './pipes/search/search.pipe';
import { UserProfileComponent } from './forms/user-profile/user-profile.component';
import { DeletedEmployeeTableComponent } from './components/tables/deleted-employee-table/deleted-employee-table.component';
import { UserProfileWidgetComponent } from './components/widgets/user-profile-widget/user-profile-widget.component';
import { EmployeeAssetTableComponent } from './components/tables/employee-asset-table/employee-asset-table.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { AssetTypesModalComponent } from './forms/asset-types-modal/asset-types-modal.component';



@NgModule({
  declarations: [
    AppComponent,
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
    ReleaseAssetComponent,
    DisposeAssetComponent,
    TruncatePipe,
    DisposalsComponent,
    DisposalAssetTableComponent,
    FilterPipe,
    FilterAssetByStatusPipe,
    FilterAssetByCategoryPipe,
    MyAssetsComponent,
    SidemenuComponent,
    AssignAssetsComponent,
    ViewEmployeeComponent,
    AssignAssetEmployeeSideComponent,
    AssignAssetsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    MyAssesWidgetComponent,
    SellAssetComponent,
    ChangePasswordComponent,
    AssignAssetsComponent,
    IntlTelInputModuleComponent,
    OnlyNumbersDirective,
    ViewVendorComponent,
    SearchPipe,
    OnlyNumbersDirective,
    ChangePasswordComponent,
    UserProfileComponent,
    DeletedEmployeeTableComponent,
    UserProfileWidgetComponent,
    EmployeeAssetTableComponent,
    UploadImageComponent,
    AssetTypesModalComponent,

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
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    QRCodeModule
  ],
  providers: [
    PageService,
    SortService,
    PdfExportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}
