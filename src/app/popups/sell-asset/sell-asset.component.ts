import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AssetStockService } from '../../services/asset-stock.service';
import { Asset } from '../../Models/asset';
import { DisposalAsset } from '../../Models/disposalAsset';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DisposalService } from '../../services/disposal.service';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sell-asset',
  templateUrl: './sell-asset.component.html',
  styleUrl: './sell-asset.component.scss',
})
export class SellAssetComponent implements AfterViewInit {
  selectedAsset_ID!: string;
  selectedAsset!: Asset;
  disposalAsset: DisposalAsset = {};
  updateForm: FormGroup;
  receivedData = false;
  isDisposed = false;

  constructor(
    private assetService: AssetStockService,
    private fb: FormBuilder,
    private disposalService: DisposalService,
    private toast: NgToastService,
    private router: Router
  ) {
    this.assetService.data$.subscribe((data) => {
      this.selectedAsset_ID = data;
      this.getAsset();
    });

    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.receivedData = true;
    console.log(this.disposalAsset);
  }

  async getAsset() {
    this.selectedAsset = await this.assetService.GetAssetById(
      this.selectedAsset_ID
    );
    this.disposalAsset = this.selectedAsset;
  }

  onClick() {
    if (this.updateForm.valid) {
      this.disposalAsset.name = this.updateForm.controls['name'].value;
      this.disposalAsset.description =
        this.updateForm.controls['description'].value;
      this.disposalAsset.price = this.updateForm.controls['price'].value;
      this.disposalService.addDisposalAssetAsync(this.disposalAsset).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Asset sent to disposal successfully',
            summary: 'Asset sent to disposal!',
          });
          this.isDisposed = true;
          this.deleteAsset();
          this.updateForm.reset();
          this.router.navigate(['/disposals']);
        },
        error: (error) => {
          this.toast.error({
            detail: 'Sending asset to disposal failed',
            summary: 'Something went wrong!',
          });
          console.log(error);
        },
      });

      this.updateForm.reset();
    } else {
      this.markAsDrity();
    }
  }

  async deleteAsset() {
    await this.assetService.deleteAssetAsync(this.selectedAsset_ID);
  }

  markAsDrity() {
    const controls = Object.keys(this.updateForm.controls);
    controls.forEach((key) => {
      this.updateForm.controls[key].markAsDirty();
    });
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log('Current route I am on:', this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }
}
