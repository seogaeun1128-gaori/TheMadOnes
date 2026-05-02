// Version A — Classic Pixel Style
// Dawn Highway mood, warm orange/navy palette, classic 16-bit game UI

function VersionA({ onNavigate }) {
  const [screen, setScreen] = React.useState('title');
  const [character, setCharacter] = React.useState('sam');
  const [words, setWords] = React.useState(['나아가']);
  const [stage, setStage] = React.useState(1);
  const [finalScore, setFinalScore] = React.useState(0);

  const go = (s) => setScreen(s);

  return (
    <div style={{ width: '100%', height: '100%', fontFamily: "'Press Start 2P', monospace" }}>
      {screen === 'title' && <VA_Title onStart={() => go('charselect')} />}
      {screen === 'charselect' && <VA_CharSelect onSelect={(c) => { setCharacter(c); go('wordinput'); }} onBack={() => go('title')} />}
      {screen === 'wordinput' && <VA_WordInput character={character} words={words} setWords={setWords} onStart={() => go('gamehud')} onBack={() => go('charselect')} />}
      {screen === 'gamehud' && <VA_GameHUD character={character} stage={stage} onGameOver={(sc) => { setFinalScore(sc); go('gameover'); }} />}
      {screen === 'gameover' && <VA_GameOver score={finalScore} stage={stage} character={character} onRestart={() => go('gamehud')} onHome={() => go('title')} />}
    </div>
  );
}

// ─── Title ───────────────────────────────────────────────────────────
function VA_Title({ onStart }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 600);
    return () => clearInterval(t);
  }, []);

  const stars = React.useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    x: (i * 137.5) % 100, y: (i * 73.1) % 65,
    s: 1 + (i % 3), op: 0.3 + (i % 5) * 0.12,
  })), []);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg, #050d1f 0%, #0d1526 45%, #1a1a2e 70%, #2a1520 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      padding: '56px 24px 44px', position: 'relative', overflow: 'hidden',
    }}>
      {stars.map((s, i) => (
        <div key={i} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
          width: s.s, height: s.s, background: '#fff', borderRadius: '50%', opacity: s.op + Math.sin(tick * 0.5 + i) * 0.1 }} />
      ))}

      {/* Horizon glow */}
      <div style={{ position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)',
        width: 280, height: 80,
        background: 'radial-gradient(ellipse, rgba(232,92,32,0.4) 0%, rgba(192,64,32,0.15) 60%, transparent 80%)' }} />

      {/* Road */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%',
          background: 'linear-gradient(180deg, rgba(26,42,74,0) 0%, #1a2a4a 40%, #131f38 100%)' }} />
        <div style={{ position: 'absolute', bottom: '30%', left: 0, right: 0, height: 2, background: '#e85c20', opacity: 0.5 }} />
        {[0,1,2,3,4,5].map(i => (
          <div key={i} style={{ position: 'absolute', bottom: '10%',
            left: `${i * 18 - 2}%`, width: '10%', height: 3,
            background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
        ))}
      </div>

      {/* Logo */}
      <div style={{ textAlign: 'center', zIndex: 2, marginTop: 20 }}>
        <div style={{ fontSize: 9, color: '#e85c20', letterSpacing: '0.2em', marginBottom: 10, opacity: 0.9 }}>
          ENDLESS RUNNER
        </div>
        <div style={{ fontSize: 26, color: '#ffffff', lineHeight: 1.25,
          textShadow: '0 0 30px rgba(232,92,32,0.7), 0 2px 0 rgba(0,0,0,0.5)',
          letterSpacing: '0.03em' }}>
          THE<br />MAD ONES
        </div>
        <div style={{ marginTop: 14, fontSize: 14, color: '#fff', textAlign: 'center' }}>
          가자 지금이야 바로 오늘 밤
        </div>
      </div>

      {/* Runner silhouette */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div style={{
          width: 52, height: 68, margin: '0 auto',
          border: '2px solid rgba(232,92,32,0.6)',
          background: 'linear-gradient(180deg, rgba(92,58,30,0.5) 0%, rgba(74,96,128,0.5) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
          boxShadow: '0 0 20px rgba(232,92,32,0.3)',
        }}>🏃</div>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>SAM</div>
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 2 }}>
        <button onClick={onStart} style={{
          width: '100%', padding: '15px',
          background: '#e85c20', color: '#fff', border: '3px solid #fff',
          fontSize: 13, fontFamily: "'Press Start 2P', monospace", cursor: 'pointer',
          letterSpacing: '0.05em', boxShadow: '0 5px 0 #8B2A00',
          transition: 'transform 0.08s, box-shadow 0.08s',
        }}
          onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = 'none'; }}
          onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 5px 0 #8B2A00'; }}
        >▶ START</button>
        <div style={{ display: 'flex', gap: 8 }}>
          {['SCORES', 'SETTINGS'].map(label => (
            <button key={label} style={{
              flex: 1, padding: '10px', background: 'transparent',
              color: 'rgba(255,255,255,0.5)', border: '2px solid rgba(255,255,255,0.18)',
              fontSize: 8, fontFamily: "'Press Start 2P', monospace", cursor: 'pointer',
            }}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Char Select ─────────────────────────────────────────────────────
function VA_CharSelect({ onSelect, onBack }) {
  const [selected, setSelected] = React.useState('sam');
  const chars = [
    { id: 'sam', name: 'SAM', role: 'P1', border: '#C0392B', glow: 'rgba(192,57,43,0.45)',
      bg: 'linear-gradient(160deg,#2a1a10,#3a2218)', colors: ['#5C3A1E','#4A6080','#E8C9A0'], unlocked: true,
      desc: ['갈색 머리','데님 후디'], emoji: '🏃' },
    { id: 'kelly', name: 'KELLY', role: 'P2', border: '#2471A3', glow: 'rgba(36,113,163,0.45)',
      bg: 'linear-gradient(160deg,#0d1a26,#1a2a3a)', colors: ['#1C2E3A','#B22222','#E8C9A0'], unlocked: false,
      desc: ['검은 머리','파란 재킷'], emoji: '🔒' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: '#0d1526',
      display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <div style={{ padding: '18px 20px 14px', borderBottom: '2px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
          fontSize: 14, cursor: 'pointer', fontFamily: "'Press Start 2P', monospace" }}>◀</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#e85c20', letterSpacing: '0.12em' }}>CHARACTER SELECT</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', marginTop: 5, fontFamily: "'Pretendard JP', sans-serif", fontWeight: 500 }}>가자 지금이야 바로 오늘 밤</div>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 12, padding: '16px 14px' }}>
        {chars.map(c => (
          <div key={c.id} onClick={() => c.unlocked && setSelected(c.id)}
            style={{ flex: 1, background: c.bg, border: `3px solid ${selected === c.id ? c.border : 'rgba(255,255,255,0.1)'}`,
              boxShadow: selected === c.id ? `0 0 24px ${c.glow}` : 'none',
              display: 'flex', flexDirection: 'column', cursor: c.unlocked ? 'pointer' : 'not-allowed',
              opacity: c.unlocked ? 1 : 0.5, position: 'relative', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
            {!c.unlocked && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                fontSize: 28 }}>🔒</div>
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 10, padding: '20px 10px' }}>
              <div style={{ width: 68, height: 96, border: `2px solid ${c.border}`,
                background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 42, boxShadow: `inset 0 0 12px rgba(0,0,0,0.4)`, overflow: 'visible' }}>{c.emoji}</div>
              <div style={{ textAlign: 'center', fontSize: 7, color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.9, fontFamily: "'Pretendard JP', sans-serif" }}>
                {c.desc.map((d, i) => <div key={i}>{d}</div>)}
              </div>
            </div>
            <div style={{ padding: '10px 10px 12px', borderTop: `2px solid ${c.border}`, background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: c.border }}>{c.name}</span>
                <span style={{ fontSize: 7, padding: '2px 5px', border: `1px solid ${c.border}`, color: c.border }}>{c.role}</span>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {c.colors.map((col, i) => (
                  <div key={i} style={{ width: 16, height: 16, background: col, border: '1px solid rgba(255,255,255,0.15)' }} />
                ))}
              </div>
            </div>
            {selected === c.id && c.unlocked && (
              <div style={{ position: 'absolute', top: 8, right: 8, background: c.border,
                color: '#fff', fontSize: 7, padding: '3px 5px' }}>✓ 선택</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '0 14px 32px' }}>
        <button onClick={() => onSelect(selected)} style={{
          width: '100%', padding: '15px', background: '#0066FF', color: '#fff',
          border: '3px solid rgba(255,255,255,0.3)', fontSize: 11,
          fontFamily: "'Press Start 2P', monospace", cursor: 'pointer',
          letterSpacing: '0.05em', boxShadow: '0 4px 0 #003E9C',
        }}>▶ CONFIRM</button>
      </div>
    </div>
  );
}

// ─── Word Input ───────────────────────────────────────────────────────
function VA_WordInput({ character, words, setWords, onStart, onBack }) {
  const [input, setInput] = React.useState('');
  const border = character === 'kelly' ? '#2471A3' : '#C0392B';
  const MAX = 10;
  const add = () => {
    const t = input.trim();
    if (t && words.length < MAX && !words.includes(t)) { setWords(w => [...w, t]); setInput(''); }
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#0d1526',
      display: 'flex', flexDirection: 'column', color: '#fff', fontFamily: "'Pretendard JP', sans-serif" }}>
      <div style={{ padding: '18px 20px 14px', borderBottom: '2px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,0.5)', fontSize: 16, cursor: 'pointer' }}>◀</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: '#e85c20', letterSpacing: '0.1em' }}>WORD INPUT</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>장애물로 쓰일 단어를 입력하세요</div>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ flex: 1, padding: '16px 20px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>단어 큐</span>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: border }}>{words.length}/{MAX}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 80 }}>
          {words.map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.06)', border: `1px solid ${border}`,
              padding: '7px 10px', fontFamily: "'Galmuri14', 'Press Start 2P', monospace", fontSize: 11 }}>
              <span>{w}</span>
              <button onClick={() => setWords(ws => ws.filter((_, j) => j !== i))} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer', fontSize: 12, padding: 0, lineHeight: 1 }}>×</button>
            </div>
          ))}
          {words.length === 0 && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', padding: '10px 0' }}>단어를 추가하세요</div>}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>새 단어 추가</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
              placeholder="단어 입력..." style={{
                flex: 1, background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${input ? border : 'rgba(255,255,255,0.15)'}`,
                borderRadius: 6, padding: '10px 12px', color: '#fff', fontSize: 15,
                fontFamily: "'Pretendard JP', sans-serif", outline: 'none' }} />
            <button onClick={add} disabled={!input.trim() || words.length >= MAX} style={{
              background: border, color: '#fff', border: 'none', borderRadius: 6,
              padding: '10px 16px', fontSize: 18, cursor: 'pointer',
              opacity: (!input.trim() || words.length >= MAX) ? 0.4 : 1 }}>+</button>
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
          입력한 단어들이 위에서 아래로 떨어집니다. 피해서 달리세요!
        </div>
      </div>

      <div style={{ padding: '0 20px 36px' }}>
        <button onClick={onStart} disabled={words.length === 0} style={{
          width: '100%', padding: '15px',
          background: words.length > 0 ? '#e85c20' : 'rgba(255,255,255,0.08)',
          color: words.length > 0 ? '#fff' : 'rgba(255,255,255,0.25)',
          border: words.length > 0 ? '3px solid #fff' : '3px solid rgba(255,255,255,0.1)',
          fontFamily: "'Press Start 2P', monospace", fontSize: 12,
          cursor: words.length > 0 ? 'pointer' : 'not-allowed',
          boxShadow: words.length > 0 ? '0 4px 0 #8B2A00' : 'none',
          letterSpacing: '0.05em',
        }}>▶ GAME START</button>
      </div>
    </div>
  );
}

// ─── Game HUD ─────────────────────────────────────────────────────────
function VA_GameHUD({ character, stage, onGameOver }) {
  const cfgs = {
    1: { bg: '#0d1526', road: '#1a2a4a', edge: '#2a3a5a', dash: 'rgba(255,255,255,0.18)',
         accent: '#e85c20', label: 'STAGE 1', wordCol: ['#fff','#e85c20','rgba(255,255,255,0.7)'] },
    2: { bg: '#87ceeb', road: '#8abcd4', edge: '#6aaa50', dash: 'rgba(255,255,255,0.5)',
         accent: '#1a3a5a', label: 'STAGE 2', wordCol: ['#1a3a5a','#2e4d6b','#3a6020'] },
    3: { bg: '#0a0015', road: '#1a0030', edge: '#2d0050', dash: 'rgba(0,229,255,0.3)',
         accent: '#cb59ff', label: 'STAGE 3', wordCol: ['#00e5ff','#cb59ff','#ff006e'] },
    4: { bg: '#0e0905', road: '#1c1008', edge: '#3a2010', dash: 'rgba(245,208,106,0.25)',
         accent: '#f5d06a', label: 'STAGE 4', wordCol: ['#f5d06a','rgba(245,208,106,0.6)','#fff'] },
  };
  const c = cfgs[stage] || cfgs[1];
  const charBorder = character === 'kelly' ? '#2471A3' : '#e85c20';
  const ROAD = 196;

  const [score, setScore] = React.useState(0);
  const [charX, setCharX] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [words, setWords] = React.useState([]);
  const [dashOff, setDashOff] = React.useState(0);
  const [frame, setFrame] = React.useState(0);
  const [addWordOpen, setAddWordOpen] = React.useState(false);
  const [newWord, setNewWord] = React.useState('');
  const [pool, setPool] = React.useState(['나아가']);
  const nextId = React.useRef(0);

  React.useEffect(() => {
    if (paused || pool.length === 0) return;
    const t = setInterval(() => {
      const w = pool[Math.floor(Math.random() * pool.length)];
      const x = (Math.random() * (ROAD - 60)) - (ROAD / 2 - 30);
      setWords(ws => [...ws, { id: nextId.current++, text: w, x, y: -4, spd: 0.28 + Math.random() * 0.22, ci: Math.floor(Math.random() * 3) }]);
    }, 1600 + Math.random() * 700);
    return () => clearInterval(t);
  }, [paused, pool]);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setScore(s => s + 2);
      setDashOff(d => (d + 3) % 60);
      setFrame(f => f + 1);
      setWords(ws => ws.map(w => ({ ...w, y: w.y + w.spd * 1.5 })).filter(w => w.y < 106));
    }, 50);
    return () => clearInterval(t);
  }, [paused]);

  const move = (e) => {
    if (addWordOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
    const max = ROAD / 2 - 26;
    setCharX(cx => x < rect.width / 2 ? Math.max(-max, cx - 22) : Math.min(max, cx + 22));
  };

  const bounce = Math.sin(frame * 0.3) * 2;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: c.bg, userSelect: 'none' }}
      onMouseDown={move} onTouchStart={move}>

      {/* Road */}
      <div style={{ position: 'absolute', left: '50%', top: 0, width: ROAD, height: '100%',
        transform: 'translateX(-50%)', background: c.road,
        borderLeft: `3px solid ${c.edge}`, borderRight: `3px solid ${c.edge}` }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            width: 4, height: 26, background: c.dash, borderRadius: 2,
            top: `${((i * 60 - dashOff + 720) % 720) - 26}px` }} />
        ))}
      </div>

      {/* Falling words */}
      {words.map(w => (
        <div key={w.id} style={{ position: 'absolute', left: `calc(50% + ${w.x}px)`, top: `${w.y}%`,
          transform: 'translateX(-50%)', fontFamily: "'Galmuri14', 'Press Start 2P', monospace",
          fontSize: 12, color: c.wordCol[w.ci], pointerEvents: 'none', zIndex: 5, whiteSpace: 'nowrap',
          textShadow: stage === 3 ? `0 0 8px ${c.wordCol[w.ci]}` : 'none' }}>{w.text}</div>
      ))}

      {/* Character */}
      <div style={{ position: 'absolute', bottom: 76, left: `calc(50% + ${charX}px)`,
        transform: 'translateX(-50%)', zIndex: 8, transition: 'left 0.1s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 32, height: 44, border: `2px solid ${charBorder}`,
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, marginBottom: bounce }}>🏃
          {[0,1,2].map(i => (
            <div key={i} style={{ position: 'absolute', bottom: -5 - i*5, left: '50%',
              transform: 'translateX(-50%)', width: 2, height: 4,
              background: charBorder, opacity: 0.6 - i * 0.15 }} />
          ))}
        </div>
      </div>

      {/* HUD */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 14px 10px',
        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: "'Press Start 2P', monospace", zIndex: 10 }}>
        <div style={{ fontSize: 7, color: c.accent }}>{c.label}</div>
        <div style={{ fontSize: 11, color: '#fff' }}>{score.toLocaleString()}m</div>
        <button onClick={(e) => { e.stopPropagation(); setPaused(p => !p); }} style={{
          background: 'none', border: `1px solid rgba(255,255,255,0.25)`,
          color: '#fff', fontSize: 8, padding: '4px 8px',
          fontFamily: "'Press Start 2P', monospace", cursor: 'pointer' }}>{paused ? '▶' : '⏸'}</button>
      </div>

      {/* Word pool tags */}
      <div style={{ position: 'absolute', top: 48, left: 0, right: 0,
        display: 'flex', gap: 5, padding: '5px 12px', flexWrap: 'wrap', zIndex: 9, pointerEvents: 'none' }}>
        {pool.map((w, i) => (
          <span key={i} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6,
            color: `${c.accent}88`, border: `1px solid ${c.accent}33`, padding: '2px 5px' }}>{w}</span>
        ))}
      </div>

      {/* Add word + Game Over buttons */}
      <button onClick={(e) => { e.stopPropagation(); setPaused(true); setAddWordOpen(true); }} style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        background: `${c.accent}1a`, border: `1px solid ${c.accent}`, color: c.accent,
        fontFamily: "'Press Start 2P', monospace", fontSize: 7, padding: '7px 12px',
        cursor: 'pointer', zIndex: 10, whiteSpace: 'nowrap' }}>+ ADD WORD</button>

      <button onClick={(e) => { e.stopPropagation(); onGameOver(score); }} style={{
        position: 'absolute', top: 50, right: 8, zIndex: 10,
        background: 'rgba(255,66,66,0.15)', border: '1px solid #FF4242',
        color: '#FF4242', fontSize: 6, padding: '3px 5px',
        fontFamily: "'Press Start 2P', monospace", cursor: 'pointer' }}>☠</button>

      {/* Tap hints */}
      <div style={{ position: 'absolute', bottom: 58, left: 14, fontFamily: "'Press Start 2P', monospace",
        fontSize: 10, color: `${c.accent}44`, pointerEvents: 'none', zIndex: 6 }}>◀</div>
      <div style={{ position: 'absolute', bottom: 58, right: 14, fontFamily: "'Press Start 2P', monospace",
        fontSize: 10, color: `${c.accent}44`, pointerEvents: 'none', zIndex: 6 }}>▶</div>

      {/* Add word overlay */}
      {addWordOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(0,0,0,0.8)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 14, padding: '0 24px', fontFamily: "'Press Start 2P', monospace' " }}
          onClick={e => e.stopPropagation()}>
          <div style={{ fontSize: 9, color: c.accent, letterSpacing: '0.12em' }}>ADD WORD</div>
          <input autoFocus value={newWord} onChange={e => setNewWord(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { const t = newWord.trim(); if (t && !pool.includes(t)) setPool(p => [...p, t]); setNewWord(''); setAddWordOpen(false); setPaused(false); }}}
            placeholder="단어 입력..." style={{
              width: '100%', background: 'rgba(255,255,255,0.07)',
              border: `2px solid ${c.accent}`, padding: '12px 14px', color: '#fff', fontSize: 15,
              fontFamily: "'Pretendard JP', sans-serif", outline: 'none', borderRadius: 4 }} />
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <button onClick={() => { const t = newWord.trim(); if (t && !pool.includes(t)) setPool(p => [...p, t]); setNewWord(''); setAddWordOpen(false); setPaused(false); }} style={{
              flex: 1, background: c.accent, color: stage === 2 ? '#1a3a5a' : '#fff',
              border: 'none', padding: '12px', fontFamily: "'Press Start 2P', monospace", fontSize: 9, cursor: 'pointer' }}>ADD</button>
            <button onClick={() => { setAddWordOpen(false); setPaused(false); }} style={{
              flex: 1, background: 'transparent', color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.2)', padding: '12px',
              fontFamily: "'Press Start 2P', monospace", fontSize: 9, cursor: 'pointer' }}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Pause overlay */}
      {paused && !addWordOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(0,0,0,0.65)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
          fontFamily: "'Press Start 2P', monospace" }}>
          <div style={{ fontSize: 18, color: '#fff' }}>PAUSED</div>
          <button onClick={() => setPaused(false)} style={{
            background: c.accent, color: stage === 2 ? '#1a3a5a' : '#fff',
            border: '3px solid #fff', padding: '12px 24px',
            fontFamily: "'Press Start 2P', monospace", fontSize: 10, cursor: 'pointer' }}>RESUME</button>
          <button onClick={() => onGameOver(score)} style={{
            background: 'transparent', color: 'rgba(255,255,255,0.5)',
            border: '2px solid rgba(255,255,255,0.2)', padding: '10px 20px',
            fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: 'pointer' }}>QUIT</button>
        </div>
      )}
    </div>
  );
}

// ─── Game Over ────────────────────────────────────────────────────────
function VA_GameOver({ score, stage, character, onRestart, onHome }) {
  const accents = { 1: '#e85c20', 2: '#a8d8ea', 3: '#cb59ff', 4: '#f5d06a' };
  const bgs = {
    1: 'linear-gradient(180deg,#0d1526,#1a2a4a)',
    2: 'linear-gradient(180deg,#1a3a5a,#0d2030)',
    3: 'linear-gradient(180deg,#0a0015,#1a0030)',
    4: 'linear-gradient(180deg,#0e0905,#2e1f0a)',
  };
  const stageNames = { 1:'Highway', 2:'School', 3:'Club', 4:'Library' };
  const accent = accents[stage] || '#e85c20';
  const [flash, setFlash] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setFlash(false), 500); return () => clearTimeout(t); }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: bgs[stage],
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      padding: '48px 24px 40px', fontFamily: "'Press Start 2P', monospace",
      position: 'relative', overflow: 'hidden' }}>
      {flash && <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: 0.88, zIndex: 20, pointerEvents: 'none' }} />}
      {[10,25,40,55,70,85].map(y => (
        <div key={y} style={{ position: 'absolute', left: 0, right: 0, top: `${y}%`, height: 1, background: 'rgba(255,255,255,0.04)' }} />
      ))}
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontSize: 8, color: accent, letterSpacing: '0.15em', marginBottom: 14 }}>
          STAGE {stage} · {stageNames[stage]}
        </div>
        <div style={{ fontSize: 24, color: '#FF4242',
          textShadow: '0 0 24px rgba(255,66,66,0.7)', lineHeight: 1.3 }}>GAME OVER</div>
        <div style={{ width: 48, height: 64, margin: '20px auto 12px',
          border: `2px solid ${character === 'kelly' ? '#2471A3' : '#C0392B'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, background: 'rgba(0,0,0,0.3)', opacity: 0.75 }}>💀</div>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>
          {character === 'kelly' ? 'KELLY' : 'SAM'} WAS CAUGHT
        </div>
      </div>

      <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)',
        border: `2px solid ${accent}`, padding: '20px', zIndex: 1 }}>
        <div style={{ fontSize: 8, color: accent, marginBottom: 10, letterSpacing: '0.1em' }}>FINAL SCORE</div>
        <div style={{ fontSize: 30, color: '#fff', textShadow: `0 0 16px ${accent}`, marginBottom: 14 }}>
          {(score || 1240).toLocaleString()}<span style={{ fontSize: 11 }}>m</span>
        </div>
        <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12 }}>
          {[{ l: 'STAGE', v: `${stage}/4` }, { l: 'RUNNER', v: character === 'kelly' ? 'KELLY' : 'SAM' }].map((r, i) => (
            <div key={i} style={{ flex: 1, textAlign: i === 0 ? 'left' : 'right' }}>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{r.l}</div>
              <div style={{ fontSize: 9, color: '#fff' }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
        <button onClick={onRestart} style={{
          width: '100%', padding: '14px', background: accent,
          color: stage === 2 ? '#1a3a5a' : '#fff', border: '3px solid rgba(255,255,255,0.4)',
          fontSize: 11, fontFamily: "'Press Start 2P', monospace", cursor: 'pointer',
          boxShadow: '0 4px 0 rgba(0,0,0,0.5)', letterSpacing: '0.05em' }}>↺ RESTART</button>
        <button onClick={onHome} style={{
          width: '100%', padding: '12px', background: 'transparent',
          color: 'rgba(255,255,255,0.5)', border: '2px solid rgba(255,255,255,0.15)',
          fontSize: 9, fontFamily: "'Press Start 2P', monospace", cursor: 'pointer' }}>⌂ TITLE</button>
      </div>
    </div>
  );
}

Object.assign(window, { VersionA });
