// VersionB.jsx — Neon Night · Final
// SAM (P1) / KELLY (P2) · 실제 스프라이트 이미지 · 충돌 감지 게임 오버

function VersionB() {
  const [screen, setScreen] = React.useState('title');
  const [character, setCharacter] = React.useState('sam');
  const [words, setWords] = React.useState(['나아가']);
  const [stage, setStage] = React.useState(1);
  const [finalScore, setFinalScore] = React.useState(0);
  const [hitWord, setHitWord] = React.useState('');

  const go = (s) => setScreen(s);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {screen === 'title'      && <VB_Title onStart={() => go('charselect')} />}
      {screen === 'charselect' && <VB_CharSelect onSelect={(c) => { setCharacter(c); go('wordinput'); }} onBack={() => go('title')} />}
      {screen === 'wordinput'  && <VB_WordInput character={character} words={words} setWords={setWords} onStart={() => { setStage(1); setFinalScore(0); go('gamehud'); }} onBack={() => go('charselect')} />}
      {screen === 'gamehud'    && <VB_GameHUD key={stage} character={character} stage={stage} words={words} onGameOver={(sc, w) => { setFinalScore(sc); setHitWord(w); go('gameover'); }} onStageClear={(sc) => { setFinalScore(f => f + sc); if (stage >= 4) { go('gameclear'); } else { setStage(s => s + 1); } }} />}
      {screen === 'gameover'   && <VB_GameOver score={finalScore} stage={stage} character={character} hitWord={hitWord} onRestart={() => { setStage(1); setFinalScore(0); go('gamehud'); }} onHome={() => { setStage(1); go('title'); }} />}
      {screen === 'gameclear'  && <VB_GameClear score={finalScore} character={character} onHome={() => { setStage(1); setFinalScore(0); go('title'); }} />}
    </div>
  );
}

// ─── Title ─────────────────────────────────────────────────────────────
function VB_Title({ onStart }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 80); return () => clearInterval(t); }, []);

  const particles = React.useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    r: 1 + Math.random() * 2.5,
    color: ['#cb59ff', '#00e5ff', '#ff006e', '#fff'][i % 4],
    speed: 0.15 + Math.random() * 0.35,
    phase: Math.random() * Math.PI * 2,
  })), []);

  return (
    <div style={{
      width: '100%', height: '100%', background: '#06000f',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 0 44px', position: 'relative', overflow: 'hidden',
      fontFamily: "'Pretendard JP', sans-serif",
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(203,89,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(203,89,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px' }} />

      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${(p.y + tick * p.speed * 0.05) % 100}%`,
          width: p.r, height: p.r, borderRadius: '50%',
          background: p.color, opacity: 0.35 + Math.sin(tick * 0.05 + p.phase) * 0.2,
          boxShadow: `0 0 ${p.r * 3}px ${p.color}`, zIndex: 1,
        }} />
      ))}

      {/* Top accent bar */}
      <div style={{ width: '100%', height: 3, zIndex: 2, marginTop: 56,
        background: 'linear-gradient(90deg, #cb59ff, #00e5ff, #ff006e, #cb59ff)',
        backgroundSize: '200% 100%' }} />

      {/* Logo */}
      <div style={{ textAlign: 'center', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: '#cb59ff',
          textShadow: '0 0 12px rgba(203,89,255,0.8)', fontFamily: "'Press Start 2P', monospace" }}>WORD DODGE</div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, color: '#fff', letterSpacing: '-0.01em',
            textShadow: '0 0 40px rgba(203,89,255,0.6), 0 0 80px rgba(0,229,255,0.3)',
            fontFamily: "'Press Start 2P', monospace" }}>THE<br />MAD<br />ONES</div>
          <div style={{
            position: 'absolute', top: `${30 + Math.sin(tick * 0.08) * 20}%`,
            left: -4, right: -4, height: 2, background: 'rgba(0,229,255,0.6)',
            opacity: Math.sin(tick * 0.15) > 0.7 ? 0.8 : 0, mixBlendMode: 'screen',
          }} />
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: '#fff', textAlign: 'center' }}>
          가자 지금이야 바로 오늘 밤
        </div>
      </div>

      {/* CTA */}
      <div style={{ width: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12, zIndex: 2 }}>
        <button onClick={onStart} style={{
          width: '100%', padding: '18px',
          background: 'linear-gradient(135deg, #cb59ff 0%, #9b30cf 100%)',
          color: '#fff', border: 'none',
          fontSize: 15, fontWeight: 700, letterSpacing: '0.1em',
          fontFamily: "'Press Start 2P', monospace", cursor: 'pointer',
          boxShadow: '0 0 32px rgba(203,89,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          START GAME
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            transform: `translateX(${Math.sin(tick * 0.04) * 120}%)` }} />
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {['랭킹', '설정'].map(label => (
            <button key={label} style={{
              flex: 1, padding: '12px', background: 'rgba(203,89,255,0.07)',
              border: '1px solid rgba(203,89,255,0.25)', color: 'rgba(255,255,255,0.5)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Char Select ────────────────────────────────────────────────────────
function VB_CharSelect({ onSelect, onBack }) {
  const [idx, setIdx] = React.useState(0);
  const chars = [
    { id: 'sam', name: 'SAM', role: 'P1', accent: '#ff4d4d', glow: 'rgba(255,77,77,0.5)',
      tag: 'DEFAULT RUNNER',
      stats: [{ l: '속도', v: 72 }, { l: '회피', v: 58 }, { l: '체력', v: 85 }],
      desc: '도로 위의 소년',
      palette: ['#5C3A1E', '#4A6080', '#E8C9A0'], unlocked: true,
      img: 'assets/char-sam.png',
    },
    { id: 'kelly', name: 'KELLY', role: 'P2', accent: '#4daaff', glow: 'rgba(77,170,255,0.5)',
      tag: 'LOCKED',
      stats: [{ l: '속도', v: 88 }, { l: '회피', v: 76 }, { l: '체력', v: 62 }],
      desc: '초신성',
      palette: ['#1C2E3A', '#B22222', '#E8C9A0'], unlocked: true,
      img: 'assets/char-kelly.png',
    },
  ];
  const c = chars[idx];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: '#06000f', fontFamily: "'Pretendard JP', sans-serif", color: '#fff' }}>
      {/* BG glow */}
      <div style={{ position: 'absolute', left: '50%', top: '35%', transform: 'translate(-50%,-50%)',
        width: 280, height: 280, borderRadius: '50%',
        background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
        transition: 'background 0.4s', pointerEvents: 'none', zIndex: 0 }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 2, padding: '18px 20px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>◀</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            fontFamily: "'Press Start 2P', monospace", color: '#fff' }}>SELECT</div>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{idx + 1} / {chars.length}</div>
      </div>

      {/* Card */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px 20px 0',
        display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => setIdx(i => (i - 1 + chars.length) % chars.length)} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.4)', fontSize: 18, cursor: 'pointer',
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>◀</button>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 68, height: 96, border: `2px solid ${c.accent}`,
                background: 'rgba(0,0,0,0.5)', overflow: 'hidden',
                boxShadow: `0 0 28px ${c.glow}`, opacity: c.unlocked ? 1 : 0.45,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img src={c.img} alt={c.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
                  imageRendering: 'pixelated',
                }} />
              </div>
              {!c.unlocked && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 28, background: 'rgba(0,0,0,0.5)' }}>🔒</div>
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', color: c.accent,
                textShadow: `0 0 16px ${c.glow}`, fontFamily: "'Press Start 2P', monospace" }}>{c.name}</div>
            </div>
            <div style={{ fontSize: 9, padding: '4px 10px',
              background: c.unlocked ? `${c.accent}22` : 'rgba(255,255,255,0.06)',
              border: `1px solid ${c.unlocked ? c.accent : 'rgba(255,255,255,0.15)'}`,
              color: c.unlocked ? c.accent : 'rgba(255,255,255,0.3)',
              fontFamily: "'Press Start 2P', monospace", letterSpacing: '0.08em' }}>{c.tag}</div>
          </div>

          <button onClick={() => setIdx(i => (i + 1) % chars.length)} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.4)', fontSize: 18, cursor: 'pointer',
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>▶</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', width: 32 }}>{s.l}</div>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.v}%`, background: c.accent,
                  boxShadow: `0 0 6px ${c.glow}`, borderRadius: 2, transition: 'width 0.4s ease' }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.accent, width: 28, textAlign: 'right' }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Desc */}
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7,
          borderLeft: `2px solid ${c.accent}`, paddingLeft: 12 }}>{c.desc}</div>

        {/* Palette */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginRight: 4 }}>COLOR</div>
          {c.palette.map((col, i) => (
            <div key={i} style={{ width: 20, height: 20, background: col, border: '1px solid rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>

      {/* Confirm */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 32px',
        background: 'linear-gradient(0deg, #06000f 70%, transparent 100%)', zIndex: 3 }}>
        <button onClick={() => c.unlocked && onSelect(c.id)} style={{
          width: '100%', padding: '16px',
          background: c.unlocked ? `linear-gradient(135deg, ${c.accent}, ${c.accent}bb)` : 'rgba(255,255,255,0.06)',
          color: c.unlocked ? '#fff' : 'rgba(255,255,255,0.25)',
          border: c.unlocked ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(255,255,255,0.08)',
          fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
          fontFamily: "'Press Start 2P', monospace",
          cursor: c.unlocked ? 'pointer' : 'not-allowed',
          boxShadow: c.unlocked ? `0 0 24px ${c.glow}` : 'none',
        }}>{c.unlocked ? '▶ CONFIRM' : '🔒 LOCKED'}</button>
      </div>
    </div>
  );
}

// ─── Word Input ──────────────────────────────────────────────────────────
function VB_WordInput({ character, words, setWords, onStart, onBack }) {
  const [input, setInput] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const accent = character === 'kelly' ? '#4daaff' : '#cb59ff';
  const MAX = 10;
  const add = () => {
    const t = input.trim();
    if (t && words.length < MAX && !words.includes(t)) { setWords(w => [...w, t]); setInput(''); }
  };
  const presets = ['길 위에서', '애덤', '베벌리', '나에게는 오직 미친 사람들 뿐이다'];

  return (
    <div style={{ width: '100%', height: '100%', background: '#06000f',
      display: 'flex', flexDirection: 'column', color: '#fff',
      fontFamily: "'Pretendard JP', sans-serif", position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(203,89,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(203,89,255,0.03) 1px, transparent 1px)',
        backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '18px 20px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>◀</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>단어 설정</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>장애물이 될 단어를 골라보세요</div>
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: accent }}>{words.length}/{MAX}</div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 2, padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 10,
            letterSpacing: '0.05em', textTransform: 'uppercase' }}>내 단어</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 44 }}>
            {words.map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6,
                background: `${accent}15`, border: `1px solid ${accent}55`,
                padding: '7px 12px', fontFamily: "'Galmuri14', 'Press Start 2P', monospace",
                fontSize: 12, color: accent, boxShadow: `0 0 8px ${accent}22` }}>
                <span>{w}</span>
                <button onClick={() => setWords(ws => ws.filter((_, j) => j !== i))} style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer', fontSize: 13, padding: 0, lineHeight: 1 }}>×</button>
              </div>
            ))}
            {words.length === 0 && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', padding: '10px 0' }}>단어를 추가하세요</div>}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 10,
            letterSpacing: '0.05em', textTransform: 'uppercase' }}>추천 단어</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {presets.map((p, i) => {
              const added = words.includes(p);
              return (
                <button key={i} onClick={() => !added && words.length < MAX && setWords(w => [...w, p])} style={{
                  padding: '7px 12px', background: added ? `${accent}15` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${added ? accent : 'rgba(255,255,255,0.15)'}`,
                  color: added ? accent : 'rgba(255,255,255,0.5)',
                  fontFamily: "'Galmuri14', 'Press Start 2P', monospace",
                  fontSize: 11, cursor: added ? 'default' : 'pointer',
                }}>{added ? '✓ ' : '+ '}{p}</button>
              );
            })}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? accent : 'rgba(255,255,255,0.1)'}`, padding: 16, transition: 'border-color 0.2s' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 10,
            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>직접 입력</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && add()}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              placeholder="단어를 입력하세요" style={{
                flex: 1, background: 'transparent',
                border: 'none', borderBottom: `1px solid ${focused ? accent : 'rgba(255,255,255,0.2)'}`,
                padding: '8px 0', color: '#fff', fontSize: 16,
                fontFamily: "'Pretendard JP', sans-serif", outline: 'none', transition: 'border-color 0.2s' }} />
            <button onClick={add} disabled={!input.trim() || words.length >= MAX} style={{
              background: input.trim() ? accent : 'rgba(255,255,255,0.08)',
              color: '#fff', border: 'none', padding: '8px 16px', fontSize: 15,
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              opacity: (!input.trim() || words.length >= MAX) ? 0.4 : 1,
              boxShadow: input.trim() ? `0 0 12px ${accent}66` : 'none',
              transition: 'all 0.2s' }}>추가</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 36px', position: 'relative', zIndex: 2,
        background: 'linear-gradient(0deg, #06000f 70%, transparent 100%)' }}>
        <button onClick={onStart} disabled={words.length === 0} style={{
          width: '100%', padding: '17px',
          background: words.length > 0 ? `linear-gradient(135deg, ${accent}, ${accent}bb)` : 'rgba(255,255,255,0.06)',
          color: words.length > 0 ? '#fff' : 'rgba(255,255,255,0.2)',
          border: 'none', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em',
          fontFamily: "'Press Start 2P', monospace",
          cursor: words.length > 0 ? 'pointer' : 'not-allowed',
          boxShadow: words.length > 0 ? `0 0 28px ${accent}66` : 'none',
          transition: 'all 0.2s' }}>게임 시작</button>
      </div>
    </div>
  );
}

// ─── Game HUD (충돌 감지 포함) ───────────────────────────────────────────
function VB_GameHUD({ character, stage, words: initialWords, onGameOver, onStageClear }) {
  const cfgs = {
    1: { bg: '#0d1526', road: '#1a2a4a', edge: '#c04020', accent: '#e85c20', label: '고속도로', wordCol: ['#fff','#e85c20','rgba(255,255,255,0.7)'] },
    2: { bg: '#4a9d5f', road: '#5a8a9a', edge: '#6aaa50', accent: '#1a3a5a', label: '운전 면허 시험장', wordCol: ['#1a3a5a','#2e4d6b','#3a6020'] },
    3: { bg: '#06000f', road: '#120020', edge: '#4d0080', accent: '#cb59ff', label: '대학의 밤', wordCol: ['#00e5ff','#cb59ff','#ff006e'] },
    4: { bg: '#0e0905', road: '#1c1008', edge: '#3a2010', accent: '#f5d06a', label: '도서관에서 나오는 길', wordCol: ['#f5d06a','rgba(245,208,106,0.6)','#fff'] },
  };
  const c = cfgs[stage] || cfgs[1];
  const charAccent = character === 'kelly' ? '#4daaff' : c.accent;
  const charImg = character === 'kelly' ? 'assets/char-kelly.png' : 'assets/char-sam.png';
  const ROAD_MARGIN = 20;
  const SPEED_MULT = { 1: 1.0, 2: 1.4, 3: 1.8, 4: 2.3 };
  const speedMult = SPEED_MULT[stage] || 1.0;
  const SPAWN_INTERVAL = { 1: [1500, 600], 2: [1100, 500], 3: [800, 400], 4: [550, 300] };
  const [spawnBase, spawnRand] = SPAWN_INTERVAL[stage] || SPAWN_INTERVAL[1];
  const STAGE_TIME = 20;

  const CHAR_W = 32;
  const CHAR_H = 48;

  const [score, setScore] = React.useState(0);
  const [charX, setCharX] = React.useState(0); // road center offset
  const [paused, setPaused] = React.useState(false);
  const [words, setWords] = React.useState([]);
  const [dashOff, setDashOff] = React.useState(0);
  const [frame, setFrame] = React.useState(0);
  const [addWordOpen, setAddWordOpen] = React.useState(false);
  const [newWord, setNewWord] = React.useState('');
  const [pool, setPool] = React.useState(initialWords && initialWords.length > 0 ? initialWords : ['나아가']);
  const [hit, setHit] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(STAGE_TIME);
  const [stageClear, setStageClear] = React.useState(false);
  const [roadW, setRoadW] = React.useState(335);
  const nextId = React.useRef(0);
  const gameOverFired = React.useRef(false);
  const stageClearFired = React.useRef(false);
  const timerRef = React.useRef(STAGE_TIME);
  const scoreRef = React.useRef(0);
  const roadRef = React.useRef(335);

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const w = Math.max(260, containerRef.current.clientWidth - ROAD_MARGIN * 2);
      roadRef.current = w;
      setRoadW(w);
    }
  }, []);

  React.useEffect(() => { scoreRef.current = score; }, [score]);

  React.useEffect(() => {
    if (paused || stageClearFired.current) return;
    const t = setInterval(() => {
      if (gameOverFired.current || stageClearFired.current) return;
      timerRef.current -= 1;
      setTimeLeft(timerRef.current);
      if (timerRef.current <= 0) {
        stageClearFired.current = true;
        setStageClear(true);
        setTimeout(() => onStageClear(scoreRef.current), 1200);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [paused]);

  // Spawn words
  React.useEffect(() => {
    if (paused || pool.length === 0) return;
    const t = setInterval(() => {
      const w = pool[Math.floor(Math.random() * pool.length)];
      const x = (Math.random() * (roadRef.current - 60)) - (roadRef.current / 2 - 30);
      const fs = Math.round(12 * (0.7 + Math.random() * 0.5));
      setWords(ws => [...ws, { id: nextId.current++, text: w, x, y: -4, spd: (0.3 + Math.random() * 0.25) * speedMult, ci: Math.floor(Math.random() * 3), fs }]);
    }, spawnBase + Math.random() * spawnRand);
    return () => clearInterval(t);
  }, [paused, pool]);

  // Game loop + collision detection
  React.useEffect(() => {
    if (paused || gameOverFired.current || stageClearFired.current) return;
    const t = setInterval(() => {
      setScore(s => s + 2);
      setDashOff(d => (d + 3) % 60);
      setFrame(f => f + 1);

      setWords(ws => {
        const next = ws.map(w => ({ ...w, y: w.y + w.spd * 1.6 })).filter(w => w.y < 106);

        const containerH = containerRef.current?.clientHeight || 768;
        const charTopPct = ((containerH - 72 - CHAR_H) / containerH) * 100;
        const charBotPct = ((containerH - 72) / containerH) * 100;

        for (const w of next) {
          if (gameOverFired.current || stageClearFired.current) break;
          if (w.y >= charTopPct - 3 && w.y <= charBotPct + 3) {
            const dx = Math.abs(charX - w.x);
            if (dx < CHAR_W / 2 + 20) {
              gameOverFired.current = true;
              setHit(true);
              setTimeout(() => onGameOver(score, w.text), 400);
            }
          }
        }
        return next;
      });
    }, 50);
    return () => clearInterval(t);
  }, [paused, charX, score]);

  const move = (e) => {
    if (addWordOpen || gameOverFired.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
    const max = roadRef.current / 2 - 24;
    setCharX(cx => x < rect.width / 2 ? Math.max(-max, cx - 22) : Math.min(max, cx + 22));
  };

  const bounce = Math.sin(frame * 0.3) * 2;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: c.bg, userSelect: 'none',
      // 충돌 시 빨간 플래시
      boxShadow: hit ? 'inset 0 0 60px rgba(255,50,50,0.8)' : 'none',
      transition: 'box-shadow 0.1s',
    }}
      onMouseDown={move} onTouchStart={move}>

      {/* Grid overlay (stage 3) */}
      {stage === 3 && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(203,89,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(203,89,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      )}

      {/* Road */}
      <div style={{ position: 'absolute', left: '50%', top: 0, width: roadW, height: '100%',
        transform: 'translateX(-50%)', background: c.road,
        borderLeft: `2px solid ${c.edge}`, borderRight: `2px solid ${c.edge}`,
        boxShadow: stage === 3 ? '0 0 30px rgba(77,0,128,0.6)' : 'none' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            width: 3, height: 24, borderRadius: 2,
            background: stage === 3 ? 'rgba(0,229,255,0.25)' : 'rgba(255,255,255,0.18)',
            top: `${((i * 60 + dashOff) % 720) - 24}px` }} />
        ))}
      </div>

      {/* Falling words */}
      {words.map(w => (
        <div key={w.id} style={{
          position: 'absolute', left: `calc(50% + ${w.x}px)`, top: `${w.y}%`,
          transform: 'translateX(-50%)',
          fontFamily: "'Galmuri14', 'Press Start 2P', monospace",
          fontSize: w.fs || 12, color: c.wordCol[w.ci], pointerEvents: 'none', zIndex: 5, whiteSpace: 'nowrap',
          textShadow: stage === 3 ? `0 0 10px ${c.wordCol[w.ci]}, 0 0 20px ${c.wordCol[w.ci]}66` : 'none',
        }}>{w.text}</div>
      ))}

      {/* Character sprite */}
      <div style={{
        position: 'absolute', bottom: 72, left: `calc(50% + ${charX}px)`,
        transform: 'translateX(-50%)', zIndex: 8, transition: 'left 0.1s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          width: CHAR_W, height: CHAR_H,
          border: 'none',
          background: 'transparent', overflow: 'hidden',
          boxShadow: 'none',
          marginBottom: bounce,
          position: 'relative',
        }}>
          <img src={charImg} alt={character} style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            imageRendering: 'pixelated',
          }} />
        </div>
      </div>

      {/* HUD top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 14px 10px',
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', gap: 8, zIndex: 10,
        borderBottom: `1px solid ${c.accent}33` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: c.accent,
            border: `1px solid ${c.accent}55`, padding: '3px 6px' }}>{c.label}</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: `${c.accent}bb`, paddingLeft: 2 }}>
            {Math.max(0, timeLeft)}s
          </div>
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: '#fff' }}>
          {score.toLocaleString()}<span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>m</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setPaused(p => !p); }} style={{
          background: 'none', border: `1px solid rgba(255,255,255,0.2)`,
          color: '#fff', fontSize: 8, padding: '4px 8px',
          fontFamily: "'Press Start 2P', monospace", cursor: 'pointer' }}>{paused ? '▶' : '⏸'}</button>
      </div>

      {/* Word pool */}
      <div style={{ position: 'absolute', top: 46, left: 0, right: 0,
        display: 'flex', gap: 5, padding: '5px 12px', flexWrap: 'wrap', zIndex: 9, pointerEvents: 'none' }}>
        {pool.map((w, i) => (
          <span key={i} style={{ fontFamily: "'Galmuri14', 'Press Start 2P', monospace", fontSize: 7,
            color: `${c.accent}77`, border: `1px solid ${c.accent}22`, padding: '2px 5px' }}>{w}</span>
        ))}
      </div>

      {/* Add word btn */}
      <button onClick={(e) => { e.stopPropagation(); setPaused(true); setAddWordOpen(true); }} style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        background: `${c.accent}15`, border: `1px solid ${c.accent}88`,
        color: c.accent, fontFamily: "'Press Start 2P', monospace",
        fontSize: 7, padding: '7px 14px', cursor: 'pointer', zIndex: 10, whiteSpace: 'nowrap',
        boxShadow: `0 0 10px ${c.accent}33` }}>+ WORD</button>

      {/* Tap hints */}
      <div style={{ position: 'absolute', bottom: 54, left: 14, fontFamily: "'Press Start 2P', monospace",
        fontSize: 10, color: `${c.accent}33`, pointerEvents: 'none', zIndex: 6 }}>◀</div>
      <div style={{ position: 'absolute', bottom: 54, right: 14, fontFamily: "'Press Start 2P', monospace",
        fontSize: 10, color: `${c.accent}33`, pointerEvents: 'none', zIndex: 6 }}>▶</div>

      {/* Add word overlay */}
      {addWordOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(6,0,15,0.92)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 14, padding: '0 24px' }} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize: 9, color: c.accent, letterSpacing: '0.12em', fontFamily: "'Press Start 2P', monospace" }}>단어 추가</div>
          <input autoFocus value={newWord} onChange={e => setNewWord(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { const t = newWord.trim(); if (t && !pool.includes(t)) setPool(p => [...p, t]); setNewWord(''); setAddWordOpen(false); setPaused(false); }}}
            placeholder="단어 입력..." style={{
              width: '100%', background: 'transparent',
              border: 'none', borderBottom: `2px solid ${c.accent}`,
              padding: '10px 0', color: '#fff', fontSize: 16,
              fontFamily: "'Pretendard JP', sans-serif", outline: 'none' }} />
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <button onClick={() => { const t = newWord.trim(); if (t && !pool.includes(t)) setPool(p => [...p, t]); setNewWord(''); setAddWordOpen(false); setPaused(false); }} style={{
              flex: 1, background: c.accent, color: '#fff', border: 'none', padding: '13px',
              fontFamily: "'Press Start 2P', monospace", fontSize: 9, cursor: 'pointer',
              boxShadow: `0 0 16px ${c.accent}55` }}>추가</button>
            <button onClick={() => { setAddWordOpen(false); setPaused(false); }} style={{
              flex: 1, background: 'transparent', color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.15)', padding: '13px',
              fontFamily: "'Press Start 2P', monospace", fontSize: 9, cursor: 'pointer' }}>취소</button>
          </div>
        </div>
      )}

      {/* Pause overlay */}
      {paused && !addWordOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(6,0,15,0.85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
          fontFamily: "'Press Start 2P', monospace" }}>
          <div style={{ fontSize: 20, color: '#fff', textShadow: `0 0 20px ${c.accent}` }}>PAUSED</div>
          <button onClick={() => setPaused(false)} style={{
            background: c.accent, color: '#fff', border: 'none', padding: '14px 32px',
            fontFamily: "'Press Start 2P', monospace", fontSize: 10, cursor: 'pointer',
            boxShadow: `0 0 24px ${c.accent}88` }}>RESUME</button>
          <button onClick={() => { gameOverFired.current = true; onGameOver(score, ''); }} style={{
            background: 'transparent', color: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.15)', padding: '10px 24px',
            fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: 'pointer' }}>QUIT</button>
        </div>
      )}

      {stageClear && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 25, background: 'rgba(6,0,15,0.9)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
          fontFamily: "'Press Start 2P', monospace", pointerEvents: 'none' }}>
          <div style={{ fontSize: 9, color: '#f5d06a', letterSpacing: '0.15em' }}>STAGE {stage}</div>
          <div style={{ fontSize: 24, color: c.accent, textShadow: `0 0 28px ${c.accent}` }}>CLEAR!</div>
          {stage < 4 && <div style={{ marginTop: 8, fontSize: 8, color: 'rgba(255,255,255,0.45)' }}>STAGE {stage + 1} ▶</div>}
        </div>
      )}
    </div>
  );
}

// ─── Game Over ────────────────────────────────────────────────────────────
function VB_GameOver({ score, stage, character, hitWord, onRestart, onHome }) {
  const accents = { 1: '#e85c20', 2: '#7aaa60', 3: '#cb59ff', 4: '#f5d06a' };
  const accent = accents[stage] || '#cb59ff';
  const charName = character === 'kelly' ? 'KELLY' : 'SAM';
  const charImg = character === 'kelly' ? 'assets/char-kelly.png' : 'assets/char-sam.png';
  const charAccent = character === 'kelly' ? '#4daaff' : '#ff4d4d';
  const [animate, setAnimate] = React.useState(false);
  const [flash, setFlash] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setFlash(false), 400);
    setTimeout(() => setAnimate(true), 600);
  }, []);

  const stats = [
    { l: '총 거리', v: `${(score || 0).toLocaleString()}m`, main: true },
    { l: '최고 스테이지', v: `${stage} / 4` },
    { l: '단어 회피', v: `${Math.floor((score || 0) / 18)}회` },
    { l: '잡힌 단어', v: hitWord || '—' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: '#06000f',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      padding: '48px 24px 40px', color: '#fff', fontFamily: "'Pretendard JP', sans-serif",
      position: 'relative', overflow: 'hidden' }}>

      {flash && <div style={{ position: 'absolute', inset: 0, background: '#ff2222', opacity: 0.5, zIndex: 20, pointerEvents: 'none' }} />}

      {/* Scan lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)' }} />

      {/* Accent glow */}
      <div style={{ position: 'absolute', left: '50%', top: '25%', transform: 'translate(-50%,-50%)',
        width: 240, height: 240, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Top block */}
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: accent,
          letterSpacing: '0.15em', marginBottom: 16 }}>STAGE {stage} OVER</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 26, color: '#FF4242',
          textShadow: '0 0 28px rgba(255,66,66,0.8)', lineHeight: 1.2 }}>GAME<br />OVER</div>

        {/* Character sprite (knocked over) */}
        <div style={{ margin: '16px auto 8px',
          width: 56, height: 72,
          border: `2px solid ${charAccent}`,
          background: 'rgba(0,0,0,0.4)',
          overflow: 'hidden',
          boxShadow: `0 0 20px rgba(255,50,50,0.5)`,
          opacity: 0.6,
          filter: 'grayscale(0.5) brightness(0.7)',
        }}>
          <img src={charImg} alt={charName} style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            imageRendering: 'pixelated',
            transform: 'rotate(-90deg) scaleX(-1)',
            transformOrigin: 'center center',
          }} />
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
          {charName}이 붙잡혔다
        </div>
        {hitWord && (
          <div style={{ marginTop: 8, display: 'inline-block',
            fontFamily: "'Galmuri14', 'Press Start 2P', monospace",
            fontSize: 13, color: '#FF4242', padding: '4px 10px',
            border: '1px solid rgba(255,66,66,0.4)',
            textShadow: '0 0 10px rgba(255,66,66,0.6)',
            background: 'rgba(255,66,66,0.08)' }}>
            「{hitWord}」에 맞았다
          </div>
        )}
      </div>

      {/* Stats card */}
      <div style={{ width: '100%', background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${accent}44`, padding: '20px', zIndex: 1 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: i > 0 ? '10px 0 0' : '0 0 14px',
            borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            <div style={{ fontSize: s.main ? 12 : 11,
              color: s.main ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)',
              fontWeight: s.main ? 600 : 500 }}>{s.l}</div>
            <div style={{
              fontSize: s.main ? 26 : 13, fontWeight: s.main ? 800 : 600,
              color: i === 3 && hitWord ? '#FF4242' : (s.main ? '#fff' : 'rgba(255,255,255,0.6)'),
              textShadow: s.main ? `0 0 14px ${accent}` : (i === 3 && hitWord ? '0 0 8px rgba(255,66,66,0.6)' : 'none'),
              fontFamily: s.main ? "'Press Start 2P', monospace" : (i === 3 && hitWord ? "'Galmuri14', 'Press Start 2P', monospace" : 'inherit'),
              transform: animate ? 'translateX(0)' : 'translateX(20px)',
              opacity: animate ? 1 : 0, transition: `all 0.4s ease ${i * 0.1}s`,
            }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
        <button onClick={onRestart} style={{
          width: '100%', padding: '16px',
          background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
          color: '#fff', border: 'none',
          fontSize: 14, fontWeight: 700, letterSpacing: '0.08em',
          fontFamily: "'Press Start 2P', monospace",
          cursor: 'pointer', boxShadow: `0 0 28px ${accent}55` }}>↺ 다시 시작</button>
        <button onClick={onHome} style={{
          width: '100%', padding: '13px',
          background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(255,255,255,0.12)',
          fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>⌂ 타이틀</button>
      </div>
    </div>
  );
}

// ─── Game Clear ───────────────────────────────────────────────────────────
function VB_GameClear({ score, character, onHome }) {
  const charName = character === 'kelly' ? 'KELLY' : 'SAM';
  const charImg = character === 'kelly' ? 'assets/char-kelly.png' : 'assets/char-sam.png';
  const charAccent = character === 'kelly' ? '#4daaff' : '#ff4d4d';
  const [tick, setTick] = React.useState(0);
  const [animate, setAnimate] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 60);
    setTimeout(() => setAnimate(true), 400);
    return () => clearInterval(t);
  }, []);
  const particles = React.useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    r: 1 + Math.random() * 3,
    color: ['#cb59ff', '#00e5ff', '#ff006e', '#f5d06a', '#fff'][i % 5],
    speed: 0.2 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2,
  })), []);

  return (
    <div style={{ width: '100%', height: '100%', background: '#06000f',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      padding: '48px 24px 40px', color: '#fff', fontFamily: "'Pretendard JP', sans-serif",
      position: 'relative', overflow: 'hidden' }}>

      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p.x}%`,
          top: `${(p.y + tick * p.speed * 0.05) % 100}%`,
          width: p.r, height: p.r, borderRadius: '50%',
          background: p.color, opacity: 0.5 + Math.sin(tick * 0.05 + p.phase) * 0.3,
          boxShadow: `0 0 ${p.r * 4}px ${p.color}`, zIndex: 0,
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)' }} />

      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: '#f5d06a',
          letterSpacing: '0.15em', marginBottom: 16 }}>ALL STAGES CLEAR</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 26, color: '#cb59ff',
          textShadow: '0 0 28px rgba(203,89,255,0.9), 0 0 60px rgba(0,229,255,0.4)', lineHeight: 1.2 }}>
          GAME<br />CLEAR
        </div>
        <div style={{ margin: '16px auto 8px', width: 56, height: 72,
          border: `2px solid ${charAccent}`, background: 'rgba(0,0,0,0.4)', overflow: 'hidden',
          boxShadow: `0 0 24px ${charAccent}88` }}>
          <img src={charImg} alt={charName} style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
            imageRendering: 'pixelated' }} />
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{charName} escaped</div>
      </div>

      <div style={{ width: '100%', background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(203,89,255,0.4)', padding: '20px', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>총 점수</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff',
            textShadow: '0 0 14px #cb59ff', fontFamily: "'Press Start 2P', monospace",
            transform: animate ? 'translateX(0)' : 'translateX(20px)',
            opacity: animate ? 1 : 0, transition: 'all 0.5s ease' }}>
            {(score || 0).toLocaleString()}<span style={{ fontSize: 12 }}>m</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{ flex: 1, height: 4,
              background: 'linear-gradient(90deg, #cb59ff, #00e5ff)',
              boxShadow: '0 0 6px rgba(203,89,255,0.6)',
              opacity: animate ? 1 : 0, transition: `opacity 0.3s ease ${s * 0.1}s` }} />
          ))}
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textAlign: 'center',
          fontFamily: "'Press Start 2P', monospace" }}>STAGE 1 - 4 COMPLETE</div>
      </div>

      <div style={{ width: '100%', zIndex: 2 }}>
        <button onClick={onHome} style={{
          width: '100%', padding: '16px',
          background: 'linear-gradient(135deg, #cb59ff, #9b30cf)',
          color: '#fff', border: 'none',
          fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
          fontFamily: "'Press Start 2P', monospace",
          cursor: 'pointer', boxShadow: '0 0 28px rgba(203,89,255,0.55)' }}>⌂ 타이틀로</button>
      </div>
    </div>
  );
}

Object.assign(window, { VersionB });
