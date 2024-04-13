export interface Asset {
  id?:number;
  imageUrl?: string;
  assetName?: string | undefined;
  assetType?:string;
  description?:string;
  qrCode?:string;
  isActive?:boolean;
  status?:string;
  createdOn?:string;
  year?:string;
  buyingPrice?:string;
  assetValue?:number;
}
