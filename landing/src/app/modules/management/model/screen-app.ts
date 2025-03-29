import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";
export interface ScreenApp extends BaseEntityTrace {
  nameEn: string;
  nameAr: string;
  key: string;
  urlPage: string;
  urlDoc: string;
  description: string;
  moduleAppId: number;
  moduleAppNameEn: string;
  moduleAppNameAr: string;
  isMain:boolean;
  isShowPermission:boolean;
}
