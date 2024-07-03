import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../../Models/asset';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-my-asses-widget',
  templateUrl: './my-asses-widget.component.html',
  styleUrl: './my-asses-widget.component.scss',
})
export class MyAssesWidgetComponent implements OnInit {
  myAssetList: Asset[] = [];
  assetTypeCountsArray: { type: string, count: number }[] = [];


  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: true,
    pagination: { clickable: false },
    scrollbar: { draggable: true },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }

  };

  constructor(
    private userService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService
      .getEmployeeAssets(this.authService.getUser()!.email)
      .subscribe((res) => {
        this.myAssetList = res;
        this.countAssetsByType(res);
      });
  }

  countAssetsByType(assets: Asset[]): void {
    const assetTypeCounts = assets.reduce((counts, asset) => {
      counts[asset.assetType!] = (counts[asset.assetType!] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });

    this.assetTypeCountsArray = Object.entries(assetTypeCounts).map(([type, count]) => ({ type, count }));
  }
}
