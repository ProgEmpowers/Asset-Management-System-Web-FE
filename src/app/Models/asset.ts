import { AssetStatusEnum } from "./AssetStatusEnum";

export interface Asset {
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
}

// public int Id { get; set; }
// public string Name { get; set; }
// public string AssetType { get; set; }
// public string Description { get; set; }
// public string? ImageUrl { get; set; }
// public string? QRcode { get; set; }
// public bool IsActive { get; set; }
// public float? AssetValue { get; set; }
// public AssetStatusEnum AssetStatus { get; set; }
// public int? UserId { get; set; }
