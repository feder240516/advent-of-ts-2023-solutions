type AddOneToArray<TArray extends unknown[], TAdded extends unknown = 0> = [...TArray, TAdded];

type GetArrayLength<TArray extends unknown[]> = TArray['length'];

type ArrayOfSize<
  TSize extends number,
  TElement extends unknown,
  TArray extends TElement[] = []
> = GetArrayLength<TArray> extends TSize ? TArray : ArrayOfSize<TSize, TElement, AddOneToArray<TArray, TElement>>;

type TNextElement = {
  '🛹': '🚲';
  '🚲': '🛴';
  '🛴': '🏄';
  '🏄': '🛹';
};

type TGifts = keyof TNextElement;

type Rebuild<
  TList extends number[],
  TCurrentArray extends string[] = [],
  TCurrentElement extends TGifts = '🛹'
> = TList extends [infer TCurrentSize extends number, ...infer TRemaining extends number[]]
  ? // hack to avoid infinite recursion
    [...TCurrentArray, ...ArrayOfSize<TCurrentSize, TCurrentElement>] extends string[]
    ? Rebuild<
        TRemaining,
        [...TCurrentArray, ...ArrayOfSize<TCurrentSize, TCurrentElement>],
        TNextElement[TCurrentElement]
      >
    : never
  : TCurrentArray;

// TEST

import { Expect, Equal } from 'type-testing';

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected =  [
  '🛹', '🛹',
	'🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
	'🛹', '🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴',
	'🏄',
	'🛹', '🛹',
	'🚲',
	'🛴', '🛴'
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
	'🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;