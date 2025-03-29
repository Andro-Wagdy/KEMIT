import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";

export interface AuditApp  extends BaseEntityTrace {
  id: number;
  rowClientId: string;
  tableName: string;
  state: string;
  oldValues: string;
  newValues: string;
  primaryKey: number | null;
  message: string;
  level: string;
  timeStamp: string;
  exceptionMessage: string;
  userName: string;
  userFullName: string;
  statusCode: number | null;
  serverIP: string;
  clientIP: string;

  applicationName: string;
  queryString: string;
  isShowUser: boolean;
  isLogin: boolean;
  isLogout: boolean;
  primaryKeyObj: any;
}
