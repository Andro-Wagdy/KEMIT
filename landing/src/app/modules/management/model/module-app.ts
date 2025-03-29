import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";
export interface ModuleApp extends BaseEntityTrace {
  nameEn: string;
  nameAr: string;
  key: string;
  isMain:boolean;
}
