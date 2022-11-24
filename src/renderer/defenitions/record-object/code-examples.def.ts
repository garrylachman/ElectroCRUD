import { BaseRO } from "./base.def";

export type CodeExampleRO = BaseRO & {
  viewId: string;
  title: string;
  description?: string;
  language: string;
  code: string;
};
