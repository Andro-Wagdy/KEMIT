import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";
export interface Language extends BaseEntityTrace {
  name: string;
  displayName: string;
  icon: string;
  isActive: boolean;
  isDefault: boolean;
  direction: string;

}
