type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  ';
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = [
  [TicTacToeCell, TicTacToeCell, TicTacToeCell],
  [TicTacToeCell, TicTacToeCell, TicTacToeCell],
  [TicTacToeCell, TicTacToeCell, TicTacToeCell]
];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

type TPositionX<TWordPositionX extends TicTacToeXPositions> = TWordPositionX extends 'left'
  ? 0
  : TWordPositionX extends 'center'
  ? 1
  : 2;
type TPositionY<TWordPositionY extends TicTacToeYPositions> = TWordPositionY extends 'top'
  ? 0
  : TWordPositionY extends 'middle'
  ? 1
  : 2;

type TPosition<TWordPosition extends TicTacToePositions> =
  TWordPosition extends `${infer TPY extends TicTacToeYPositions}-${infer TPX extends TicTacToeXPositions}`
    ? [TPositionY<TPY>, TPositionX<TPX>]
    : never;

type TBoardFromMove<
  TBoard extends TicTactToeBoard,
  TMove extends TicTacToePositions,
  TChip extends TicTacToeChip
> = TPosition<TMove> extends [infer TY extends number, infer TX extends number]
  ? TY extends 0
    ? TX extends 0
      ? TBoard extends [[infer TExisting, ...infer TRColumns], ...infer TRRows]
        ? TExisting extends TicTacToeEmptyCell
          ? [[TChip, ...TRColumns], ...TRRows]
          : 'invalid'
        : never
      : TX extends 1
      ? TBoard extends [[infer TRColumn0, infer TExisting, infer TRColumn2], ...infer TRRows]
        ? TExisting extends TicTacToeEmptyCell
          ? [[TRColumn0, TChip, TRColumn2], ...TRRows]
          : 'invalid'
        : never
      : TX extends 2
      ? TBoard extends [[...infer TRColumns, infer TExisting], ...infer TRRows]
        ? TExisting extends TicTacToeEmptyCell
          ? [[...TRColumns, TChip], ...TRRows]
          : 'invalid'
        : never
      : never
    : TY extends 1
    ? TX extends 0
      ? TBoard extends [infer TRRow0, [infer TExisting, ...infer TRColumns], infer TRRow2]
        ? TExisting extends TicTacToeEmptyCell
          ? [TRRow0, [TChip, ...TRColumns], TRRow2]
          : 'invalid'
        : never
      : TX extends 1
      ? TBoard extends [infer TRRow0, [infer TRColumn0, infer TExisting, infer TRColumn2], infer TRRow2]
        ? TExisting extends TicTacToeEmptyCell
          ? [TRRow0, [TRColumn0, TChip, TRColumn2], TRRow2]
          : 'invalid'
        : never
      : TX extends 2
      ? TBoard extends [...infer TRRows, [...infer TRColumns, infer TExisting]]
        ? TExisting extends TicTacToeEmptyCell
          ? [...TRRows, [...TRColumns, TChip]]
          : 'invalid'
        : never
      : never
    : TY extends 2
    ? TX extends 0
      ? TBoard extends [...infer TRRows, [infer TExisting, ...infer TRColumns]]
        ? TExisting extends TicTacToeEmptyCell
          ? [...TRRows, [TChip, ...TRColumns]]
          : 'invalid'
        : never
      : TX extends 1
      ? TBoard extends [...infer TRRows, [infer TRColumn0, infer TExisting, infer TRColumn2]]
        ? TExisting extends TicTacToeEmptyCell
          ? [...TRRows, [TRColumn0, TChip, TRColumn2]]
          : 'invalid'
        : never
      : TX extends 2
      ? TBoard extends [...infer TRRows, [...infer TRColumns, infer TExisting]]
        ? TExisting extends TicTacToeEmptyCell
          ? [...TRRows, [...TRColumns, TChip]]
          : 'invalid'
        : never
      : never
    : never
  : never;

type TWinChecker<TBoard extends TicTactToeBoard, TLastMove extends TicTacToeChip> = TBoard extends [
  [TLastMove, string, string],
  [TLastMove, string, string],
  [TLastMove, string, string]
]
  ? `${TLastMove} Won`
  : TBoard extends [[string, TLastMove, string], [string, TLastMove, string], [string, TLastMove, string]]
  ? `${TLastMove} Won`
  : TBoard extends [[string, string, TLastMove], [string, string, TLastMove], [string, string, TLastMove]]
  ? `${TLastMove} Won`
  : TBoard extends [[TLastMove, TLastMove, TLastMove], [string, string, string], [string, string, string]]
  ? `${TLastMove} Won`
  : TBoard extends [[string, string, string], [TLastMove, TLastMove, TLastMove], [string, string, string]]
  ? `${TLastMove} Won`
  : TBoard extends [[string, string, string], [string, string, string], [TLastMove, TLastMove, TLastMove]]
  ? `${TLastMove} Won`
  : TBoard extends [[TLastMove, string, string], [string, TLastMove, string], [string, string, TLastMove]]
  ? `${TLastMove} Won`
  : TBoard extends [[string, string, TLastMove], [string, TLastMove, string], [TLastMove, string, string]]
  ? `${TLastMove} Won`
  : TBoard extends [
      [TicTacToeChip, TicTacToeChip, TicTacToeChip],
      [TicTacToeChip, TicTacToeChip, TicTacToeChip],
      [TicTacToeChip, TicTacToeChip, TicTacToeChip]
    ]
  ? `Draw`
  : TLastMove extends '❌'
  ? '⭕'
  : '❌';

type TicTacToeWithResultBoard<
  TGameState extends TicTacToeGame,
  TBoard extends TicTactToeBoard | 'invalid'
> = TGameState['state'] extends TicTacToeChip
  ? TBoard extends 'invalid'
    ? TGameState
    : TBoard extends TicTactToeBoard
    ? {
        state: TWinChecker<TBoard, TGameState['state']>;
        board: TBoard;
      }
    : never
  : never;

type TicTacToe<
  TGameState extends TicTacToeGame,
  TMove extends TicTacToePositions
> = TGameState['state'] extends TicTacToeChip
  ? TicTacToeWithResultBoard<TGameState, TBoardFromMove<TGameState['board'], TMove, TGameState['state']>>
  : never;

// TEST

import { Equal, Expect } from 'type-testing';

type test_move1_actual = TicTacToe<NewGame, 'top-center'>;
//   ^?
type test_move1_expected = {
  board: [
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, 'top-left'>;
//   ^?
type test_move2_expected = {
  board: [
    ['⭕', '❌', '  '], 
    ['  ', '  ', '  '], 
    ['  ', '  ', '  ']];
  state: '❌';
}
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, 'middle-center'>;
//   ^?
type test_move3_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, 'bottom-left'>;
//   ^?
type test_move4_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '  ' ]
  ];
  state: '❌';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;


type test_x_win_actual = TicTacToe<test_move4_actual, 'bottom-center'>;
//   ^?
type test_x_win_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '❌', '  ' ]
  ];
  state: '❌ Won';
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, 'bottom-right'>;
//   ^?
type type_move5_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '❌' ]
  ];
  state: '⭕';
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, 'middle-left'>;
//   ^?
type test_o_win_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '⭕', '❌', '  ' ],
    [ '⭕', '  ', '❌' ]
  ];
  state: '⭕ Won';
};

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, 'top-center'>;
//   ^?
type test_invalid_expected = {
  board: [
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
  board: [
    ['⭕', '❌', '⭕'], 
    ['⭕', '❌', '❌'], 
    ['❌', '⭕', '  ']];
  state: '⭕';
}
type test_draw_actual = TicTacToe<test_before_draw, 'bottom-right'>;
//   ^?
type test_draw_expected = {
  board: [
    ['⭕', '❌', '⭕'], 
    ['⭕', '❌', '❌'], 
    ['❌', '⭕', '⭕']];
  state: 'Draw';
}
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;