import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";
export interface User extends BaseEntityTrace {
   userName: string;
   email: string;
   firstName: string;
   middelName: string;
   lastName: string;
   fullName: string
   jobTitle: string;
   degree: string;
   departmentId?: string;
   userId: string;
   isSupport: boolean;
   isHead: boolean;
   roles: string;
   lastLogin:Date;

}
