import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";


export interface ClaimApp extends BaseEntityTrace {
  claimType: string;
  claimValue: string;
  key: string;
  screenAppId: number;
  screenAppNameAr: string;
  screenAppNameEn: string;
}
