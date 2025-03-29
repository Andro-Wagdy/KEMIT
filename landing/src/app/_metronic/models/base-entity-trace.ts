import { BaseId } from "./baseId";

 export interface BaseEntityTrace extends BaseId {
    createdDate?:any;
    lastEditDate?:any;
    createdUserName?:string;
    lastEditUserName?:string;
    index?:number;
    selected?:boolean;
    iPDeviceCreaded?:string;
    iPDeviceLastEdit?:string;
    clientId?:string;
    action?:any;
    id:any

}
