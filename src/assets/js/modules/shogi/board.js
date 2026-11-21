// src/assets/js/modules/shogi/board.js

import { playMoves, formatMove, pieceLabel, handPieceLabel, rankLabel, squareName, HAND_ORDER, START_SFEN } from './engine.js';

const LABELS_KEY = 'shogi-labels';
const STEP_KEYS = { ArrowLeft: -1, ArrowRight: 1 };

const readLabels = () => {
  try { return localStorage.getItem(LABELS_KEY) === 'letters' ? 'letters' : 'kanji'; } catch { return 'kanji'; }
};
const saveLabels = (labels) => {
  try { localStorage.setItem(LABELS_KEY, labels); } catch { /* Private windows can refuse storage; the toggle still works */ }
};

/** A move is either "7g7f" or { move: "7g7f", quote, page, note } */
const moveText = (move) => (typeof move === 'string' ? move : move.move);

/**
 * Wraps a quote in quote marks, unless it already has its own at the edge: it opens with one, or it's the end of a
 * line split across moves (… 8 Two Silver to checkmate.”). Same rule as the `quoted` filter in utils/filters.js.
 */
const quoted = (quote) => {
  const plain = quote.replace(/<[^>]+>/g, '');
  const count = (re) => (plain.match(re) || []).length;
  return /^[“"‘「『]/.test(plain) || count(/”/g) > count(/“/g) ? quote : `"${quote}"`;
};

/**
 * RYUO NO OSHIGOTO GAME VIEWER
 * Steps through the games in src/_data/ryuo.js, which ryuo.njk embeds as JSON.
 */
export function initShogiBoard() {
  const root = document.querySelector('[data-shogi-viewer]');
  const dataEl = document.getElementById('shogi-games');
  if (!root || !dataEl || root.dataset.ready) return;
  root.dataset.ready = 'true';

  const { series, volumes } = JSON.parse(dataEl.textContent);
  const $ = (name) => root.querySelector(`[data-shogi-${name}]`);
  const el = {
    select: $('select'), info: $('info'), board: $('board'), files: $('files'), ranks: $('ranks'),
    standTop: $('stand-top'), standBottom: $('stand-bottom'), list: $('list'), note: $('note'),
    result: $('result'), error: $('error'), counter: $('counter'), live: $('live'), reveal: $('reveal'),
    first: $('first'), prev: $('prev'), next: $('next'), last: $('last'), flip: $('flip'), labels: $('labels'),
  };

  // Every game by id, with its volume for citations
  const games = new Map();
  for (const vol of volumes) for (const game of vol.games || []) games.set(game.id, { ...game, volume: vol.volume });

  const state = { game: null, played: null, ply: 0, revealed: false, flipped: false, labels: readLabels() };

  // Moves you can step through now: a puzzle's solution is added once it's revealed
  const visibleMoves = () => {
    const g = state.game;
    if (!g) return [];
    const setup = g.moves || [];
    return g.kind === 'puzzle' && !state.revealed ? setup : setup.concat(g.solution || []);
  };
  const lastPly = () => state.played.positions.length - 1;

  function loadGame(id, ply = 0) {
    state.game = games.get(id) || null;
    state.revealed = false;
    replay();
    state.ply = Math.min(Math.max(ply, 0), lastPly());
    render();
  }

  function replay() {
    state.played = playMoves(state.game?.start || START_SFEN, visibleMoves().map(moveText));
  }

  function goTo(ply) {
    state.ply = Math.min(Math.max(ply, 0), lastPly());
    render();
    if (state.ply > 0) el.live.textContent = `Move ${state.ply} of ${lastPly()}: ${formatAt(state.ply)}`;
    else el.live.textContent = 'Start position';
  }

  const formatAt = (ply) => formatMove(state.played.records[ply - 1], state.labels, state.played.records[ply - 2]);

  /* ---------- Drawing ---------- */

  function render() {
    root.dataset.labels = state.labels;
    root.classList.toggle('is-flipped', state.flipped);
    renderBoard();
    renderStands();
    renderInfo();
    renderList();
    renderNote();
    renderControls();
    if (state.game) history.replaceState(null, '', `#${encodeURIComponent(state.game.id)}/${state.ply}`);
  }

  function pieceEl(piece, rotated) {
    const span = document.createElement('span');
    span.className = 'shogi-piece';
    if (piece.promoted) span.classList.add('shogi-piece--promoted');
    if (rotated) span.classList.add('shogi-piece--turned');
    span.textContent = pieceLabel(piece, state.labels);
    return span;
  }

  function renderBoard() {
    const position = state.played.positions[state.ply];
    const record = state.played.records[state.ply - 1];
    const order = [...Array(9).keys()];
    const view = state.flipped ? [...order].reverse() : order;

    el.board.replaceChildren(...view.flatMap((rank) => view.map((col) => {
      const square = document.createElement('div');
      square.className = 'shogi-board__square';
      const name = squareName(rank, col);
      if (record?.to === name) square.classList.add('is-to');
      if (record?.from === name) square.classList.add('is-from');
      const piece = position.board[rank][col];
      // Pieces face their owner: gote's are turned, unless the board is flipped
      if (piece) square.append(pieceEl(piece, (piece.owner === 'w') !== state.flipped));
      return square;
    })));

    el.files.replaceChildren(...view.map((col) => Object.assign(document.createElement('span'), { textContent: 9 - col })));
    el.ranks.replaceChildren(...view.map((rank) => Object.assign(document.createElement('span'), { textContent: rankLabel(rank, state.labels) })));
    el.board.setAttribute('aria-label', state.ply ? `Board after move ${state.ply}` : 'Board at the start position');
  }

  function renderStands() {
    const position = state.played.positions[state.ply];
    const fill = (stand, owner) => {
      const name = owner === 'b' ? state.game?.sente : state.game?.gote;
      const heading = document.createElement('span');
      heading.className = 'shogi-stand__name';
      heading.textContent = `${owner === 'b' ? '☗ Sente' : '☖ Gote'}${name ? `: ${name}` : ''}`;
      const pieces = HAND_ORDER.filter((type) => position.hands[owner][type]).map((type) => {
        const count = position.hands[owner][type];
        const item = document.createElement('span');
        item.className = 'shogi-stand__piece';
        const label = pieceEl({ type, owner, promoted: false }, false);
        label.textContent = handPieceLabel(type, state.labels);
        item.append(label);
        if (count > 1) item.append(Object.assign(document.createElement('span'), { className: 'shogi-stand__count', textContent: `×${count}` }));
        return item;
      });
      const empty = Object.assign(document.createElement('span'), { className: 'shogi-stand__empty', textContent: 'nothing in hand' });
      stand.replaceChildren(heading, ...(pieces.length ? pieces : [empty]));
    };
    // The player nearest you sits below the board
    fill(el.standTop, state.flipped ? 'b' : 'w');
    fill(el.standBottom, state.flipped ? 'w' : 'b');
  }

  function renderInfo() {
    const g = state.game;
    const option = g && el.select.querySelector(`option[value="${CSS.escape(g.id)}"]`);
    if (!g) {
      el.info.innerHTML = `<p class="shogi-viewer__empty">Nothing logged yet. Games from <i>${series}</i> are on the way.</p>`;
      return;
    }
    const kind = { game: 'Game', position: 'Position', puzzle: 'Puzzle', strategy: 'Strategy' }[g.kind] || 'Game';
    const where = [option?.dataset.chapter, g.page ? `p. ${g.page}` : ''].filter(Boolean).join(' · ');
    el.info.innerHTML = `
      <span class="custom-menu__badge">${kind}</span>
      <h2 class="shogi-viewer__title">${g.title || 'Untitled'}</h2>
      <p class="shogi-viewer__where">Volume ${g.volume}${where ? ` · ${where}` : ''}</p>`;
  }

  function renderList() {
    const items = [{ ply: 0, text: 'Start' }].concat(state.played.records.map((_, i) => ({ ply: i + 1, text: formatAt(i + 1) })));
    el.list.replaceChildren(...items.map(({ ply, text }) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'shogi-viewer__move';
      button.textContent = ply ? `${ply}. ${text}` : text;
      const move = visibleMoves()[ply - 1];
      if (move && typeof move === 'object' && (move.quote || move.note)) button.classList.add('has-note');
      if (ply === state.ply) button.setAttribute('aria-current', 'step');
      button.addEventListener('click', () => goTo(ply));
      li.append(button);
      return li;
    }));
    // Keep the current move in view without scrolling the page
    const current = el.list.querySelector('[aria-current]');
    if (current) {
      const top = current.getBoundingClientRect().top - el.list.getBoundingClientRect().top;
      if (top < 0 || top > el.list.clientHeight - current.offsetHeight) {
        el.list.scrollTop += top - el.list.clientHeight / 2;
      }
    }
  }

  function renderNote() {
    const g = state.game;
    const source = state.ply ? visibleMoves()[state.ply - 1] : g;
    const entry = source && typeof source === 'object' ? source : {};
    const parts = [];
    if (entry.note) parts.push(`<p class="shogi-viewer__note-text">${entry.note}</p>`);
    if (entry.quote) {
      const page = entry.page ? `, page ${entry.page}` : '';
      parts.push(`<p class="shogi-viewer__quote"><i>${quoted(entry.quote)}</i><br><i>${series}</i>, Volume ${g.volume}${page}</p>`);
    }
    el.note.innerHTML = parts.join('');
    el.note.hidden = !parts.length;

    // The result waits for the last move (and for a puzzle's answer)
    const atEnd = g && state.ply === lastPly() && !state.played.error && (g.kind !== 'puzzle' || state.revealed);
    el.result.hidden = !(atEnd && g.result);
    // HTML, like the notes: Japanese in it carries its readings as <ruby> (utils/japanese.js)
    el.result.innerHTML = el.result.hidden ? '' : g.result;

    const err = state.played.error;
    el.error.hidden = !err;
    if (err) el.error.textContent = `Move ${err.index + 1} of "${g.title || g.id}" (${err.move}) doesn't fit the board: ${err.message}. The board stops before it.`;
  }

  function renderControls() {
    const hasGame = Boolean(state.game);
    el.select.disabled = !hasGame;
    el.first.disabled = el.prev.disabled = !hasGame || state.ply === 0;
    el.next.disabled = el.last.disabled = !hasGame || state.ply === lastPly();
    el.counter.textContent = hasGame ? `Move ${state.ply} / ${lastPly()}` : '';
    const canReveal = hasGame && state.game.kind === 'puzzle' && !state.revealed && (state.game.solution || []).length > 0;
    el.reveal.hidden = !canReveal;
    el.labels.textContent = state.labels === 'kanji' ? 'Letters' : '漢字';
    el.labels.setAttribute('aria-label', state.labels === 'kanji' ? 'Show pieces as English letters' : 'Show pieces as kanji');
    el.flip.setAttribute('aria-pressed', String(state.flipped));
  }

  /* ---------- Controls ---------- */

  el.first.addEventListener('click', () => goTo(0));
  el.prev.addEventListener('click', () => goTo(state.ply - 1));
  el.next.addEventListener('click', () => goTo(state.ply + 1));
  el.last.addEventListener('click', () => goTo(lastPly()));
  el.flip.addEventListener('click', () => { state.flipped = !state.flipped; render(); });
  el.labels.addEventListener('click', () => {
    state.labels = state.labels === 'kanji' ? 'letters' : 'kanji';
    saveLabels(state.labels);
    render();
  });
  el.reveal.addEventListener('click', () => {
    const from = lastPly();
    state.revealed = true;
    replay();
    goTo(from + 1);
    el.next.focus();
  });
  el.select.addEventListener('change', () => {
    loadGame(el.select.value);
    el.live.textContent = state.game ? `${state.game.title || state.game.id}, start position` : '';
  });
  root.addEventListener('keydown', (event) => {
    if (!state.game || event.target.closest('select, input, textarea')) return;
    if (event.key in STEP_KEYS) goTo(state.ply + STEP_KEYS[event.key]);
    else if (event.key === 'Home') goTo(0);
    else if (event.key === 'End') goTo(lastPly());
    else return;
    event.preventDefault();
  });

  // On a touch screen, swiping the board sideways steps through the moves like the arrow keys: swipe left for
  // the next move, right for the one before. The board and stands have touch-action: pan-y (_shogi-board.scss),
  // so an up-or-down swipe still scrolls the page. Swipes that start on the buttons below are left alone.
  const SWIPE_MIN = 40; // px across before it counts, so a tap or a wobble doesn't step
  let swipe = null;
  const table = root.querySelector('.shogi-viewer__table');
  table.addEventListener('pointerdown', (event) => {
    swipe = event.pointerType !== 'mouse' && !event.target.closest('.shogi-viewer__controls')
      ? { id: event.pointerId, x: event.clientX, y: event.clientY } : null;
  });
  table.addEventListener('pointerup', (event) => {
    if (!swipe || event.pointerId !== swipe.id || !state.game) return;
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    swipe = null;
    // Mostly sideways: a diagonal drag is more likely someone scrolling
    if (Math.abs(dx) >= SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(state.ply + (dx < 0 ? 1 : -1));
  });
  table.addEventListener('pointercancel', () => { swipe = null; });

  // "See it on the board" links on the cards below open their entry and bring the viewer into view
  document.querySelectorAll('[data-shogi-open]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.dataset.shogiOpen;
      if (!games.has(id)) return;
      event.preventDefault();
      el.select.value = id;
      loadGame(id);
      el.live.textContent = `${state.game.title || id}, start position`;
      root.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      root.querySelector('.shogi-viewer__table').focus({ preventScroll: true });
    });
  });

  // Open the game and move named in the address (#game-id/move), else the first game
  const [hashId, hashPly] = decodeURIComponent(location.hash.slice(1)).split('/');
  const firstId = games.keys().next().value;
  const startId = games.has(hashId) ? hashId : firstId;
  if (startId) el.select.value = startId;
  loadGame(startId, games.has(hashId) ? Number(hashPly) || 0 : 0);
}
