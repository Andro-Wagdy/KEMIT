import { BaseEntityTrace } from 'src/app/_metronic/models/base-entity-trace';
export interface Project extends BaseEntityTrace {
  name: string;
  nameFolder: string;
  date: string;
  serialNumber: string;
  isAllow: string;
  isFinished: string;
  numberPermission: string;
  numberDocument: string;
  recipientName: string;
  senderName: string;
  deptName: string;
  managerName: string;
  noteReport: string;
  note: string;
  documentTypeId: string;
  recipientDegreeId: string;
  senderDegreeId: string;
  deptDegreeId: string;
  managerDegreeId: string;
  destinationId: string;
  processTypeId: string;
}
