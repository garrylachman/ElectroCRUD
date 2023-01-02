export type ConfigControl = {
  section: string;
  field: string;
  value?: any;
  options?: string[];
  onUpdate: (value: string) => void;
};
