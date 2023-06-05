// @ts-nocheck
import { faker } from '@faker-js/faker';
import { compact } from 'underscore';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import { useMemo } from 'react';
import {
  ColumnRO,
  PolicyRulePayload,
  PolicyType,
} from 'renderer/defenitions/record-object';
import { useAppSelector } from 'renderer/store/hooks';
import { PoliciesReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';
import { O } from 'ts-toolbelt';

const mask = (
  value: string,
  maskChar: string,
  unmaskedLength: number,
  maskFromStart = true
) => {
  const maskStart = maskFromStart ? 0 : Math.max(0, unmaskedLength);
  const maskEnd = maskFromStart
    ? Math.max(0, value.length - unmaskedLength)
    : value.length;
  return value
    .split('')
    .map((char, index) => {
      return index >= maskStart && index < maskEnd ? maskChar : char;
    })
    .join('');
};

const doMask = (
  value = '',
  count: number,
  maskWith = '#',
  direction: 'left' | 'right' = 'right'
) => {
  return mask(value, maskWith, count, direction === 'left');
};

const doFullMask = (value = '', maskWith = '#') => {
  return mask(value, maskWith, 0, true);
};

const doFake = (fake: string) => {
  return faker.helpers.fake(`{{${fake}}}`);
};

type PolicyByTagType = {
  name: string;
  type: PolicyType;
  payload?: PolicyRulePayload[];
};

type ColumnWithPoliciesType = O.Merge<ColumnRO, { policy?: PolicyByTagType }>;

export const usePolicy = (columns: Partial<ColumnRO>[], data: any[]) => {
  const policyState = useAppSelector((root: RootState) =>
    memoize((state: RootState) => state.policies)(root)
  );

  const policiesByTags = useMemo<Record<string, PolicyByTagType>>(
    () =>
      PoliciesReducer.getSelectors()
        .selectAll(policyState)
        .map((item) => {
          return (
            item.tags
              .map((tag) => ({
                [tag]: {
                  type: item.type,
                  name: item.name,
                  payload: item.payload,
                },
              }))
              // eslint-disable-next-line unicorn/no-array-reduce
              .reduce(
                (accumulator, current) => ({ ...accumulator, ...current }),
                {}
              )
          );
        })
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduce((accumulator, current) => ({ ...accumulator, ...current }), {}),
    [policyState]
  );

  const columnsWithPolicies = useMemo<ColumnWithPoliciesType[]>(
    () =>
      columns
        .map((col) => ({
          ...col,
          metadata: {
            tags: col?.metadata?.tags?.map((tag) => (tag?.id as string) || tag),
          },
        }))
        .map((col) => ({
          ...col,
          policy: compact(
            col?.metadata?.tags?.map((tag) => R.prop(tag, policiesByTags))
          ).pop(),
        })),
    [policiesByTags, columns]
  );

  const maskedData = useMemo(
    () =>
      data.map((row: Record<string, string | number>) => {
        const keys = R.keys(row);
        const maskedRow: Record<string, string | number> = { ...row };

        // eslint-disable-next-line unicorn/no-array-for-each
        keys.forEach((key) => {
          const column = columnsWithPolicies.find((col) => col.name === key);
          const policy = R.prop<PolicyByTagType>('policy', column);
          if (policy && !column?.is_primary_key) {
            const value = String(R.prop<string>(key, row));
            if (value && policy.type === PolicyType.PARTIAL_MASKING) {
              maskedRow[key] = doMask(
                value,
                (policy.payload as any).numToMask,
                (policy.payload as any).char,
                (policy.payload as any).dir
              );
            }
            if (value && policy.type === PolicyType.FULL_MASKING) {
              maskedRow[key] = doFullMask(value, (policy.payload as any).char);
            }
            if (value && policy.type === PolicyType.FAKE_DATA) {
              maskedRow[key] = doFake((policy.payload as any).faker);
            }
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        });
        return maskedRow;
      }),
    [columnsWithPolicies, data]
  );

  return maskedData;
};
