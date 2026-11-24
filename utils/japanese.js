// Japanese text on the Field Notes pages: hiragana readings over every kanji (<ruby>), marked as Japanese.
//
// In the data files, write each kanji (or a group read as one, like 大阪) followed by its reading in brackets:
//   "the Crab Castle (蟹[かに]囲[がこ]い, kani-gakoi)"
// Kana and Latin letters need no brackets. Romaji is plain text, written next to the Japanese where it reads well.
// rubyText() turns that into <ruby>蟹<rp>(</rp><rt>かに</rt><rp>)</rp>…</ruby> inside <span lang="ja">, and stops the
// build if any kanji is left without a reading, so none can slip through unannotated.

const KANJI = '\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff々〆ヶ';
const KANA = '\\u3040-\\u309f\\u30a0-\\u30ff\\u31f0-\\u31ff\\uff66-\\uff9f';
// Kanji with a bracketed reading
const ANNOTATED = new RegExp(`([${KANJI}]+)\\[([${KANA}ー]+)\\]`, 'g');
// A run of Japanese: annotated kanji, kana, the long-vowel mark, Japanese punctuation, and Latin letters/digits
// directly attached to them (4四歩, サヨナラCOLOR)
const RUN = new RegExp(`[0-9A-Za-z]*(?:(?:[${KANJI}]+\\[[${KANA}ー]+\\])|[${KANA}ー・、。「」『』〜])+(?:(?:[0-9A-Za-z]*)(?:(?:[${KANJI}]+\\[[${KANA}ー]+\\])|[${KANA}ー・、。「」『』〜]))*`, 'g');
const BARE_KANJI = new RegExp(`[${KANJI}]`);

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Readings syntax -> HTML. `text` may already contain HTML (notes do); only the Japanese runs change. */
export function rubyText(text, where = '') {
  if (typeof text !== 'string' || !/[　-鿿＀-￯]/.test(text)) return text;
  const html = text.replace(RUN, (run) => {
    const inner = run.replace(ANNOTATED, (m, base, reading) => `<ruby>${base}<rp>(</rp><rt>${reading}</rt><rp>)</rp></ruby>`);
    return `<span lang="ja">${inner}</span>`;
  });
  // Every kanji has to end up as a ruby base. Strip the ruby markup and see what's left.
  const leftover = html.replace(/<ruby>[\s\S]*?<\/ruby>/g, '').replace(/<[^>]+>/g, ' ');
  // Kanji inside an href (percent-encoded) never matches; raw kanji anywhere else is a missing reading
  if (BARE_KANJI.test(leftover)) {
    const bad = leftover.match(new RegExp(`[${KANJI}]+`, 'g'));
    throw new Error(`Field Notes: kanji without a reading (${bad.join(', ')})${where ? ` in ${where}` : ''}. Write it as 漢[かん]字[じ].`);
  }
  return html;
}

// Fields that are shown as HTML and may carry Japanese. Everything else (names, used as alt text and in <option>s;
// URLs) has to stay plain, so Japanese there stops the build with a message instead.
const HTML_FIELDS = new Set(['note', 'result']);
const URL_FIELDS = new Set(['image', 'hoverImage', 'imageSource', 'sources', 'spotify', 'link', 'url', 'start']);

/** Applies rubyText to every note and result in a Field Notes data file, and checks the other fields. */
export function withRuby(data, file = '') {
  const walk = (value, keyPath) => {
    if (Array.isArray(value)) return value.map((v, i) => walk(v, `${keyPath}[${i}]`));
    if (value && typeof value === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(value)) {
        if (URL_FIELDS.has(k)) out[k] = v;
        else if (HTML_FIELDS.has(k) && typeof v === 'string') out[k] = rubyText(v, `${file} ${keyPath}.${k}`);
        else out[k] = walk(v, `${keyPath}.${k}`);
      }
      return out;
    }
    if (typeof value === 'string' && /[぀-ヿ㐀-鿿]/.test(value) && !/^(https?:)?\/\//.test(value)) {
      throw new Error(`Field Notes: Japanese in ${file} ${keyPath}, a field that can't show readings. Move it into the note.`);
    }
    return value;
  };
  return walk(data, '');
}

// Japanese Wikipedia articles cited as sources: the label shows the title with readings, then romaji.
// The Sources list builds labels from the article address, so each Japanese title needs an entry here
// (the build stops and names any that's missing).
export const WIKIPEDIA_TITLES = {
  // Chiramune
  'あめふり': ['あめふり', 'Amefuri'],
  'たけふ菊人形': ['たけふ菊[きく]人[にん]形[ぎょう]', 'Takefu Kiku Ningyō'],
  'サヨナラCOLOR': ['サヨナラCOLOR', 'Sayonara COLOR'],
  'スタジオアルタ': ['スタジオアルタ', 'Sutajio Aruta'],
  'ズワイガニ': ['ズワイガニ', 'zuwaigani'],
  'ダイヤモンド (BUMP OF CHICKENの曲)': ['ダイヤモンド (BUMP OF CHICKENの曲[きょく])', 'Daiyamondo (BUMP OF CHICKEN no kyoku)'],
  'ドレミファだいじょーぶ': ['ドレミファだいじょーぶ', 'Doremifa Daijōbu'],
  'ハピリン': ['ハピリン', 'Hapirin'],
  '三国花火大会': ['三[み]国[くに]花[はな]火[び]大[たい]会[かい]', 'Mikuni Hanabi Taikai'],
  '全国高等学校総合体育大会': ['全[ぜん]国[こく]高[こう]等[とう]学[がっ]校[こう]総[そう]合[ごう]体[たい]育[いく]大[たい]会[かい]', 'Zenkoku Kōtō Gakkō Sōgō Taiiku Taikai'],
  '吉野弘': ['吉[よし]野[の]弘[ひろし]', 'Yoshino Hiroshi'],
  '夜のピクニック': ['夜[よる]のピクニック', 'Yoru no Pikunikku'],
  '少年探偵団': ['少[しょう]年[ねん]探[たん]偵[てい]団[だん]', 'Shōnen Tanteidan'],
  '福井フェニックスまつり': ['福[ふく]井[い]フェニックスまつり', 'Fukui Fenikkusu Matsuri'],
  // Ryuo no Oshigoto
  '4四歩パックマン': ['4四[よん]歩[ふ]パックマン', 'yon-yon-fu Pakkuman'],
  'カニ囲い': ['カニ囲[がこ]い', 'kani-gakoi'],
  '二枚落ち': ['二[に]枚[まい]落[お]ち', 'nimai-ochi'],
  '入玉': ['入[にゅう]玉[ぎょく]', 'nyūgyoku'],
  '多伝囲い': ['多[た]伝[でん]囲[がこ]い', 'taden-gakoi'],
  '大阪城公園': ['大[おお]阪[さか]城[じょう]公[こう]園[えん]', 'Ōsaka-jō Kōen'],
  '将棋図巧': ['将[しょう]棋[ぎ]図[ず]巧[こう]', 'Shōgi Zukō'],
  '新進棋士奨励会': ['新[しん]進[しん]棋[き]士[し]奨[しょう]励[れい]会[かい]', 'Shinshin Kishi Shōreikai'],
  '目隠し将棋': ['目[め]隠[かく]し将[しょう]棋[ぎ]', 'mekakushi shōgi'],
  '相掛かり': ['相[あい]掛[が]かり', 'aigakari'],
  '真剣師': ['真[しん]剣[けん]師[し]', 'shinkenshi'],
  '角頭歩戦法': ['角[かく]頭[とう]歩[ふ]戦[せん]法[ぽう]', 'kakutō-fu senpō'],
  '金沢カレー': ['金[かな]沢[ざわ]カレー', 'Kanazawa karē'],
  '金沢弁': ['金[かな]沢[ざわ]弁[べん]', 'Kanazawa-ben'],
  '関西将棋会館': ['関[かん]西[さい]将[しょう]棋[ぎ]会[かい]館[かん]', 'Kansai Shōgi Kaikan'],
  // Volume 3
  'ゴキゲン中飛車': ['ゴキゲン中[なか]飛[び]車[しゃ]', 'Gokigen nakabisha'],
  'とん平焼き': ['とん平[ぺい]焼[や]き', 'tonpei-yaki'],
  '京橋 (大阪市)': ['京[きょう]橋[ばし] (大[おお]阪[さか]市[し])', 'Kyōbashi (Ōsaka-shi)'],
  '合駒': ['合[あい]駒[ごま]', 'aigoma'],
  '将棋会館': ['将[しょう]棋[ぎ]会[かい]館[かん]', 'Shōgi Kaikan'],
  '後手番一手損角換わり': ['後[ご]手[て]番[ばん]一[いっ]手[て]損[ぞん]角[かく]換[が]わり', 'gotteban ittezon kakugawari'],
  '横歩取り8五飛': ['横[よこ]歩[ふ]取[ど]り8五[ご]飛[ひ]', 'yokofudori hachi-go hi'],
  '石田流': ['石[いし]田[だ]流[りゅう]', 'Ishida-ryū'],
  '相振り飛車': ['相[あい]振[ふ]り飛[び]車[しゃ]', 'aifuribisha'],
  '穴熊囲い': ['穴[あな]熊[ぐま]囲[がこ]い', 'anaguma-gakoi'],
  '美濃囲い': ['美[み]濃[の]囲[がこ]い', 'mino-gakoi'],
  '超速3七銀': ['超[ちょう]速[そく]3七[なな]銀[ぎん]', 'chōsoku san-nana gin'],
  // Volume 4
  'ニコニコ生放送': ['ニコニコ生[なま]放[ほう]送[そう]', 'Nikoniko Namahōsō'],
  'パレスサイドビルディング': ['パレスサイドビルディング', 'Paresu Saido Birudingu'],
  'ひねり飛車': ['ひねり飛[び]車[しゃ]', 'hineri-bisha'],
  'マイナビ女子オープン': ['マイナビ女[じょ]子[し]オープン', 'Mainabi Joshi Ōpun'],
  '向かい飛車': ['向[む]かい飛[び]車[しゃ]', 'mukai-bisha'],
  '居飛車穴熊': ['居[い]飛[び]車[しゃ]穴[あな]熊[ぐま]', 'ibisha anaguma'],
  '栄光の架橋': ['栄[えい]光[こう]の架[かけ]橋[はし]', 'Eikō no Kakehashi'],
  '矢倉囲い': ['矢[や]倉[ぐら]囲[がこ]い', 'yagura-gakoi'],
  '角交換四間飛車': ['角[かく]交[こう]換[かん]四[し]間[けん]飛[び]車[しゃ]', 'kakukōkan shikenbisha'],
  '雁木囲い': ['雁[がん]木[ぎ]囲[がこ]い', 'gangi-gakoi'],
  '雁木造': ['雁[がん]木[ぎ]造[づくり]', 'gangi-zukuri'],
  '高美濃囲い': ['高[たか]美[み]濃[の]囲[がこ]い', 'taka-mino-gakoi'],
  '鳩森八幡神社': ['鳩[はとの]森[もり]八[はち]幡[まん]神[じん]社[じゃ]', 'Hatonomori Hachiman Jinja'],
};

/** "Japanese Wikipedia: <title with readings> (romaji)" as HTML, for a Japanese article title. */
export function wikipediaTitleHtml(title) {
  const entry = WIKIPEDIA_TITLES[title];
  if (!entry) {
    if (!/[぀-ヿ㐀-鿿]/.test(title)) return escapeHtml(title);
    throw new Error(`Field Notes sources: add the Japanese Wikipedia title "${title}" to WIKIPEDIA_TITLES in utils/japanese.js, with its readings and romaji.`);
  }
  const [withReadings, romaji] = entry;
  // Escape everything except the bracketed readings, then add the ruby
  return `${rubyText(escapeHtml(withReadings), `WIKIPEDIA_TITLES["${title}"]`)} (${escapeHtml(romaji)})`;
}

export { escapeHtml };
