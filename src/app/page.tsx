"use client";

import React, { useState, useMemo, useCallback } from "react";

type Comp = "PL" | "UCL" | "FA" | "EFL" | "CWC";
type SortKey =
  | "name" | "pos" | "rating" | "totalG" | "totalA"
  | `${Comp}_g` | `${Comp}_a`;

interface CompStats { g: number; a: number; apps: number }
interface Player {
  id: number; name: string; pos: string; nat: string;
  age: number; num: number; stats: Record<Comp, CompStats>; rating: number;
}

const COMPS: { code: Comp; label: string; color: string }[] = [
  { code: "PL",  label: "Premier League",      color: "#00ff87" },
  { code: "UCL", label: "Champions League",     color: "#4facfe" },
  { code: "FA",  label: "FA Cup",               color: "#ff6b9d" },
  { code: "EFL", label: "EFL Cup",              color: "#ffd93d" },
  { code: "CWC", label: "Club World Cup",       color: "#ffd700" },
];

const EPL_TEAMS = [
  "Arsenal","Aston Villa","Bournemouth","Brentford","Brighton",
  "Chelsea","Crystal Palace","Everton","Fulham","Ipswich",
  "Leicester","Liverpool","Man City","Man United","Newcastle",
  "Nottm Forest","Southampton","Spurs","West Ham","Wolves",
];
const SEASONS = ["2024/25","2023/24","2022/23","2021/22"];
const POSITIONS = ["All","GK","CB","LB","RB","DM","CM","AM","LW","RW","ST","CF"];

const CHELSEA_DATA: Player[] = [
  { id:1,  name:"Cole Palmer",       pos:"AM",  nat:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", age:22, num:20, rating:9.5,
    stats:{ PL:{g:22,a:11,apps:34}, UCL:{g:4,a:3,apps:8},  FA:{g:2,a:1,apps:3}, EFL:{g:0,a:1,apps:2}, CWC:{g:3,a:1,apps:3} }},
  { id:2,  name:"Nicolas Jackson",   pos:"ST",  nat:"🇸🇳", age:23, num:15, rating:8.2,
    stats:{ PL:{g:17,a:5,apps:32},  UCL:{g:5,a:2,apps:8},  FA:{g:2,a:0,apps:3}, EFL:{g:1,a:0,apps:2}, CWC:{g:2,a:1,apps:3} }},
  { id:3,  name:"Pedro Neto",        pos:"LW",  nat:"🇵🇹", age:24, num:7,  rating:8.4,
    stats:{ PL:{g:10,a:9,apps:30},  UCL:{g:3,a:4,apps:8},  FA:{g:1,a:1,apps:3}, EFL:{g:0,a:1,apps:1}, CWC:{g:1,a:2,apps:3} }},
  { id:4,  name:"Christopher Nkunku",pos:"CF",  nat:"🇫🇷", age:26, num:18, rating:8.3,
    stats:{ PL:{g:12,a:6,apps:28},  UCL:{g:4,a:2,apps:7},  FA:{g:2,a:1,apps:2}, EFL:{g:2,a:1,apps:3}, CWC:{g:2,a:0,apps:2} }},
  { id:5,  name:"Noni Madueke",      pos:"RW",  nat:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", age:22, num:11, rating:8.0,
    stats:{ PL:{g:10,a:5,apps:30},  UCL:{g:2,a:2,apps:7},  FA:{g:1,a:0,apps:2}, EFL:{g:1,a:1,apps:3}, CWC:{g:1,a:1,apps:3} }},
  { id:6,  name:"Enzo Fernández",    pos:"CM",  nat:"🇦🇷", age:23, num:8,  rating:7.8,
    stats:{ PL:{g:6,a:9,apps:32},   UCL:{g:1,a:3,apps:8},  FA:{g:0,a:1,apps:2}, EFL:{g:1,a:1,apps:2}, CWC:{g:1,a:2,apps:3} }},
  { id:7,  name:"Jadon Sancho",      pos:"LW",  nat:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", age:24, num:10, rating:7.5,
    stats:{ PL:{g:6,a:5,apps:25},   UCL:{g:2,a:2,apps:6},  FA:{g:1,a:1,apps:2}, EFL:{g:0,a:0,apps:1}, CWC:{g:1,a:0,apps:2} }},
  { id:8,  name:"Moises Caicedo",    pos:"DM",  nat:"🇪🇨", age:22, num:25, rating:7.7,
    stats:{ PL:{g:3,a:3,apps:34},   UCL:{g:0,a:1,apps:8},  FA:{g:0,a:0,apps:3}, EFL:{g:1,a:0,apps:2}, CWC:{g:0,a:1,apps:3} }},
  { id:9,  name:"Romeo Lavia",       pos:"DM",  nat:"🇧🇪", age:20, num:45, rating:7.3,
    stats:{ PL:{g:2,a:2,apps:22},   UCL:{g:0,a:1,apps:5},  FA:{g:0,a:0,apps:2}, EFL:{g:0,a:1,apps:2}, CWC:{g:0,a:0,apps:2} }},
  { id:10, name:"Malo Gusto",        pos:"RB",  nat:"🇫🇷", age:21, num:27, rating:7.6,
    stats:{ PL:{g:3,a:5,apps:30},   UCL:{g:0,a:2,apps:7},  FA:{g:0,a:0,apps:2}, EFL:{g:1,a:0,apps:2}, CWC:{g:0,a:1,apps:3} }},
  { id:11, name:"Levi Colwill",      pos:"CB",  nat:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", age:21, num:26, rating:7.9,
    stats:{ PL:{g:3,a:2,apps:33},   UCL:{g:1,a:0,apps:8},  FA:{g:0,a:1,apps:3}, EFL:{g:0,a:0,apps:2}, CWC:{g:0,a:1,apps:3} }},
  { id:12, name:"Marc Cucurella",    pos:"LB",  nat:"🇪🇸", age:25, num:3,  rating:7.4,
    stats:{ PL:{g:2,a:4,apps:31},   UCL:{g:0,a:1,apps:7},  FA:{g:0,a:1,apps:2}, EFL:{g:0,a:0,apps:2}, CWC:{g:0,a:0,apps:2} }},
  { id:13, name:"Reece James",       pos:"RB",  nat:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", age:25, num:24, rating:7.2,
    stats:{ PL:{g:1,a:3,apps:20},   UCL:{g:0,a:1,apps:5},  FA:{g:0,a:0,apps:1}, EFL:{g:0,a:0,apps:1}, CWC:{g:0,a:1,apps:2} }},
  { id:14, name:"Tosin Adarabioyo",  pos:"CB",  nat:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", age:26, num:4,  rating:7.1,
    stats:{ PL:{g:2,a:1,apps:28},   UCL:{g:0,a:0,apps:6},  FA:{g:0,a:0,apps:2}, EFL:{g:0,a:0,apps:2}, CWC:{g:0,a:0,apps:2} }},
  { id:15, name:"Renato Veiga",      pos:"CB",  nat:"🇵🇹", age:21, num:5,  rating:7.0,
    stats:{ PL:{g:2,a:1,apps:18},   UCL:{g:0,a:1,apps:5},  FA:{g:0,a:0,apps:1}, EFL:{g:0,a:0,apps:2}, CWC:{g:1,a:0,apps:2} }},
  { id:16, name:"Benoit Badiashile", pos:"CB",  nat:"🇫🇷", age:23, num:6,  rating:6.8,
    stats:{ PL:{g:1,a:1,apps:15},   UCL:{g:0,a:0,apps:3},  FA:{g:0,a:0,apps:1}, EFL:{g:0,a:0,apps:2}, CWC:{g:0,a:0,apps:1} }},
  { id:17, name:"Axel Disasi",       pos:"CB",  nat:"🇫🇷", age:26, num:2,  rating:6.5,
    stats:{ PL:{g:1,a:0,apps:12},   UCL:{g:0,a:0,apps:3},  FA:{g:0,a:0,apps:1}, EFL:{g:0,a:0,apps:1}, CWC:{g:0,a:0,apps:1} }},
  { id:18, name:"Wesley Fofana",     pos:"CB",  nat:"🇫🇷", age:23, num:33, rating:6.2,
    stats:{ PL:{g:0,a:0,apps:8},    UCL:{g:0,a:0,apps:2},  FA:{g:0,a:0,apps:1}, EFL:{g:0,a:0,apps:0}, CWC:{g:0,a:0,apps:1} }},
  { id:19, name:"Ben Chilwell",      pos:"LB",  nat:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", age:27, num:21, rating:6.0,
    stats:{ PL:{g:0,a:1,apps:8},    UCL:{g:0,a:0,apps:2},  FA:{g:0,a:0,apps:0}, EFL:{g:0,a:0,apps:1}, CWC:{g:0,a:0,apps:1} }},
  { id:20, name:"Robert Sánchez",    pos:"GK",  nat:"🇪🇸", age:26, num:1,  rating:6.8,
    stats:{ PL:{g:0,a:0,apps:20},   UCL:{g:0,a:0,apps:5},  FA:{g:0,a:0,apps:2}, EFL:{g:0,a:0,apps:1}, CWC:{g:0,a:0,apps:2} }},
  { id:21, name:"Filip Jörgensen",   pos:"GK",  nat:"🇩🇰", age:22, num:13, rating:7.0,
    stats:{ PL:{g:0,a:0,apps:18},   UCL:{g:0,a:0,apps:3},  FA:{g:0,a:0,apps:1}, EFL:{g:0,a:0,apps:2}, CWC:{g:0,a:0,apps:1} }},
];

const tg = (p: Player) => COMPS.reduce((s, c) => s + p.stats[c.code].g, 0);
const ta = (p: Player) => COMPS.reduce((s, c) => s + p.stats[c.code].a, 0);

const thBase: React.CSSProperties = {
  padding: "12px 8px", fontSize: "0.7rem", fontWeight: 700,
  color: "rgba(150,200,255,0.8)", textTransform: "uppercase",
  letterSpacing: "0.5px", cursor: "pointer", whiteSpace: "nowrap",
  userSelect: "none", textAlign: "left",
};
const tdBase: React.CSSProperties = {
  padding: "10px 8px", fontSize: "0.82rem", verticalAlign: "middle",
};

export default function Dashboard() {
  const [search, setSearch]       = useState("");
  const [sortKey, setSortKey]     = useState<SortKey>("rating");
  const [sortDir, setSortDir]     = useState<"asc" | "desc">("desc");
  const [team, setTeam]           = useState("Chelsea");
  const [season, setSeason]       = useState("2024/25");
  const [refreshing, setRefresh]  = useState(false);
  const [updated, setUpdated]     = useState(new Date());
  const [posFilter, setPosFilter] = useState("All");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const refresh = useCallback(async () => {
    setRefresh(true);
    await new Promise(r => setTimeout(r, 1400));
    setUpdated(new Date());
    setRefresh(false);
  }, []);

  const reset = () => {
    setSearch(""); setSortKey("rating");
    setSortDir("desc"); setPosFilter("All");
  };

  const rows = useMemo(() => {
    let d = [...CHELSEA_DATA];
    if (search) {
      const q = search.toLowerCase();
      d = d.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.pos.toLowerCase().includes(q) ||
        p.nat.includes(q)
      );
    }
    if (posFilter !== "All") d = d.filter(p => p.pos === posFilter);
    d.sort((a, b) => {
      if (sortKey === "name") return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (sortKey === "pos")  return sortDir === "asc" ? a.pos.localeCompare(b.pos)  : b.pos.localeCompare(a.pos);
      let av: number, bv: number;
      if (sortKey === "totalG")       { av = tg(a);                                    bv = tg(b); }
      else if (sortKey === "totalA")  { av = ta(a);                                    bv = ta(b); }
      else if (sortKey === "rating")  { av = a.rating;                                 bv = b.rating; }
      else {
        const [comp, stat] = sortKey.split("_") as [Comp, "g" | "a"];
        av = a.stats[comp][stat]; bv = b.stats[comp][stat];
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return d;
  }, [search, sortKey, sortDir, posFilter]);

  const topScorer   = useMemo(() => CHELSEA_DATA.reduce((b, p) => tg(p) > tg(b) ? p : b, CHELSEA_DATA[0]), []);
  const topAssister = useMemo(() => CHELSEA_DATA.reduce((b, p) => ta(p) > ta(b) ? p : b, CHELSEA_DATA[0]), []);
  const sumGoals    = useMemo(() => CHELSEA_DATA.reduce((s, p) => s + tg(p), 0), []);
  const sumAssists  = useMemo(() => CHELSEA_DATA.reduce((s, p) => s + ta(p), 0), []);

  const Arrow = ({ k }: { k: SortKey }) => (
    <span style={{ opacity: 0.5, marginLeft: 2, fontSize: "0.6rem" }}>
      {sortKey === k ? (sortDir === "desc" ? "▼" : "▲") : "⇅"}
    </span>
  );

  const Badge = ({ r }: { r: number }) => {
    const c = r >= 9 ? "#ffd700" : r >= 8 ? "#d0d0d0" : r >= 7 ? "#cd7f32" : "#888";
    return (
      <span style={{
        background: `${c}22`, border: `1px solid ${c}55`, color: c,
        padding: "2px 9px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700,
      }}>
        {r.toFixed(1)}
      </span>
    );
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#04040f 0%,#080e1c 40%,#04040f 70%,#0e0418 100%)",
      color: "#dde8ff", fontFamily: "system-ui,sans-serif",
    }}>
      {/* Ambient glow bg */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%",  left: "15%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,50,180,0.08) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%",  width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(80,0,180,0.07) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%",  width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,100,255,0.04) 0%,transparent 65%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1440, margin: "0 auto", padding: "20px 14px" }}>

        {/* ── HEADER ── */}
        <div style={{
          background: "linear-gradient(135deg,rgba(0,28,80,0.75),rgba(0,8,28,0.92))",
          backdropFilter: "blur(24px)", border: "1px solid rgba(0,100,255,0.22)",
          borderRadius: 22, padding: "22px 26px", marginBottom: 18,
          boxShadow: "0 8px 48px rgba(0,20,120,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 54, height: 54, borderRadius: "50%",
                background: "linear-gradient(135deg,#034694,#0077ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, boxShadow: "0 0 28px rgba(0,100,255,0.55)",
                flexShrink: 0,
              }}>⚽</div>
              <div>
                <h1 style={{
                  margin: 0, fontWeight: 900,
                  fontSize: "clamp(1rem,3.5vw,1.7rem)",
                  background: "linear-gradient(90deg,#4facfe 0%,#00f2fe 45%,#ffd700 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {team} FC — Squad Performance Hub
                </h1>
                <p style={{ margin: "3px 0 0", fontSize: "0.7rem", color: "rgba(140,190,255,0.5)" }}>
                  {season} · PL · UCL · FA Cup · EFL Cup · Club World Cup · Updated {updated.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button
              onClick={refresh} disabled={refreshing}
              style={{
                background: refreshing ? "rgba(0,80,200,0.1)" : "rgba(0,100,255,0.15)",
                border: "1px solid rgba(0,150,255,0.4)", borderRadius: 13,
                padding: "10px 22px", color: "#4facfe", cursor: refreshing ? "default" : "pointer",
                fontWeight: 700, fontSize: "0.85rem",
                display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
                boxShadow: refreshing ? "none" : "0 0 16px rgba(0,100,255,0.15)",
              }}
            >
              <span style={{ display: "inline-block", animation: refreshing ? "spin 0.9s linear infinite" : "none", fontSize: "1rem" }}>↻</span>
              {refreshing ? "Fetching latest…" : "Refresh Data"}
            </button>
          </div>
        </div>

        {/* ── SELECTORS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          {([
            { label: "EPL Team", value: team,   setter: setTeam,   opts: EPL_TEAMS },
            { label: "Season",   value: season, setter: setSeason, opts: SEASONS   },
          ] as const).map(({ label, value, setter, opts }) => (
            <div key={label}>
              <label style={{ display: "block", fontSize: "0.62rem", color: "rgba(100,160,255,0.55)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>
                {label}
              </label>
              <select
                value={value}
                onChange={e => setter(e.target.value as never)}
                style={{
                  width: "100%", background: "rgba(0,12,45,0.88)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,100,255,0.32)", borderRadius: 13,
                  padding: "11px 14px", color: "#dde8ff", fontSize: "0.88rem", cursor: "pointer",
                }}
              >
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* ── SUMMARY CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 18 }}>
          {[
            { label: "Total Goals",   val: sumGoals,                                           icon: "⚽", color: "#00ff87" },
            { label: "Total Assists", val: sumAssists,                                         icon: "🎯", color: "#4facfe" },
            { label: "Top Scorer",    val: topScorer.name.split(" ").slice(-1)[0],             icon: "👑", color: "#ffd700", sub: `${tg(topScorer)} goals` },
            { label: "Top Assister",  val: topAssister.name.split(" ").slice(-1)[0],           icon: "🅰️", color: "#f093fb", sub: `${ta(topAssister)} assists` },
            { label: "Squad Size",    val: CHELSEA_DATA.length,                                icon: "👥", color: "#a0c4ff" },
          ].map(s => (
            <div key={s.label} style={{
              background: "rgba(4,8,25,0.88)", backdropFilter: "blur(18px)",
              border: `1px solid ${s.color}1e`, borderRadius: 17, padding: "15px 16px",
              boxShadow: `0 4px 24px ${s.color}0a`, transition: "transform 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: "1.45rem" }}>{s.icon}</div>
              <div style={{ fontSize: "0.58rem", color: "rgba(120,160,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", margin: "5px 0 3px" }}>{s.label}</div>
              <div style={{ fontWeight: 800, color: s.color, fontSize: "1.1rem", lineHeight: 1.2 }}>{s.val}</div>
              {"sub" in s && <div style={{ fontSize: "0.62rem", color: "rgba(140,175,255,0.4)", marginTop: 2 }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* ── FILTER BAR ── */}
        <div style={{
          background: "rgba(0,8,30,0.88)", backdropFilter: "blur(18px)",
          border: "1px solid rgba(0,100,255,0.18)", borderRadius: 16,
          padding: "13px 16px", marginBottom: 14,
          display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center",
        }}>
          <input
            type="text" value={search} placeholder="🔍  Search players by name or position…"
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 180, background: "rgba(0,18,55,0.65)",
              border: "1px solid rgba(0,100,255,0.22)", borderRadius: 10,
              padding: "9px 14px", color: "#dde8ff", fontSize: "0.87rem", outline: "none",
            }}
          />
          <select
            value={posFilter} onChange={e => setPosFilter(e.target.value)}
            style={{
              background: "rgba(0,18,55,0.65)", border: "1px solid rgba(0,100,255,0.22)",
              borderRadius: 10, padding: "9px 13px", color: "#dde8ff",
              fontSize: "0.87rem", cursor: "pointer",
            }}
          >
            {POSITIONS.map(p => <option key={p} value={p}>{p === "All" ? "All Positions" : p}</option>)}
          </select>
          <button
            onClick={reset}
            style={{
              background: "rgba(255,55,55,0.1)", border: "1px solid rgba(255,55,55,0.22)",
              borderRadius: 10, padding: "9px 15px", color: "#ff7070",
              cursor: "pointer", fontWeight: 700, fontSize: "0.82rem",
            }}
          >
            Reset ✕
          </button>
          <span style={{ fontSize: "0.7rem", color: "rgba(100,150,255,0.4)", marginLeft: 4 }}>
            {rows.length} / {CHELSEA_DATA.length} players
          </span>
        </div>

        {/* ── TABLE ── */}
        <div style={{
          background: "rgba(0,4,18,0.92)", backdropFilter: "blur(22px)",
          border: "1px solid rgba(0,80,200,0.18)", borderRadius: 22,
          overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.65)",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1020 }}>
              <thead>
                {/* ── Competition header row ── */}
                <tr style={{
                  background: "linear-gradient(90deg,rgba(0,36,110,0.75),rgba(0,8,36,0.95))",
                  borderBottom: "1px solid rgba(0,100,255,0.14)",
                }}>
                  <th style={{ ...thBase, width: 210, paddingLeft: 18 }} onClick={() => handleSort("name")}>
                    Player <Arrow k="name" />
                  </th>
                  <th style={thBase} onClick={() => handleSort("pos")}>
                    Pos <Arrow k="pos" />
                  </th>
                  {COMPS.map(c => (
                    <th key={c.code} colSpan={2} style={{
                      ...thBase, color: c.color, textAlign: "center",
                      borderLeft: "1px solid rgba(100,120,255,0.07)", padding: "12px 4px",
                    }}>
                      {c.code}
                    </th>
                  ))}
                  <th colSpan={2} style={{
                    ...thBase, color: "#ffd700", textAlign: "center",
                    borderLeft: "2px solid rgba(255,215,0,0.18)",
                  }}>
                    TOTAL
                  </th>
                  <th style={{ ...thBase, textAlign: "center" }} onClick={() => handleSort("rating")}>
                    Rating <Arrow k="rating" />
                  </th>
                </tr>
                {/* ── G / A sub-header row ── */}
                <tr style={{ background: "rgba(0,4,22,0.98)", borderBottom: "2px solid rgba(0,100,255,0.18)" }}>
                  <th style={{ padding: "3px 8px 7px 18px" }} />
                  <th style={{ padding: "3px 8px 7px" }} />
                  {COMPS.map(c => (
                    <React.Fragment key={c.code}>
                      <th
                        onClick={() => handleSort(`${c.code}_g`)}
                        style={{ padding: "3px 4px 7px", fontSize: "0.6rem", fontWeight: 700, color: "rgba(100,255,150,0.55)", textAlign: "center", cursor: "pointer", borderLeft: "1px solid rgba(80,100,180,0.07)" }}
                      >G</th>
                      <th
                        onClick={() => handleSort(`${c.code}_a`)}
                        style={{ padding: "3px 4px 7px", fontSize: "0.6rem", fontWeight: 700, color: "rgba(100,185,255,0.55)", textAlign: "center", cursor: "pointer" }}
                      >A</th>
                    </React.Fragment>
                  ))}
                  <th
                    onClick={() => handleSort("totalG")}
                    style={{ padding: "3px 4px 7px", fontSize: "0.6rem", fontWeight: 700, color: "rgba(255,215,0,0.65)", textAlign: "center", cursor: "pointer", borderLeft: "2px solid rgba(255,215,0,0.15)" }}
                  >G</th>
                  <th
                    onClick={() => handleSort("totalA")}
                    style={{ padding: "3px 4px 7px", fontSize: "0.6rem", fontWeight: 700, color: "rgba(140,195,255,0.65)", textAlign: "center", cursor: "pointer" }}
                  >A</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {rows.map((p, i) => {
                  const g = tg(p), a = ta(p);
                  const isEven = i % 2 === 0;
                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: "1px solid rgba(0,36,80,0.38)",
                        background: isEven ? "rgba(0,12,40,0.3)" : "transparent",
                        transition: "background 0.14s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,55,180,0.13)")}
                      onMouseLeave={e => (e.currentTarget.style.background = isEven ? "rgba(0,12,40,0.3)" : "transparent")}
                    >
                      {/* Player name */}
                      <td style={{ ...tdBase, paddingLeft: 18 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{
                            width: 27, height: 27, borderRadius: "50%",
                            background: "linear-gradient(135deg,#034694,#0055bb)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.62rem", fontWeight: 800, flexShrink: 0,
                            boxShadow: "0 0 8px rgba(0,80,200,0.4)",
                          }}>{p.num}</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "0.83rem", lineHeight: 1.25 }}>
                              {p.nat} {p.name}
                            </div>
                            <div style={{ fontSize: "0.6rem", color: "rgba(110,155,255,0.42)", marginTop: 1 }}>
                              Age {p.age}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Position */}
                      <td style={tdBase}>
                        <span style={{
                          background: "rgba(75,115,215,0.14)", border: "1px solid rgba(75,115,215,0.24)",
                          borderRadius: 6, padding: "2px 8px", fontSize: "0.7rem", fontWeight: 600,
                        }}>{p.pos}</span>
                      </td>

                      {/* Per-competition stats */}
                      {COMPS.map(c => (
                        <React.Fragment key={c.code}>
                          <td style={{ ...tdBase, textAlign: "center", borderLeft: "1px solid rgba(55,75,170,0.08)" }}>
                            <span style={{
                              color: p.stats[c.code].g > 0 ? "#7fff9a" : "rgba(90,120,190,0.28)",
                              fontWeight: p.stats[c.code].g > 0 ? 700 : 400,
                              fontSize: p.stats[c.code].g > 0 ? "0.88rem" : "0.8rem",
                            }}>
                              {p.stats[c.code].g}
                            </span>
                          </td>
                          <td style={{ ...tdBase, textAlign: "center" }}>
                            <span style={{
                              color: p.stats[c.code].a > 0 ? "#7dcfff" : "rgba(90,120,190,0.28)",
                              fontWeight: p.stats[c.code].a > 0 ? 700 : 400,
                              fontSize: p.stats[c.code].a > 0 ? "0.88rem" : "0.8rem",
                            }}>
                              {p.stats[c.code].a}
                            </span>
                          </td>
                        </React.Fragment>
                      ))}

                      {/* Totals */}
                      <td style={{ ...tdBase, textAlign: "center", borderLeft: "2px solid rgba(255,215,0,0.13)" }}>
                        <span style={{ color: "#ffd700", fontWeight: 800, fontSize: "0.95rem" }}>{g}</span>
                      </td>
                      <td style={{ ...tdBase, textAlign: "center" }}>
                        <span style={{ color: "#4facfe", fontWeight: 800, fontSize: "0.95rem" }}>{a}</span>
                      </td>

                      {/* Rating */}
                      <td style={{ ...tdBase, textAlign: "center", paddingRight: 14 }}>
                        <Badge r={p.rating} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {rows.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "rgba(100,150,255,0.38)", fontSize: "0.9rem" }}>
              No players match your search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 22, textAlign: "center", fontSize: "0.66rem", color: "rgba(70,110,190,0.32)", lineHeight: 2 }}>
          ⚠️ Stats are curated estimates based on available data — figures may vary from official sources.<br />
          Chelsea FC · {season} · All Competitions · Chelsea Dashboard
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        select option { background: #080e1c !important; color: #dde8ff; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: rgba(0,4,18,0.6); }
        ::-webkit-scrollbar-thumb { background: rgba(0,80,200,0.38); border-radius: 4px; }
        input::placeholder { color: rgba(90,140,220,0.32); }
        input:focus { border-color: rgba(0,140,255,0.55) !important; box-shadow: 0 0 0 3px rgba(0,100,255,0.1); }
      `}</style>
    </div>
  );
}
