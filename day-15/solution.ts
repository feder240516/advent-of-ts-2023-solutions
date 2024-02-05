type AddOneToArray<TArray extends unknown[], TAdded extends unknown> = [...TArray, TAdded];

type GetArrayLength<TArray extends unknown[]> = TArray["length"];

type BoxToys<
	TString extends string,
	TSizes extends number,
	TArray extends unknown[] = []
> = TSizes extends GetArrayLength<TArray>
		? TArray
		: BoxToys<TString, TSizes, AddOneToArray<TArray, TString>>;


// TEST

import { Expect, Equal } from 'type-testing';

type test_doll_actual = BoxToys<'doll', 1>;
//   ^?
type test_doll_expected = ['doll'];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<'nutcracker', 3 | 4>;
//   ^?
type test_nutcracker_expected =
  | ['nutcracker', 'nutcracker', 'nutcracker']
  | ['nutcracker', 'nutcracker', 'nutcracker', 'nutcracker'];
type test_nutcracker = Expect<Equal<test_nutcracker_expected, test_nutcracker_actual>>;
