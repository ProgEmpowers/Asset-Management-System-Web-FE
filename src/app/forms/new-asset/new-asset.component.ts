import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetStockService } from '../../services/asset-stock.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Asset } from '../../Models/asset';
import { UploadComponent } from '../../components/upload/upload.component';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrl: './new-asset.component.scss'
})
export class NewAssetComponent implements OnInit {

  @ViewChild('uploadComponent') uploadComponent!: UploadComponent;

  defaultUrl = "https://localhost:7095/Uploads/Images/Assets/upload.png";
  imgPath: string = "";
  isChanged = false;

  // Asset types
  assetTypes:string[] = [];

  // Create FormGroup for new asset form
  assetForm:FormGroup;

  constructor(
    private assetService: AssetStockService,
    private router: Router,
    private toastr: NgToastService
  ){
    this.imgPath = this.defaultUrl;
    this.assetForm = new FormGroup({
      name: new FormControl("", Validators.required),
      assetType: new FormControl("", Validators.required),
      imageUrl: new FormControl(this.imgPath, Validators.required),
      description: new FormControl("", Validators.required),
      assetValue: new FormControl("", Validators.required),
    })
  }


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
    this.isChanged = true;
    this.assetForm.get("imageUrl")?.setValue(this.imgPath);
  }

  submit() : void {
    if (this.assetForm.valid == false) {
      return;
    }
    this.assetService.createAsset(
      this.assetForm.value
    ).subscribe(
      (res) => {
        if (res) {
          this.toastr.success({detail:"New asset created", summary:"New asset is created successfully.", duration:5000});
          this.assetForm.reset();
          this.imgPath = this.defaultUrl;
          this.uploadComponent.fileName = "an image to upload";
          this.reloadComponent(true);
          this.isChanged=false;
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

  triggerButtonClick() {
    // Programmatically trigger click on the button in ChildComponent
    this.uploadComponent.file.nativeElement.click();
  }

}
