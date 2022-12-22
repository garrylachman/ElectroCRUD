/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/ban-types */
import type {
  ArrayTail,
  FirstArrayElement,
  UnknownArrayOrTuple,
} from 'type-fest';
import type { ConditionalSimplifyDeep } from './conditional-simplify';
import type { MergeDeep } from './merge-deep';

// Path index type shortcut
type Index = string | number;

// Used by `SplitDottedPath` to infer the type of index based on the format of the path.
type InferIndexType<
  IndexType extends Index,
  ShouldBeNumberIndex extends boolean = false
> = ShouldBeNumberIndex extends true
  ? IndexType extends `${infer NumberKey extends number}`
    ? NumberKey
    : never
  : IndexType;

/**
Split a dotted path into a tuple of indexes.

- Numerical indexes are preserved when specified between `[]`.
- Indexes that contain dots can be escaped with the `\\` sequence.

@exemple
```
type Path2 = SplitDottedPath<'root'>; // ['root']
type Path3 = SplitDottedPath<'root.child'>; // ['root', 'child']
type Path4 = SplitDottedPath<'root.child.0'>; // ['root', 'child', '0']
type Path5 = SplitDottedPath<'root.child[0]'>; // ['root', 'child', 0]
type Path6 = SplitDottedPath<'root.child[0].1'>; // ['root', 'child', 0, '1']
type Path7 = SplitDottedPath<'root.dot\\.dot.child'>; // ['root', 'dot.dot', 'child']
```
*/
type SplitDottedPath<
  Path extends string,
  CurrentIndex extends Index = '',
  IsFirstIndex extends boolean = true,
  IsEscapedDot extends boolean = false,
  IsNumberIndex extends boolean = false
> = Path extends `${infer Char}${infer Tail}`
  ? Char extends ']'
    ? [...SplitDottedPath<Tail, CurrentIndex, false, false, true>]
    : Char extends '\\'
    ? [...SplitDottedPath<Tail, CurrentIndex, false, true>]
    : Char extends '.' | '['
    ? IsEscapedDot extends false
      ? [Char, true] extends ['[', IsFirstIndex]
        ? [...SplitDottedPath<Tail, '', false>]
        : [
            InferIndexType<CurrentIndex, IsNumberIndex>,
            ...SplitDottedPath<Tail, '', false>
          ]
      : [...SplitDottedPath<Tail, `${CurrentIndex}${Char}`, false>]
    : [...SplitDottedPath<Tail, `${CurrentIndex}${Char}`, false>]
  : [InferIndexType<CurrentIndex, IsNumberIndex>];

type NextIndexType<RestIndex extends Index[]> =
  FirstArrayElement<RestIndex> extends number ? never[] : {};

type SetPropertyFromNextIndex<
  PathRest extends Index[],
  Value
> = SetPropertyFromPath<NextIndexType<PathRest>, PathRest, Value>;

type GetTypeAtIndex<
  Destination extends UnknownArrayOrTuple,
  CurrentIndex extends Index,
  RestIndex extends Index[],
  Value
> = [
  | Destination[number]
  | (CurrentIndex extends 0 ? Destination[number] : null)
  | SetPropertyFromPath<NextIndexType<RestIndex>, RestIndex, Value>
][number];

// Returns the fill value for tuples. If the value is out of bounds returns `null` otherwise returns the value.
type FillValue<Value> = [Value] extends [never] ? null : Value;

type SetTupleIndex<
  Destination extends UnknownArrayOrTuple,
  CurrentIndex extends Index,
  RestIndex extends Index[],
  Value,
  Result extends UnknownArrayOrTuple = []
> = Result['length'] extends CurrentIndex
  ? [
      ...Result,
      SetPropertyFromPath<NextIndexType<RestIndex>, RestIndex, Value>,
      ...ArrayTail<Destination>
    ]
  : SetTupleIndex<
      ArrayTail<Destination>,
      CurrentIndex,
      RestIndex,
      Value,
      [...Result, FillValue<FirstArrayElement<Destination>>]
    >;

type SetOrCreateArrayOrTupleAtIndex<
  Destination extends UnknownArrayOrTuple,
  TargetIndex extends Index,
  PathRest extends Index[],
  Value
> = TargetIndex extends number
  ? Destination extends unknown[]
    ? number extends Destination['length']
      ? Array<GetTypeAtIndex<Destination, TargetIndex, PathRest, Value>>
      : SetTupleIndex<Destination, TargetIndex, PathRest, Value>
    : number extends Destination['length']
    ? ReadonlyArray<GetTypeAtIndex<Destination, TargetIndex, PathRest, Value>>
    : readonly [...SetTupleIndex<Destination, TargetIndex, PathRest, Value>]
  : never; // Cannot use string index;

type CreateObjectAtIndex<
  Destination extends object,
  TargetIndex extends Index,
  PathRest extends Index[],
  Value
> = MergeDeep<
  Destination,
  { [Key in TargetIndex]: SetPropertyFromNextIndex<PathRest, Value> }
>;

type SetObjectAtIndex<
  Destination extends object,
  TargetIndex extends Index,
  PathRest extends Index[],
  Value
> = {
  [Key in keyof Destination]: `${Exclude<Key, symbol>}` extends `${TargetIndex}`
    ? PathRest extends []
      ? Value
      : Destination[Key] extends object
      ? SetPropertyFromPath<Destination[Key], PathRest, Value>
      : SetPropertyFromNextIndex<PathRest, Value>
    : Destination[Key];
};

type SetOrCreateObjectAtIndex<
  Destination extends object,
  TargetIndex extends Index,
  PathRest extends Index[],
  Value
> = `${TargetIndex}` extends `${Exclude<keyof Destination, symbol>}`
  ? SetObjectAtIndex<Destination, TargetIndex, PathRest, Value>
  : CreateObjectAtIndex<Destination, TargetIndex, PathRest, Value>;

type SetPropertyFromPath<
  Destination,
  Path extends Index[],
  Value
> = Path extends [
  infer FirstIndex extends Index,
  ...infer PathRest extends Index[]
]
  ? Destination extends UnknownArrayOrTuple
    ? SetOrCreateArrayOrTupleAtIndex<Destination, FirstIndex, PathRest, Value>
    : Destination extends object
    ? SetOrCreateObjectAtIndex<Destination, FirstIndex, PathRest, Value>
    : Value
  : Value;

/**
Set a deeply-nested property to an object using a dotted path string or a tuple of indexes.

@exemple
```
```

@category Object
*/
export type SetProperty<
  Destination extends object,
  Path extends string | Index[],
  Value
> = ConditionalSimplifyDeep<
  SetPropertyFromPath<
    Destination,
    Path extends string ? SplitDottedPath<Path> : Path,
    Value
  >,
  Function
>;

// Replaces a single element of an array literal at the given position with the given value.
type ArrayReplace<
  A extends Array<unknown>,
  Idx extends number,
  Value,
  D extends Array<unknown> = []
> = A extends [infer first, ...infer rest]
  ? Idx extends D['length']
    ? [Value, ...rest]
    : [first, ...ArrayReplace<[...rest], Idx, Value, [Idx, ...D]>]
  : [];

// Replaces a single element of a readonly array literal at the given position with the given value.
type ReadonlyArrayReplace<
  A extends ReadonlyArray<unknown>,
  Idx extends number,
  Value,
  D extends Array<unknown> = []
> = A extends readonly [infer first, ...infer rest]
  ? Idx extends D['length']
    ? readonly [Value, ...rest]
    : readonly [
        first,
        ...ReadonlyArrayReplace<[...rest], Idx, Value, [Idx, ...D]>
      ]
  : readonly [];

// Gets the key part of a path, with support for array index notation.
type PathGetKey<Path extends string> =
  Path extends `${infer keyInd}.${infer rest}`
    ? keyInd extends `${infer key}[${infer index}]`
      ? key
      : keyInd
    : Path extends `${infer key}[${infer index}]`
    ? key
    : Path;

// Gets the rest of the path, with support for array index notation.
type PathGetRest<Path extends string> =
  Path extends `${infer keyInd}.${infer rest}`
    ? keyInd extends `${infer key}[${infer index}]`
      ? `${index}.${rest}` // Return dot notation to simplify PathGetKey.
      : rest
    : Path extends `${infer key}[${infer index}]`
    ? index
    : '';

// TypeScript 4.5 - 4.7.
type Mapped<
  N extends number,
  Result extends Array<unknown> = []
> = Result['length'] extends N
  ? Result
  : Mapped<N, [...Result, Result['length']]>;
type NumberRange = Mapped<999>[number];
type ConvertToNumber<
  T extends string,
  Range extends number = NumberRange
> = Range extends unknown ? (`${Range}` extends T ? Range : never) : never;

// TypeScript 4.8+.
/*
type ConvertToNumber<T extends string> =
  T extends `${infer R extends number}` ? R : never;
*/

// Replaces the value at the given index in the array with an updated type.
type SetPropertyArray<
  A extends Array<unknown>,
  Value,
  KeyName extends string,
  RestPath extends string,
  Idx extends number = ConvertToNumber<KeyName>
> = RestPath extends ''
  ? Idx extends A['length']
    ? [...A, Value] // Allow appending elements to the array.
    : ArrayReplace<A, Idx, Value>
  : A[Idx] extends object
  ? ArrayReplace<A, Idx, SetProp<A[Idx], RestPath, Value>>
  : never; // Require passing the parent type with a shorter path.

// Replaces the Value at the given Idx in the readonly array with an updated type.
type SetPropertyReadonlyArray<
  A extends ReadonlyArray<unknown>,
  Value,
  KeyName extends string,
  RestPath extends string,
  Idx extends number = ConvertToNumber<KeyName>
> = RestPath extends ''
  ? Idx extends A['length']
    ? readonly [...A, Value] // Allow appending elements to the array.
    : ReadonlyArrayReplace<A, Idx, Value>
  : A[Idx] extends object
  ? ReadonlyArrayReplace<A, Idx, SetProp<A[Idx], RestPath, Value>>
  : never; // Require passing the parent type with a shorter path.

// Replaces the value with the given key in the object with an updated type.
type SetPropertyObject<
  O extends object,
  Value,
  KeyName extends string,
  RestPath extends string
> = {
  [key in KeyName extends keyof O
    ? keyof O
    : keyof O | KeyName]: key extends keyof O
    ? KeyName extends key
      ? RestPath extends ''
        ? Value // Place the Value.
        : O[key] extends object
        ? SetProp<O[key], RestPath, Value>
        : never // Require passing the parent type with a shorter path.
      : O[key] // Return the original Value.
    : RestPath extends ''
    ? Value // Place the Value.
    : never; // Require passing the parent type with a shorter path.
} extends infer R
  ? R
  : never; // Improve on hover type information.

export type SetProp<
  Input extends object,
  Path extends string,
  Value,
  KeyName extends string = PathGetKey<Path>,
  RestPath extends string = PathGetRest<Path>
> = Input extends Array<unknown>
  ? SetPropArray<Input, Value, KeyName, RestPath>
  : Input extends ReadonlyArray<unknown>
  ? SetPropertyReadonlyArray<Input, Value, KeyName, RestPath>
  : SetPropertyObject<Input, Value, KeyName, RestPath>;
