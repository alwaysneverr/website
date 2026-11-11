// src/assets/js/modules/shogi/engine.js

/**
 * SHOGI POSITION ENGINE
 * Reads SFEN positions and plays coordinate (USI) moves on them, for the Ryuo no Oshigoto game viewer.
 * No page code here, so it can be tested on its own. It checks that each move makes sense
 * (the right player's piece is on the from-square, a dropped piece is in hand) but not full shogi legality.
 *
 * Squares are written file then rank: "7g" is file 7, rank g. Ranks a–i run from gote's side down to sente's.
 * Moves: "7g7f" (move), "8h2b+" (move and promote), "P*5e" (drop from hand).
 */

export const START_SFEN = 'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1';

const RANKS = 'abcdefghi';
const HAND_ORDER = ['R', 'B', 'G', 'S', 'N', 'L', 'P'];
const PROMOTABLE = new Set(['P', 'L', 'N', 'S', 'B', 'R']);
const KANJI_DIGITS = '一二三四五六七八九';

// Names for the move list (KIF style) and single characters for the board
const KANJI_NAME = { P: '歩', L: '香', N: '桂', S: '銀', G: '金', B: '角', R: '飛', K: '玉' };
const KANJI_PROMOTED_NAME = { P: 'と', L: '成香', N: '成桂', S: '成銀', B: '馬', R: '龍' };
const KANJI_PROMOTED_CHAR = { P: 'と', L: '杏', N: '圭', S: '全', B: '馬', R: '龍' };

export class ShogiError extends Error {}

const emptyHand = () => Object.fromEntries(HAND_ORDER.map((type) => [type, 0]));

/** "7g" -> { rank: 6, col: 2 } (col 0 is file 9, the left edge seen from sente) */
function parseSquare(square) {
  return { rank: RANKS.indexOf(square[1]), col: 9 - Number(square[0]) };
}

function squareName(rank, col) {
  return `${9 - col}${RANKS[rank]}`;
}

/** Reads an SFEN string into { board, hands, turn }. board[rank][col] is null or { type, owner, promoted }. */
export function parseSfen(sfen = START_SFEN) {
  const [placement, turn = 'b', hand = '-'] = sfen.trim().split(/\s+/);
  const rows = placement.split('/');
  if (rows.length !== 9) throw new ShogiError(`The position needs 9 ranks separated by "/", but has ${rows.length}`);

  const board = rows.map((row, rank) => {
    const squares = [];
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (/[1-9]/.test(ch)) {
        for (let n = 0; n < Number(ch); n++) squares.push(null);
        continue;
      }
      const promoted = ch === '+';
      const letter = promoted ? row[++i] : ch;
      if (!letter || !KANJI_NAME[letter.toUpperCase()]) throw new ShogiError(`Unknown piece "${ch}${promoted ? letter ?? '' : ''}" on rank ${RANKS[rank]}`);
      squares.push({ type: letter.toUpperCase(), owner: letter === letter.toUpperCase() ? 'b' : 'w', promoted });
    }
    if (squares.length !== 9) throw new ShogiError(`Rank ${RANKS[rank]} of the position has ${squares.length} squares instead of 9`);
    return squares;
  });

  if (turn !== 'b' && turn !== 'w') throw new ShogiError(`The side to move must be "b" (sente) or "w" (gote), not "${turn}"`);

  const hands = { b: emptyHand(), w: emptyHand() };
  if (hand !== '-') {
    for (const [, count, letter] of hand.matchAll(/(\d*)([PLNSGBRplnsgbr])/g)) {
      hands[letter === letter.toUpperCase() ? 'b' : 'w'][letter.toUpperCase()] += Number(count || 1);
    }
  }
  return { board, hands, turn };
}

function clonePosition({ board, hands, turn }) {
  return {
    board: board.map((row) => row.map((piece) => (piece ? { ...piece } : null))),
    hands: { b: { ...hands.b }, w: { ...hands.w } },
    turn,
  };
}

const inPromotionZone = (owner, rank) => (owner === 'b' ? rank <= 2 : rank >= 6);

/**
 * Plays one move. Returns the new position and a record describing the move.
 * Throws ShogiError with a plain explanation when the move doesn't fit the position.
 */
export function applyMove(position, move) {
  const text = String(move).trim();
  const next = clonePosition(position);
  const side = position.turn;
  const sideName = side === 'b' ? 'sente' : 'gote';

  const drop = text.match(/^([PLNSGBR])\*([1-9][a-i])$/);
  const normal = text.match(/^([1-9][a-i])([1-9][a-i])(\+)?$/);

  let record;
  if (drop) {
    const [, type, to] = drop;
    const t = parseSquare(to);
    if (!position.hands[side][type]) throw new ShogiError(`${sideName} has no ${KANJI_NAME[type]} (${type}) in hand to drop`);
    if (position.board[t.rank][t.col]) throw new ShogiError(`can't drop on ${to}, it already has a piece`);
    next.hands[side][type] -= 1;
    next.board[t.rank][t.col] = { type, owner: side, promoted: false };
    record = { side, type, promoted: false, to, drop: true };
  } else if (normal) {
    const [, from, to, promote] = normal;
    const f = parseSquare(from);
    const t = parseSquare(to);
    const piece = position.board[f.rank][f.col];
    if (!piece) throw new ShogiError(`there's no piece on ${from}`);
    if (piece.owner !== side) throw new ShogiError(`the piece on ${from} is ${piece.owner === 'b' ? 'sente' : 'gote'}'s, but it's ${sideName}'s turn`);
    const target = position.board[t.rank][t.col];
    if (target && target.owner === side) throw new ShogiError(`${to} already has one of ${sideName}'s own pieces`);
    const canPromote = !piece.promoted && PROMOTABLE.has(piece.type) && (inPromotionZone(side, f.rank) || inPromotionZone(side, t.rank));
    if (promote && !canPromote) throw new ShogiError(`the piece on ${from} can't promote on this move`);

    if (target) next.hands[side][target.type] += 1; // Captured pieces go to hand unpromoted
    next.board[f.rank][f.col] = null;
    next.board[t.rank][t.col] = { ...piece, promoted: piece.promoted || Boolean(promote) };
    record = { side, type: piece.type, promoted: piece.promoted, from, to, capture: Boolean(target), promote: Boolean(promote), declined: canPromote && !promote };
  } else {
    throw new ShogiError(`"${text}" isn't a move; write moves like 7g7f, 8h2b+ or P*5e`);
  }

  next.turn = side === 'b' ? 'w' : 'b';
  return { position: next, record };
}

/** Plays a list of moves from a start position; stops at the first bad move and reports it. */
export function playMoves(startSfen, moves) {
  const positions = [parseSfen(startSfen || START_SFEN)];
  const records = [];
  for (let i = 0; i < moves.length; i++) {
    try {
      const { position, record } = applyMove(positions[i], moves[i]);
      positions.push(position);
      records.push(record);
    } catch (error) {
      if (!(error instanceof ShogiError)) throw error;
      return { positions, records, error: { index: i, move: String(moves[i]), message: error.message } };
    }
  }
  return { positions, records, error: null };
}

/** The character shown on a piece: kanji, or a letter with "+" for promoted pieces */
export function pieceLabel(piece, labels) {
  if (labels === 'letters') return `${piece.promoted ? '+' : ''}${piece.type}`;
  if (piece.promoted) return KANJI_PROMOTED_CHAR[piece.type];
  if (piece.type === 'K') return piece.owner === 'b' ? '玉' : '王';
  return KANJI_NAME[piece.type];
}

export function handPieceLabel(type, labels) {
  return labels === 'letters' ? type : KANJI_NAME[type];
}

export { HAND_ORDER };

/**
 * Writes a move for the move list. Every board move shows where it came from, so it is never ambiguous.
 *   kanji:   ▲7六歩(77)  △同銀(31)  ▲2二角成(88)  ▲5五角打
 *   letters: P7g-7f      S3ax2b     B8hx2b+       B*5e
 * previous is the record of the move before, for 同 ("same square").
 */
export function formatMove(record, labels, previous) {
  if (labels === 'letters') {
    const piece = `${record.promoted ? '+' : ''}${record.type}`;
    if (record.drop) return `${piece}*${record.to}`;
    return `${piece}${record.from}${record.capture ? 'x' : '-'}${record.to}${record.promote ? '+' : record.declined ? '=' : ''}`;
  }

  const mark = record.side === 'b' ? '▲' : '△';
  const t = parseSquare(record.to);
  const square = previous && previous.to === record.to ? '同' : `${9 - t.col}${KANJI_DIGITS[t.rank]}`;
  const name = record.promoted ? KANJI_PROMOTED_NAME[record.type] : KANJI_NAME[record.type];
  if (record.drop) return `${mark}${square}${name}打`;
  const f = parseSquare(record.from);
  const suffix = record.promote ? '成' : record.declined ? '不成' : '';
  return `${mark}${square}${name}${suffix}(${9 - f.col}${f.rank + 1})`;
}

export const rankLabel = (rank, labels) => (labels === 'letters' ? RANKS[rank] : KANJI_DIGITS[rank]);
export { squareName };
