import { AssetStatusEnum } from "./AssetStatusEnum";

export interface DisposalAsset {
  id?:string;
  imageUrl?: string;
  name?: string | undefined;
  assetType?:string;
  description?:string;
  qrCode?:string;
  isActive?:boolean;
  assetValue?:number;
  assetStatus ?:AssetStatusEnum;
  createdOn?:string;
  userId?:string;
  price?:string;

}
