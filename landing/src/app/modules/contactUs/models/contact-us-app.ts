import { BaseEntityTrace } from 'src/app/_metronic/models/base-entity-trace';
export interface ContactUsApp extends BaseEntityTrace {
  name: string;
  email: string;
  phone: string;
  message: string;
  isView: string;
  note: string;
}
