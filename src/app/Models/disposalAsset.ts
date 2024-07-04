import { AssetStatusEnum } from "./AssetStatusEnum";
import { Asset } from "./asset";

export interface DisposalAsset extends Asset {
  price?:string;
}
