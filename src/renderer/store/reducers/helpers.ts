import {
  ActionReducerMapBuilder,
  AnyAction,
  EntityState,
} from '@reduxjs/toolkit';
import { BaseRO } from 'renderer/defenitions/record-object/base.define';
import { Merge } from 'type-fest';
import { v4 } from 'uuid';

export type AnyActionWithPayload = Merge<
  AnyAction,
  { payload: Record<string, any>; type: string }
>;

export const prepareStateUpdate = <T extends BaseRO>(
  payload: Partial<T>
): T => {
  const isNew = !payload.id;
  if (isNew) {
    return {
      id: v4(),
      creationDate: Date.now(),
      modificationDate: Date.now(),
      ...payload,
    } as T;
  }
  return {
    ...payload,
  } as T;
};

export const createLastModificationMatcher = <T extends BaseRO>(
  builder: ActionReducerMapBuilder<EntityState<T>>,
  matchers: any,
  getId: (action: AnyActionWithPayload) => string
) =>
  builder.addMatcher(matchers, (state, action) => {
    const entityId: string = getId(action as AnyActionWithPayload);
    if (entityId) {
      const updatedColumn = state.entities[entityId];
      if (updatedColumn) {
        updatedColumn.modificationDate = Date.now();
      }
    }
  });
