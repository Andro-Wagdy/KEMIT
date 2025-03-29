import { BaseEntityTrace } from "src/app/_metronic/models/base-entity-trace";
export interface LanguageText extends BaseEntityTrace {
  targetValue: string;
  languageId: number;
  languageDisplayName: string;
  languageKeyId: number;
  languageKey: string;
}
