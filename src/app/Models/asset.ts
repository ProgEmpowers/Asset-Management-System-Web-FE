export interface Asset {
  id?:number;
  imageUrl?: string;
  name?: string | undefined;
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
