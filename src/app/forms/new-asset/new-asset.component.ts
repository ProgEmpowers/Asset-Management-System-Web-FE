import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetStockService } from '../../services/asset-stock.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Asset } from '../../Models/asset';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrl: './new-asset.component.scss'
})
export class NewAssetComponent implements OnInit {

  defaultUrl = "https://localhost:7095/Uploads/Images/Assets/upload.png";
  imgPath = this.defaultUrl;

  // Asset types
  assetTypes:string[] = [];

  // Create FormGroup for new asset form
  assetForm:FormGroup = new FormGroup({
    name: new FormControl(""),
    assetType: new FormControl("default"),
    imageUrl: new FormControl(this.imgPath),
    description: new FormControl(""),
    assetValue: new FormControl(""),
  })

  constructor(
    private assetService: AssetStockService,
    private router: Router,
    private toastr: NgToastService
  ){}


  ngOnInit(): void {
    this.assetTypes = [
      'PC',
      'Monitor',
      'Keyboard',
      'Mouse',
      'Scanner'
    ];
  }

  onUploadFinished(event: any) {
    this.imgPath = event;
    console.log(this.imgPath);
    this.assetForm.get("imageUrl")?.setValue(this.imgPath);
  }

  submit() : void {
    this.assetService.createAsset(
      this.assetForm.value
    ).subscribe(
      (res) => {
        if (res) {
          this.toastr.success({detail:"New asset created", summary:"New asset is created successfully.", duration:5000});
          this.assetForm.reset();
          this.imgPath = this.defaultUrl;
          this.reloadComponent(true);
        }
      }, err => {
        this.toastr.error({detail:"Asset creation failed", summary:"New asset is not created.", duration:5000});
      }
    )
  }

  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

}
