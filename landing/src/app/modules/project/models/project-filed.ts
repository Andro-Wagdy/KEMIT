import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";
export interface ProjectFiled extends BaseEntityTrace {
  filedName: string;
  filedLabel: string;
  filedType: string;
  listItem: string;
  isRequired: boolean;
  projectId: number;
}
