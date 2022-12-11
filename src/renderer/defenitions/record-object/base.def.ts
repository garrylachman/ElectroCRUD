export type RemoveField<Type, Field> = {
  [Property in keyof Type as Exclude<Property, Field>]: Type[Property];
};
export type BaseRO = {
  id?: string;
  creationDate?: number;
  modificationDate?: number;
};
