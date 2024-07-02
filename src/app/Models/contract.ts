import { Time } from "@angular/common";
import { orderedAssetTypes } from "./orderedAssetTypes";

export interface Contract {
    id?: number;
    assignedDate?: string;
    time?: string;
    optionals?: string;
    orderedAssetTypes: orderedAssetTypes[];
    idOfVendors: number[];
    nameOfVendors?: string[];
}