import { Component, OnInit } from '@angular/core';
import { Asset } from '../Models/asset';
import { AuthService } from '../auth/services/auth.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrl: './my-assets.component.scss'
})
export class MyAssetsComponent implements OnInit {

  myAssetList:Asset[] = [];

  constructor(private authService: AuthService, private userService: EmployeeService) {}

  ngOnInit(): void {
    this.userService.getEmployeeAssets(this.authService.getUser()!.email)
    .subscribe((res) => {
      this.myAssetList = res;
    })
  }

}
