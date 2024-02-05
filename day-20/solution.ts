type Letters = {
  A: ['█▀█ ', '█▀█ ', '▀ ▀ '];
  B: ['█▀▄ ', '█▀▄ ', '▀▀  '];
  C: ['█▀▀ ', '█ ░░', '▀▀▀ '];
  E: ['█▀▀ ', '█▀▀ ', '▀▀▀ '];
  H: ['█ █ ', '█▀█ ', '▀ ▀ '];
  I: ['█ ', '█ ', '▀ '];
  M: ['█▄░▄█ ', '█ ▀ █ ', '▀ ░░▀ '];
  N: ['█▄░█ ', '█ ▀█ ', '▀ ░▀ '];
  P: ['█▀█ ', '█▀▀ ', '▀ ░░'];
  R: ['█▀█ ', '██▀ ', '▀ ▀ '];
  S: ['█▀▀ ', '▀▀█ ', '▀▀▀ '];
  T: ['▀█▀ ', '░█ ░', '░▀ ░'];
  Y: ['█ █ ', '▀█▀ ', '░▀ ░'];
  W: ['█ ░░█ ', '█▄▀▄█ ', '▀ ░ ▀ '];
  ' ': ['░', '░', '░'];
  ':': ['#', '░', '#'];
  '*': ['░', '#', '░'];
};

type TJoinLetters<TWord extends string[], TLetter extends string[]> = TWord extends [
  ...infer TStarting extends string[],
  infer TW1 extends string,
  infer TW2 extends string,
  infer TW3 extends string
]
  ? TLetter extends [infer TL1 extends string, infer TL2 extends string, infer TL3 extends string]
    ? [...TStarting, `${TW1}${TL1}`, `${TW2}${TL2}`, `${TW3}${TL3}`]
    : never
  : never;

type ToAsciiArt<
  TWord extends string,
  TFinalWord extends string[] = ['', '', '']
> = TWord extends `${infer TLetter}${infer TRemaining extends string}`
  ? Uppercase<TLetter> extends keyof Letters
    ? Letters[Uppercase<TLetter>] extends string[]
      ? ToAsciiArt<TRemaining, TJoinLetters<TFinalWord, Letters[Uppercase<TLetter>]>>
      : never
    : TLetter extends '\n'
    ? ToAsciiArt<TRemaining, [...TFinalWord, '', '', '']>
    : TFinalWord
  : TFinalWord;

// TEST

import { Equal, Expect } from "type-testing";

type test_0_actual = ToAsciiArt<"   * : * Merry * : *   \n  Christmas  ">;
//   ^?
type test_0_expected = [
  "░░░░░#░░░█▄░▄█ █▀▀ █▀█ █▀█ █ █ ░░░#░░░░░",
  "░░░#░░░#░█ ▀ █ █▀▀ ██▀ ██▀ ▀█▀ ░#░░░#░░░",
  "░░░░░#░░░▀ ░░▀ ▀▀▀ ▀ ▀ ▀ ▀ ░▀ ░░░░#░░░░░",
  "░░█▀▀ █ █ █▀█ █ █▀▀ ▀█▀ █▄░▄█ █▀█ █▀▀ ░░",
  "░░█ ░░█▀█ ██▀ █ ▀▀█ ░█ ░█ ▀ █ █▀█ ▀▀█ ░░",
  "░░▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀ ░▀ ░▀ ░░▀ ▀ ▀ ▀▀▀ ░░",
];
type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;

type test_1_actual = ToAsciiArt<"  Happy new  \n  * : * : * Year * : * : *  ">;
//   ^?
type test_1_expected = [
        "░░█ █ █▀█ █▀█ █▀█ █ █ ░█▄░█ █▀▀ █ ░░█ ░░",
        "░░█▀█ █▀█ █▀▀ █▀▀ ▀█▀ ░█ ▀█ █▀▀ █▄▀▄█ ░░",
        "░░▀ ▀ ▀ ▀ ▀ ░░▀ ░░░▀ ░░▀ ░▀ ▀▀▀ ▀ ░ ▀ ░░",
        "░░░░#░░░#░░░█ █ █▀▀ █▀█ █▀█ ░░░#░░░#░░░░",
        "░░#░░░#░░░#░▀█▀ █▀▀ █▀█ ██▀ ░#░░░#░░░#░░",
        "░░░░#░░░#░░░░▀ ░▀▀▀ ▀ ▀ ▀ ▀ ░░░#░░░#░░░░",
];
type test_1 = Expect<Equal<test_1_actual, test_1_expected>>;

type test_2_actual = ToAsciiArt<"  * : * : * : * : * : * \n  Trash  \n  * : * : * : * : * : * ">;
//   ^?
type test_2_expected = [
  "░░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░",
  "░░▀█▀ █▀█ █▀█ █▀▀ █ █ ░░",
  "░░░█ ░██▀ █▀█ ▀▀█ █▀█ ░░",
  "░░░▀ ░▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀ ░░",
  "░░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░",
];
type test_2 = Expect<Equal<test_2_actual, test_2_expected>>;

type test_3_actual = ToAsciiArt<"  : * : * : * : * : * : * : \n  Ecyrbe  \n  : * : * : * : * : * : * : ">;
//   ^?
type test_3_expected = [
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░█▀▀ █▀▀ █ █ █▀█ █▀▄ █▀▀ ░░",
  "░░█▀▀ █ ░░▀█▀ ██▀ █▀▄ █▀▀ ░░",
  "░░▀▀▀ ▀▀▀ ░▀ ░▀ ▀ ▀▀  ▀▀▀ ░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
];
type test_3 = Expect<Equal<test_3_actual, test_3_expected>>;