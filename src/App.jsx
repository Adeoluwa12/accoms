// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { api } from './api.js';

// // ── ICONS (inline SVG) ────────────────────────────────────────────────────────
// const Icon = ({ d, size = 18, ...p }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
//     <path d={d} />
//   </svg>
// );

// const Icons = {
//   Dashboard:    () => <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />,
//   CheckIn:      () => <Icon d="M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />,
//   Attendees:    () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />,
//   Rooms:        () => <Icon d="M3 9.5V19a1 1 0 001 1h16a1 1 0 001-1V9.5L12 3z M9 22V12h6v10" />,
//   Reports:      () => <Icon d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />,
//   Events:       () => <Icon d="M8 2v4 M16 2v4 M3 10h18 M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
//   Search:       () => <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
//   X:            () => <Icon d="M18 6L6 18M6 6l12 12" />,
//   Plus:         () => <Icon d="M12 5v14M5 12h14" />,
//   Trash:        () => <Icon d="M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6" />,
//   Edit:         () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z" />,
//   Menu:         () => <Icon d="M3 12h18M3 6h18M3 18h18" />,
//   Undo:         () => <Icon d="M3 7v6h6 M3 13C5 7 10 3 16 3a9 9 0 110 18 9 9 0 01-7.7-4.4" />,
//   Upload:       () => <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12" />,
//   ChevronRight: () => <Icon d="M9 18l6-6-6-6" />,
//   Crown:        () => <Icon d="M3 17l3-8 5 5 4-9 4 12H3z" />,
//   Zap:          () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9z" />,
//   Download:     () => <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" />,
//   AlertTriangle:() => <Icon d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" />,
//   Users:        () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />,
//   Star:         () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />,
// };

// // ── HELPERS ───────────────────────────────────────────────────────────────────
// const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

// function OccClass(pct) {
//   if (pct >= 100) return 'full';
//   if (pct >= 75)  return 'warn';
//   return 'ok';
// }

// function genderBadge(g) {
//   return <span className={`badge badge-${g === 'Male' ? 'male' : 'female'}`}>{g}</span>;
// }

// // ── SHARED COMPONENTS ─────────────────────────────────────────────────────────

// function Spinner({ size = 20 }) {
//   return <div className="spinner" style={{ width: size, height: size }} />;
// }

// function Modal({ title, onClose, children, footer, maxWidth }) {
//   useEffect(() => {
//     const h = (e) => { if (e.key === 'Escape') onClose(); };
//     document.addEventListener('keydown', h);
//     return () => document.removeEventListener('keydown', h);
//   }, [onClose]);

//   return (
//     <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div className="modal" style={maxWidth ? { maxWidth } : {}}>
//         <div className="modal-header">
//           <span className="modal-title">{title}</span>
//           <button className="modal-close" onClick={onClose}>×</button>
//         </div>
//         <div className="modal-body">{children}</div>
//         {footer && <div className="modal-footer">{footer}</div>}
//       </div>
//     </div>
//   );
// }

// function Confirm({ title, message, onConfirm, onClose, danger }) {
//   return (
//     <Modal title={title} onClose={onClose} maxWidth={380}
//       footer={<>
//         <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
//         <button className={`btn btn-sm ${danger ? 'btn-danger' : 'btn-gold'}`} onClick={onConfirm}>Confirm</button>
//       </>}>
//       <p style={{ color: 'var(--text-2)', fontSize: 14 }}>{message}</p>
//     </Modal>
//   );
// }

// function Alert({ type = 'info', children }) {
//   return <div className={`alert alert-${type}`}>{children}</div>;
// }

// function ProgBar({ pct }) {
//   const cls = OccClass(pct);
//   return (
//     <div className="prog-bar">
//       <div className={`prog-fill ${cls}`} style={{ width: `${Math.min(pct, 100)}%` }} />
//     </div>
//   );
// }

// function useAsync(fn, deps = []) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const run = useCallback(async () => {
//     setLoading(true); setError(null);
//     try { setData(await fn()); }
//     catch (e) { setError(e.message); }
//     finally { setLoading(false); }
//   }, deps); // eslint-disable-line

//   useEffect(() => { run(); }, [run]);
//   return { data, loading, error, reload: run };
// }

// // ── DASHBOARD PAGE ────────────────────────────────────────────────────────────
// function Dashboard({ activeEvent }) {
//   const eid = activeEvent?._id;
//   const { data: stats, loading: sl }   = useAsync(() => eid ? api.getStats(eid) : Promise.resolve({ data: {} }), [eid]);
//   const { data: occ,   loading: ol }   = useAsync(() => eid ? api.getOccupancy(eid) : Promise.resolve({ data: [] }), [eid]);
//   const { data: dist,  loading: dl }   = useAsync(() => eid ? api.getDistribution(eid) : Promise.resolve({ data: {} }), [eid]);

//   if (!activeEvent) return (
//     <div className="empty-state">
//       <span className="empty-icon">📅</span>
//       <p className="empty-text">No active event. Go to Events and activate one.</p>
//     </div>
//   );

//   const s = stats?.data || {};
//   const rooms = (occ?.data || []).filter(u => u.type === 'Room');
//   const dorms = (occ?.data || []).filter(u => u.type === 'Dorm');

//   return (
//     <div>
//       <div className="page-header">
//         <div className="page-header-left">
//           <h1 className="page-h1">Overview</h1>
//           <span className="page-h1-sub">{activeEvent.name} · {fmtDate(activeEvent.startDate)}</span>
//         </div>
//       </div>

//       <div className="stat-grid">
//         {[
//           { label: 'Registered',  value: sl ? '…' : s.registered ?? 0,  sub: 'total attendees' },
//           { label: 'Checked In',  value: sl ? '…' : s.present ?? 0,     sub: `${sl ? '—' : s.presentPercent ?? 0}% of registered` },
//           { label: 'Males',       value: sl ? '…' : s.malePresent ?? 0,  sub: 'present' },
//           { label: 'Females',     value: sl ? '…' : s.femalePresent ?? 0, sub: 'present' },
//           { label: 'Assigned',    value: sl ? '…' : s.assigned ?? 0,    sub: 'in rooms/dorms' },
//           { label: 'Active Units',value: sl ? '…' : s.activeUnits ?? 0,  sub: `${sl ? '—' : s.activeRooms ?? 0} rooms · ${sl ? '—' : s.activeDorms ?? 0} dorms` },
//         ].map((c) => (
//           <div className="stat-card" key={c.label}>
//             <span className="stat-label">{c.label}</span>
//             <span className="stat-value">{c.value}</span>
//             <span className="stat-sub">{c.sub}</span>
//           </div>
//         ))}
//       </div>

//       <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
//         <div className="card">
//           <div className="card-header"><span className="card-title">Rooms</span></div>
//           <div className="card-body" style={{ padding: '12px 16px' }}>
//             {ol ? <Spinner /> : rooms.length === 0 ? <p className="text-muted text-center">No rooms</p> :
//               rooms.map(u => <UnitBar key={u._id} u={u} />)}
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-header"><span className="card-title">Dorms</span></div>
//           <div className="card-body" style={{ padding: '12px 16px' }}>
//             {ol ? <Spinner /> : dorms.length === 0 ? <p className="text-muted text-center">No dorms</p> :
//               dorms.map(u => <UnitBar key={u._id} u={u} />)}
//           </div>
//         </div>
//       </div>

//       {!dl && dist?.data && (
//         <div className="grid-2">
//           <DistCard title="By Church Center" items={dist.data.byChurchCenter} />
//           <DistCard title="By Fellowship" items={dist.data.byFellowship} />
//         </div>
//       )}
//     </div>
//   );
// }

// function UnitBar({ u }) {
//   const pct = u.capacity > 0 ? Math.round((u.currentOccupancy / u.capacity) * 100) : 0;
//   const cls = OccClass(pct);
//   return (
//     <div style={{ marginBottom: 12 }}>
//       <div className="flex justify-between items-center gap-8 mb-4" style={{ marginBottom: 4 }}>
//         <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{u.name}</span>
//         <span className={`text-mono occ-${cls}`} style={{ fontSize: 12 }}>
//           {u.currentOccupancy}/{u.capacity}
//         </span>
//       </div>
//       <ProgBar pct={pct} />
//       {u.reservedSlots > 0 && (
//         <span style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
//           {u.reservedSlots} reserved
//         </span>
//       )}
//     </div>
//   );
// }

// function DistCard({ title, items = [] }) {
//   const max = Math.max(...items.map(i => i.count), 1);
//   return (
//     <div className="card">
//       <div className="card-header"><span className="card-title">{title}</span></div>
//       <div className="card-body" style={{ padding: '12px 16px' }}>
//         {items.slice(0, 8).map(item => (
//           <div key={item.name} style={{ marginBottom: 8 }}>
//             <div className="flex justify-between" style={{ marginBottom: 3 }}>
//               <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{item.name || 'Unknown'}</span>
//               <span className="text-mono" style={{ fontSize: 11, color: 'var(--gold-dim)' }}>{item.count}</span>
//             </div>
//             <div className="prog-bar">
//               <div className="prog-fill gold" style={{ width: `${(item.count / max) * 100}%` }} />
//             </div>
//           </div>
//         ))}
//         {items.length === 0 && <p className="text-muted text-center">No data yet</p>}
//       </div>
//     </div>
//   );
// }

// // ── CHECK-IN PAGE ─────────────────────────────────────────────────────────────
// function CheckIn({ activeEvent }) {
//   const [query, setQuery]     = useState('');
//   const [results, setResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [checking, setChecking]   = useState(false);
//   const [result, setResult]       = useState(null); // {success, attendee, alreadyIn}
//   const [error, setError]         = useState('');
//   const inputRef = useRef(null);

//   useEffect(() => { inputRef.current?.focus(); }, []);

//   useEffect(() => {
//     if (!query.trim() || !activeEvent) { setResults([]); return; }
//     const t = setTimeout(async () => {
//       setSearching(true);
//       try {
//         const res = await api.getAttendees({ eventId: activeEvent._id, search: query, limit: 8 });
//         setResults(res.data || []);
//       } catch { setResults([]); }
//       finally { setSearching(false); }
//     }, 300);
//     return () => clearTimeout(t);
//   }, [query, activeEvent]);

//   const doCheckIn = async (attendee) => {
//     setChecking(true); setError('');
//     try {
//       const res = await api.checkIn(attendee._id);
//       setResult(res);
//       setQuery('');
//       setResults([]);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setChecking(false);
//     }
//   };

//   const handleKey = (e) => {
//     if (e.key === 'Enter' && results.length === 1) doCheckIn(results[0]);
//   };

//   const reset = () => { setResult(null); setError(''); setTimeout(() => inputRef.current?.focus(), 50); };

//   if (!activeEvent) return (
//     <div className="empty-state">
//       <span className="empty-icon">📅</span>
//       <p className="empty-text">No active event selected.</p>
//     </div>
//   );

//   return (
//     <div style={{ maxWidth: 640, margin: '0 auto' }}>
//       <div className="page-header">
//         <div>
//           <h1 className="page-h1">Check‑In</h1>
//           <span className="page-h1-sub">{activeEvent.name}</span>
//         </div>
//       </div>

//       {result ? (
//         result.alreadyIn ? (
//           <div className="checkin-already">
//             <div style={{ fontSize: 28 }}>⚠️</div>
//             <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: '10px 0 6px', color: 'var(--text-1)' }}>
//               {result.attendee?.firstName} {result.attendee?.surname}
//             </p>
//             <p style={{ color: 'var(--warn)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Already checked in</p>
//             <button className="btn btn-outline mt-16" onClick={reset}>Next →</button>
//           </div>
//         ) : (
//           <div className="checkin-success">
//             <div style={{ fontSize: 32 }}>✅</div>
//             <p className="checkin-success-name">{result.attendee?.firstName} {result.attendee?.surname}</p>
//             <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
//               {genderBadge(result.attendee?.gender)}
//               <span className="badge badge-dim">{result.attendee?.fellowship || result.attendee?.churchCenter || '—'}</span>
//             </div>
//             {result.attendee?.accommodationId && (
//               <p className="checkin-success-room">
//                 🏠 {result.attendee.accommodationId?.name || result.attendee.accommodationId}
//               </p>
//             )}
//             <button className="btn btn-gold mt-16" onClick={reset}>Next →</button>
//           </div>
//         )
//       ) : (
//         <>
//           <div className="checkin-search-wrap">
//             <div className="checkin-search-icon"><Icons.Search /></div>
//             <input
//               ref={inputRef}
//               className="checkin-input"
//               placeholder="Search by name…"
//               value={query}
//               onChange={e => setQuery(e.target.value)}
//               onKeyDown={handleKey}
//               autoComplete="off"
//             />
//           </div>

//           {error && <Alert type="danger">{error}</Alert>}
//           {checking && <div className="loading-overlay"><Spinner size={32} /></div>}

//           {results.length > 0 && (
//             <div className="checkin-results">
//               {results.map(a => (
//                 <div key={a._id} className="checkin-result-item" onClick={() => doCheckIn(a)}>
//                   <div>
//                     <div className="checkin-result-name">{a.surname}, {a.firstName}</div>
//                     <div className="checkin-result-meta">{a.churchCenter} {a.fellowship ? `· ${a.fellowship}` : ''}</div>
//                   </div>
//                   <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
//                     {genderBadge(a.gender)}
//                     {a.present && <span className="badge badge-success">In</span>}
//                     <Icons.ChevronRight />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {searching && (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}><Spinner /></div>
//           )}

//           {query.trim() && !searching && results.length === 0 && (
//             <div className="empty-state" style={{ padding: '30px' }}>
//               <p className="empty-text">No attendees match "<strong>{query}</strong>"</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// // ── ATTENDEES PAGE ────────────────────────────────────────────────────────────
// function Attendees({ activeEvent }) {
//   const [search, setSearch] = useState('');
//   const [gFilter, setGFilter] = useState('');
//   const [pFilter, setPFilter] = useState('');
//   const [page, setPage] = useState(1);
//   const [showAdd, setShowAdd] = useState(false);
//   const [showImport, setShowImport] = useState(false);
//   const [manage, setManage] = useState(null);
//   const [confirm, setConfirm] = useState(null);
//   const [msg, setMsg] = useState(null);

//   const { data, loading, reload } = useAsync(() => {
//     if (!activeEvent) return Promise.resolve({ data: [], pagination: {} });
//     const p = { eventId: activeEvent._id, page, limit: 40 };
//     if (search) p.search = search;
//     if (gFilter) p.gender = gFilter;
//     if (pFilter) p.present = pFilter;
//     return api.getAttendees(p);
//   }, [activeEvent?._id, search, gFilter, pFilter, page]);

//   const attendees = data?.data || [];
//   const pagination = data?.pagination || {};

//   const doDelete = async (a) => {
//     try {
//       await api.deleteAttendee(a._id);
//       reload();
//       setMsg({ type: 'success', text: `${a.firstName} deleted` });
//     } catch (e) { setMsg({ type: 'danger', text: e.message }); }
//     setConfirm(null);
//   };

//   const doCheckIn = async (a) => {
//     try {
//       const res = await api.checkIn(a._id);
//       reload();
//       if (res.alreadyIn) setMsg({ type: 'warn', text: `${a.firstName} is already checked in` });
//       else setMsg({ type: 'success', text: `${a.firstName} checked in → ${res.attendee?.accommodationId?.name || ''}` });
//     } catch (e) { setMsg({ type: 'danger', text: e.message }); }
//   };

//   return (
//     <div>
//       <div className="page-header">
//         <div>
//           <h1 className="page-h1">Attendees</h1>
//           <span className="page-h1-sub">{activeEvent?.name || 'No active event'}</span>
//         </div>
//         <div style={{ display: 'flex', gap: 8 }}>
//           <button className="btn btn-ghost btn-sm" onClick={() => setShowImport(true)}><Icons.Upload /> Import</button>
//           <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(true)}><Icons.Plus /> Add</button>
//         </div>
//       </div>

//       {msg && <Alert type={msg.type}>{msg.text} <button style={{ marginLeft: 8, cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }} onClick={() => setMsg(null)}>×</button></Alert>}

//       <div className="filters">
//         <input className="input" placeholder="Search name, fellowship…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
//         <select className="select" value={gFilter} onChange={e => { setGFilter(e.target.value); setPage(1); }}>
//           <option value="">All Genders</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         <select className="select" value={pFilter} onChange={e => { setPFilter(e.target.value); setPage(1); }}>
//           <option value="">All Status</option>
//           <option value="true">Present</option>
//           <option value="false">Absent</option>
//         </select>
//         <button className="btn btn-ghost btn-sm" onClick={reload} title="Refresh">↻</button>
//       </div>

//       <div className="card">
//         {loading ? <div className="loading-overlay"><Spinner /></div> : attendees.length === 0 ?
//           <div className="empty-state"><span className="empty-icon">👥</span><p>No attendees found</p></div> : (
//           <div className="table-wrap">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Gender</th>
//                   <th>Church / Fellowship</th>
//                   <th>Status</th>
//                   <th>Unit</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {attendees.map(a => (
//                   <tr key={a._id}>
//                     <td className="td-name">{a.surname}, {a.firstName}</td>
//                     <td>{genderBadge(a.gender)}</td>
//                     <td className="text-muted">{[a.churchCenter, a.fellowship].filter(Boolean).join(' · ') || '—'}</td>
//                     <td>
//                       {a.present
//                         ? <span className="badge badge-success">Present</span>
//                         : <span className="badge badge-dim">Absent</span>}
//                     </td>
//                     <td className="td-mono">{a.accommodationId?.name || '—'}</td>
//                     <td>
//                       <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
//                         {!a.present && (
//                           <button className="btn btn-success btn-sm" onClick={() => doCheckIn(a)}>Check In</button>
//                         )}
//                         <button className="btn btn-ghost btn-sm" onClick={() => setManage(a)}>Manage</button>
//                         <button className="btn btn-icon btn-ghost btn-sm" onClick={() => setConfirm(a)} title="Delete">
//                           <Icons.Trash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {pagination.pages > 1 && (
//         <div className="flex items-center gap-8 mt-12" style={{ justifyContent: 'center' }}>
//           <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
//           <span className="text-muted">{page} / {pagination.pages}</span>
//           <button className="btn btn-ghost btn-sm" disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)}>Next →</button>
//         </div>
//       )}

//       {showAdd && <AddAttendeeModal eventId={activeEvent?._id} onClose={() => setShowAdd(false)} onSaved={() => { setShowAdd(false); reload(); }} />}
//       {showImport && <ImportModal eventId={activeEvent?._id} onClose={() => setShowImport(false)} onSaved={() => { setShowImport(false); reload(); }} />}
//       {manage && <ManageAttendeeModal attendee={manage} eventId={activeEvent?._id} onClose={() => setManage(null)} onSaved={() => { setManage(null); reload(); }} />}
//       {confirm && <Confirm title="Delete Attendee" danger
//         message={`Delete ${confirm.firstName} ${confirm.surname}? This will release their accommodation slot.`}
//         onConfirm={() => doDelete(confirm)} onClose={() => setConfirm(null)} />}
//     </div>
//   );
// }

// function AddAttendeeModal({ eventId, onClose, onSaved }) {
//   const [form, setForm] = useState({ firstName: '', surname: '', gender: '', churchCenter: '', fellowship: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const submit = async () => {
//     if (!form.firstName || !form.surname || !form.gender) return setError('First name, surname and gender are required');
//     setLoading(true); setError('');
//     try { await api.createAttendee({ ...form, eventId }); onSaved(); }
//     catch (e) { setError(e.message); setLoading(false); }
//   };

//   return (
//     <Modal title="Add Attendee" onClose={onClose}
//       footer={<>
//         <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
//         <button className="btn btn-gold btn-sm" onClick={submit} disabled={loading}>{loading ? <Spinner size={14} /> : 'Add'}</button>
//       </>}>
//       {error && <Alert type="danger">{error}</Alert>}
//       <div className="form-row">
//         <div className="form-group"><label className="form-label">First Name *</label><input className="input" value={form.firstName} onChange={e => set('firstName', e.target.value)} /></div>
//         <div className="form-group"><label className="form-label">Surname *</label><input className="input" value={form.surname} onChange={e => set('surname', e.target.value)} /></div>
//       </div>
//       <div className="form-group"><label className="form-label">Gender *</label>
//         <select className="select" value={form.gender} onChange={e => set('gender', e.target.value)}>
//           <option value="">Select gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//       </div>
//       <div className="form-row">
//         <div className="form-group"><label className="form-label">Church Center</label><input className="input" placeholder="e.g. Ibadan" value={form.churchCenter} onChange={e => set('churchCenter', e.target.value)} /></div>
//         <div className="form-group"><label className="form-label">Fellowship</label><input className="input" placeholder="e.g. Agbo" value={form.fellowship} onChange={e => set('fellowship', e.target.value)} /></div>
//       </div>
//     </Modal>
//   );
// }

// function ImportModal({ eventId, onClose, onSaved }) {
//   const [rows, setRows] = useState([]);
//   const [errors, setErrors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState('');

//   const parseCSV = (text) => {
//     const lines = text.trim().split('\n');
//     const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_').replace(/\r/g,''));
//     return lines.slice(1).map(line => {
//       const vals = line.split(',').map(v => v.trim().replace(/\r/g,''));
//       const obj = {};
//       headers.forEach((h, i) => obj[h] = vals[i] || '');
//       // Normalize gender
//       if (obj.gender) obj.gender = obj.gender.charAt(0).toUpperCase() + obj.gender.slice(1).toLowerCase();
//       return obj;
//     }).filter(r => Object.values(r).some(Boolean));
//   };

//   const onFile = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       const parsed = parseCSV(ev.target.result);
//       setRows(parsed);
//       const errs = [];
//       parsed.forEach((r, i) => {
//         if (!r.first_name && !r.firstname) errs.push(`Row ${i+1}: first_name missing`);
//         if (!r.surname) errs.push(`Row ${i+1}: surname missing`);
//         if (!['Male','Female'].includes(r.gender)) errs.push(`Row ${i+1}: gender must be Male/Female`);
//       });
//       setErrors(errs);
//     };
//     reader.readAsText(file);
//   };

//   const doImport = async () => {
//     setLoading(true); setMsg('');
//     try {
//       const attendees = rows.map(r => ({
//         firstName: r.first_name || r.firstname || '',
//         surname: r.surname || '',
//         gender: r.gender,
//         churchCenter: r.church_center || r.churchcenter || '',
//         fellowship: r.fellowship || '',
//       }));
//       const res = await api.importAttendees({ eventId, attendees });
//       setMsg(`✓ Imported ${res.count} attendees`);
//       setTimeout(onSaved, 1200);
//     } catch (e) { setMsg(`Error: ${e.message}`); }
//     finally { setLoading(false); }
//   };

//   return (
//     <Modal title="Import CSV" onClose={onClose}
//       footer={<>
//         <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
//         <button className="btn btn-gold btn-sm" onClick={doImport} disabled={loading || rows.length === 0 || errors.length > 0}>
//           {loading ? <Spinner size={14} /> : `Import ${rows.length} rows`}
//         </button>
//       </>}>
//       <Alert type="info">CSV columns: <code>first_name, surname, gender, church_center, fellowship</code></Alert>
//       <input type="file" accept=".csv,.txt" onChange={onFile} style={{ color: 'var(--text-2)', fontSize: 13 }} />
//       {errors.length > 0 && <Alert type="danger" style={{ marginTop: 12 }}>{errors.slice(0,4).join(', ')}</Alert>}
//       {msg && <Alert type={msg.startsWith('Error') ? 'danger' : 'success'} style={{ marginTop: 12 }}>{msg}</Alert>}
//       {rows.length > 0 && errors.length === 0 && (
//         <div className="table-wrap mt-12" style={{ maxHeight: 220, overflowY: 'auto' }}>
//           <table><thead><tr><th>Name</th><th>Gender</th><th>Center</th><th>Fellowship</th></tr></thead>
//             <tbody>
//               {rows.slice(0, 8).map((r, i) => (
//                 <tr key={i}><td>{r.surname}, {r.first_name || r.firstname}</td><td>{r.gender}</td><td>{r.church_center}</td><td>{r.fellowship}</td></tr>
//               ))}
//             </tbody>
//           </table>
//           {rows.length > 8 && <p className="text-muted text-center mt-8">…and {rows.length - 8} more</p>}
//         </div>
//       )}
//     </Modal>
//   );
// }

// function ManageAttendeeModal({ attendee, eventId, onClose, onSaved }) {
//   const [tab, setTab] = useState('reassign');
//   const [units, setUnits] = useState([]);
//   const [unitId, setUnitId] = useState('');
//   const [useReserved, setUseReserved] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState(null);

//   useEffect(() => {
//     api.getUnits({ eventId, gender: attendee.gender, isActive: true })
//       .then(r => setUnits(r.data || [])).catch(() => {});
//   }, [eventId, attendee.gender]);

//   const doReassign = async () => {
//     if (!unitId) return;
//     setLoading(true); setMsg(null);
//     try {
//       await api.assignAttendee(attendee._id, { unitId, useReserved });
//       setMsg({ type: 'success', text: 'Reassigned successfully' });
//       setTimeout(onSaved, 800);
//     } catch (e) { setMsg({ type: 'danger', text: e.message }); }
//     finally { setLoading(false); }
//   };

//   const doUndo = async () => {
//     setLoading(true); setMsg(null);
//     try {
//       await api.undoCheckIn(attendee._id);
//       setMsg({ type: 'success', text: 'Check-in reversed' });
//       setTimeout(onSaved, 800);
//     } catch (e) { setMsg({ type: 'danger', text: e.message }); }
//     finally { setLoading(false); }
//   };

//   return (
//     <Modal title={`${attendee.firstName} ${attendee.surname}`} onClose={onClose}>
//       <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
//         {genderBadge(attendee.gender)}
//         {attendee.present ? <span className="badge badge-success">Present</span> : <span className="badge badge-dim">Absent</span>}
//         {attendee.accommodationId && <span className="badge badge-gold">{attendee.accommodationId.name}</span>}
//       </div>
//       <div className="tabs">
//         {['reassign','undo','delete'].map(t => (
//           <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
//             {t === 'reassign' ? 'Reassign' : t === 'undo' ? 'Undo Check-In' : 'Delete'}
//           </button>
//         ))}
//       </div>

//       {msg && <Alert type={msg.type}>{msg.text}</Alert>}

//       {tab === 'reassign' && (
//         <div>
//           <div className="form-group">
//             <label className="form-label">Unit</label>
//             <select className="select" value={unitId} onChange={e => setUnitId(e.target.value)}>
//               <option value="">Select unit…</option>
//               {units.map(u => {
//                 const avail = u.capacity - u.reservedSlots - u.currentOccupancy;
//                 return <option key={u._id} value={u._id}>{u.name} ({u.type}) — {avail} slots</option>;
//               })}
//             </select>
//           </div>
//           <label className="checkbox-row mt-8" style={{ marginBottom: 14 }}>
//             <input type="checkbox" checked={useReserved} onChange={e => setUseReserved(e.target.checked)} />
//             Use reserved slot (override)
//           </label>
//           {useReserved && <Alert type="warn">This will use a reserved slot.</Alert>}
//           <button className="btn btn-gold w-full" onClick={doReassign} disabled={!unitId || loading}>
//             {loading ? <Spinner size={14} /> : 'Confirm Reassign'}
//           </button>
//         </div>
//       )}

//       {tab === 'undo' && (
//         <div>
//           {!attendee.present
//             ? <Alert type="info">This attendee is not currently checked in.</Alert>
//             : <>
//                 <Alert type="warn">This will mark the attendee as absent and release their accommodation slot.</Alert>
//                 <button className="btn btn-danger w-full mt-12" onClick={doUndo} disabled={loading}>
//                   {loading ? <Spinner size={14} /> : 'Undo Check-In'}
//                 </button>
//               </>}
//         </div>
//       )}

//       {tab === 'delete' && (
//         <div>
//           <Alert type="danger">This permanently deletes the attendee and releases their accommodation slot.</Alert>
//           <DeleteWithConfirm onConfirm={async () => {
//             setLoading(true);
//             try { await api.deleteAttendee(attendee._id); onSaved(); }
//             catch (e) { setMsg({ type: 'danger', text: e.message }); setLoading(false); }
//           }} />
//         </div>
//       )}
//     </Modal>
//   );
// }

// function DeleteWithConfirm({ onConfirm }) {
//   const [armed, setArmed] = useState(false);
//   if (!armed) return <button className="btn btn-danger w-full mt-12" onClick={() => setArmed(true)}>Delete Permanently</button>;
//   return (
//     <div>
//       <p style={{ color: 'var(--text-2)', fontSize: 13, marginBottom: 12 }}>Are you absolutely sure?</p>
//       <div style={{ display: 'flex', gap: 8 }}>
//         <button className="btn btn-ghost btn-sm" onClick={() => setArmed(false)}>Cancel</button>
//         <button className="btn btn-danger" onClick={onConfirm}>Yes, delete</button>
//       </div>
//     </div>
//   );
// }

// // ── ACCOMMODATION PAGE ────────────────────────────────────────────────────────
// function Accommodation({ activeEvent }) {
//   const [gFilter, setGFilter] = useState('');
//   const [tFilter, setTFilter] = useState('');
//   const [showAdd, setShowAdd] = useState(false);
//   const [detail, setDetail] = useState(null);
//   const [msg, setMsg] = useState(null);

//   const { data, loading, reload } = useAsync(() => {
//     if (!activeEvent) return Promise.resolve({ data: [] });
//     const p = { eventId: activeEvent._id };
//     if (gFilter) p.gender = gFilter;
//     if (tFilter) p.type = tFilter;
//     return api.getUnits(p);
//   }, [activeEvent?._id, gFilter, tFilter]);

//   const units = data?.data || [];

//   const doToggle = async (u) => {
//     try { await api.toggleUnit(u._id); reload(); }
//     catch (e) { setMsg({ type: 'danger', text: e.message }); }
//   };

//   return (
//     <div>
//       <div className="page-header">
//         <div>
//           <h1 className="page-h1">Accommodation</h1>
//           <span className="page-h1-sub">Rooms & Dorms</span>
//         </div>
//         <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(true)}><Icons.Plus /> Add Unit</button>
//       </div>

//       {msg && <Alert type={msg.type}>{msg.text} <button style={{ marginLeft: 8, cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }} onClick={() => setMsg(null)}>×</button></Alert>}

//       <div className="filters">
//         <select className="select" value={gFilter} onChange={e => { setGFilter(e.target.value); }}>
//           <option value="">All Genders</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         <select className="select" value={tFilter} onChange={e => { setTFilter(e.target.value); }}>
//           <option value="">Rooms & Dorms</option>
//           <option value="Room">Rooms</option>
//           <option value="Dorm">Dorms</option>
//         </select>
//         <button className="btn btn-ghost btn-sm" onClick={reload}>↻</button>
//       </div>

//       {loading ? <div className="loading-overlay"><Spinner /></div> : (
//         <div className="unit-grid">
//           {units.map(u => {
//             const pct = u.capacity > 0 ? Math.round((u.currentOccupancy / u.capacity) * 100) : 0;
//             const cls = OccClass(pct);
//             return (
//               <div key={u._id} className={`unit-card ${!u.isActive ? 'inactive' : ''}`}>
//                 <div className="unit-card-top">
//                   <div>
//                     <div className="unit-card-name">{u.name}</div>
//                     <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
//                       {genderBadge(u.gender)}
//                       <span className="badge badge-brown">{u.type}</span>
//                       {!u.isActive && <span className="badge badge-dim">Inactive</span>}
//                     </div>
//                   </div>
//                   <span className={`text-mono occ-${cls}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600 }}>
//                     {u.currentOccupancy}/{u.capacity}
//                   </span>
//                 </div>

//                 <div>
//                   <ProgBar pct={pct} />
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
//                     <span className="text-muted">{u.reservedSlots > 0 ? `${u.reservedSlots} reserved` : ''}</span>
//                     {u.leaderId && (
//                       <span style={{ fontSize: 11, color: 'var(--gold-dim)', fontFamily: 'var(--font-mono)' }}>
//                         ★ {u.leaderId.firstName} {u.leaderId.surname}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {u.occupants?.length > 0 && (
//                   <div className="chip-list">
//                     {u.occupants.slice(0, 4).map(o => (
//                       <span key={o._id} className="chip">{o.firstName} {o.surname[0]}.</span>
//                     ))}
//                     {u.occupants.length > 4 && <span className="chip">+{u.occupants.length - 4}</span>}
//                   </div>
//                 )}

//                 <div style={{ display: 'flex', gap: 7 }}>
//                   <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setDetail(u)}>Details</button>
//                   <button className={`btn btn-sm ${u.isActive ? 'btn-outline' : 'btn-success'}`} onClick={() => doToggle(u)}>
//                     {u.isActive ? 'Deactivate' : 'Activate'}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//           {units.length === 0 && (
//             <div className="empty-state" style={{ gridColumn: '1/-1' }}>
//               <span className="empty-icon">🏠</span>
//               <p>No units found. Add your first room or dorm.</p>
//             </div>
//           )}
//         </div>
//       )}

//       {showAdd && <AddUnitModal eventId={activeEvent?._id} onClose={() => setShowAdd(false)} onSaved={() => { setShowAdd(false); reload(); }} />}
//       {detail && <UnitDetailModal unit={detail} onClose={() => { setDetail(null); reload(); }} />}
//     </div>
//   );
// }

// function AddUnitModal({ eventId, onClose, onSaved }) {
//   const [form, setForm] = useState({ name: '', gender: '', type: 'Room', capacity: '', reservedSlots: '0' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const submit = async () => {
//     if (!form.name || !form.gender || !form.capacity) return setError('Name, gender and capacity are required');
//     setLoading(true); setError('');
//     try {
//       await api.createUnit({ ...form, eventId, capacity: Number(form.capacity), reservedSlots: Number(form.reservedSlots) });
//       onSaved();
//     } catch (e) { setError(e.message); setLoading(false); }
//   };

//   return (
//     <Modal title="Add Unit" onClose={onClose}
//       footer={<>
//         <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
//         <button className="btn btn-gold btn-sm" onClick={submit} disabled={loading}>{loading ? <Spinner size={14} /> : 'Create'}</button>
//       </>}>
//       {error && <Alert type="danger">{error}</Alert>}
//       <div className="form-group"><label className="form-label">Name *</label><input className="input" placeholder="e.g. Room A1" value={form.name} onChange={e => set('name', e.target.value)} /></div>
//       <div className="form-row">
//         <div className="form-group"><label className="form-label">Gender *</label>
//           <select className="select" value={form.gender} onChange={e => set('gender', e.target.value)}>
//             <option value="">Select…</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>
//         <div className="form-group"><label className="form-label">Type</label>
//           <select className="select" value={form.type} onChange={e => set('type', e.target.value)}>
//             <option value="Room">Room</option>
//             <option value="Dorm">Dorm</option>
//           </select>
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group"><label className="form-label">Capacity *</label><input className="input" type="number" min="1" value={form.capacity} onChange={e => set('capacity', e.target.value)} /></div>
//         <div className="form-group"><label className="form-label">Reserved Slots</label><input className="input" type="number" min="0" value={form.reservedSlots} onChange={e => set('reservedSlots', e.target.value)} /></div>
//       </div>
//     </Modal>
//   );
// }

// function UnitDetailModal({ unit: initialUnit, onClose }) {
//   const { data, loading, reload } = useAsync(() => api.getUnit(initialUnit._id), [initialUnit._id]);
//   const u = data?.data || initialUnit;
//   const [leaderId, setLeaderId] = useState('');
//   const [searchQ, setSearchQ] = useState('');
//   const [searchRes, setSearchRes] = useState([]);
//   const [msg, setMsg] = useState(null);
//   const [tab, setTab] = useState('occupants');

//   useEffect(() => {
//     if (!searchQ.trim()) { setSearchRes([]); return; }
//     const t = setTimeout(async () => {
//       try {
//         const r = await api.getAttendees({ search: searchQ, gender: u.gender, limit: 6 });
//         setSearchRes(r.data || []);
//       } catch { setSearchRes([]); }
//     }, 300);
//     return () => clearTimeout(t);
//   }, [searchQ, u.gender]);

//   const doSetLeader = async () => {
//     if (!leaderId) return;
//     try {
//       await api.setLeader(u._id, { attendeeId: leaderId });
//       reload();
//       setMsg({ type: 'success', text: 'Leader set' });
//     } catch (e) { setMsg({ type: 'danger', text: e.message }); }
//   };

//   const doReservedAssign = async (attendeeId) => {
//     try {
//       await api.reservedAssign(u._id, { attendeeId });
//       reload();
//       setSearchQ(''); setSearchRes([]);
//       setMsg({ type: 'success', text: 'Assigned to reserved slot' });
//     } catch (e) { setMsg({ type: 'danger', text: e.message }); }
//   };

//   return (
//     <Modal title={u.name} onClose={onClose} maxWidth={560}>
//       <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
//         {genderBadge(u.gender)}
//         <span className="badge badge-brown">{u.type}</span>
//         <span className="badge badge-gold">{u.currentOccupancy}/{u.capacity}</span>
//         {u.reservedSlots > 0 && <span className="badge badge-dim">{u.reservedSlots} reserved</span>}
//       </div>

//       {msg && <Alert type={msg.type}>{msg.text}</Alert>}

//       <div className="tabs">
//         <button className={`tab ${tab === 'occupants' ? 'active' : ''}`} onClick={() => setTab('occupants')}>Occupants</button>
//         <button className={`tab ${tab === 'leader' ? 'active' : ''}`} onClick={() => setTab('leader')}>Leader</button>
//         {u.reservedSlots > 0 && <button className={`tab ${tab === 'reserved' ? 'active' : ''}`} onClick={() => setTab('reserved')}>Reserved</button>}
//       </div>

//       {loading ? <Spinner /> : (
//         <>
//           {tab === 'occupants' && (
//             u.occupants?.length === 0
//               ? <p className="text-muted text-center">No occupants yet</p>
//               : <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                   {u.occupants?.map(o => (
//                     <div key={o._id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--ink-4)', borderRadius: 6 }}>
//                       <span style={{ flex: 1, fontSize: 13, color: 'var(--text-1)' }}>{o.surname}, {o.firstName}</span>
//                       {u.leaderId?._id === o._id && <span className="badge badge-gold">★ Leader</span>}
//                       {genderBadge(o.gender)}
//                     </div>
//                   ))}
//                 </div>
//           )}

//           {tab === 'leader' && (
//             <div>
//               <div className="form-group">
//                 <label className="form-label">Set Leader (from occupants)</label>
//                 <select className="select" value={leaderId} onChange={e => setLeaderId(e.target.value)}>
//                   <option value="">Select occupant…</option>
//                   {u.occupants?.map(o => <option key={o._id} value={o._id}>{o.firstName} {o.surname}</option>)}
//                 </select>
//               </div>
//               <button className="btn btn-gold" onClick={doSetLeader} disabled={!leaderId}>Set Leader</button>
//               {u.leaderId && (
//                 <button className="btn btn-ghost mt-8" style={{ marginLeft: 8 }} onClick={async () => {
//                   await api.setLeader(u._id, { attendeeId: null }); reload();
//                 }}>Clear Leader</button>
//               )}
//             </div>
//           )}

//           {tab === 'reserved' && (
//             <div>
//               <Alert type="warn">Assigning to reserved slots bypasses the regular allocation limit.</Alert>
//               <div className="form-group mt-12">
//                 <label className="form-label">Search attendee</label>
//                 <input className="input" placeholder="Type name…" value={searchQ} onChange={e => setSearchQ(e.target.value)} />
//               </div>
//               {searchRes.map(a => (
//                 <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'var(--ink-4)', borderRadius: 6, marginBottom: 5 }}>
//                   <span style={{ fontSize: 13, color: 'var(--text-1)' }}>{a.firstName} {a.surname}</span>
//                   <button className="btn btn-gold btn-sm" onClick={() => doReservedAssign(a._id)}>Assign</button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </Modal>
//   );
// }

// // ── REPORTS PAGE ──────────────────────────────────────────────────────────────
// function Reports({ activeEvent }) {
//   const [tab, setTab] = useState('attendance');
//   const [gFilter, setGFilter] = useState('');
//   const [pFilter, setPFilter] = useState('true');

//   const { data: sheet, loading: sl, reload: rr } = useAsync(() => {
//     if (!activeEvent) return Promise.resolve({ data: [] });
//     const p = { eventId: activeEvent._id };
//     if (gFilter) p.gender = gFilter;
//     if (pFilter) p.present = pFilter;
//     return api.getAttendanceSheet(p);
//   }, [activeEvent?._id, gFilter, pFilter, tab]);

//   const { data: manifest, loading: ml } = useAsync(() => {
//     if (!activeEvent || tab !== 'manifest') return Promise.resolve({ data: [] });
//     return api.getRoomManifest(activeEvent._id);
//   }, [activeEvent?._id, tab]);

//   const { data: unassigned, loading: ul } = useAsync(() => {
//     if (!activeEvent || tab !== 'unassigned') return Promise.resolve({ data: [] });
//     return api.getUnassigned(activeEvent._id);
//   }, [activeEvent?._id, tab]);

//   const exportCSV = () => {
//     const rows = sheet?.data || [];
//     const header = 'No,Surname,First Name,Gender,Church Center,Fellowship,Status,Unit\n';
//     const body = rows.map(r => `${r.no},${r.surname},${r.firstName},${r.gender},${r.churchCenter},${r.fellowship},${r.present ? 'Present' : 'Absent'},${r.unit || ''}`).join('\n');
//     const blob = new Blob([header + body], { type: 'text/csv' });
//     const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
//     a.download = `attendance-${activeEvent?.name || 'export'}.csv`; a.click();
//   };

//   const printSheet = () => {
//     const rows = sheet?.data || [];
//     const html = `<html><head><title>Attendance</title><style>
//       body{font-family:Georgia,serif;font-size:12px;color:#111;padding:24px}
//       h1{font-size:20px;margin-bottom:4px}
//       p{color:#555;margin-bottom:16px}
//       table{width:100%;border-collapse:collapse}
//       th,td{border:1px solid #ccc;padding:6px 10px;text-align:left}
//       th{background:#f0f0f0;font-weight:600}
//       tr:nth-child(even){background:#fafafa}
//       @media print{body{padding:0}}
//     </style></head><body>
//       <h1>${activeEvent?.name}</h1>
//       <p>Attendance Sheet · ${new Date().toLocaleDateString()}</p>
//       <table><thead><tr><th>#</th><th>Surname</th><th>First Name</th><th>Gender</th><th>Center</th><th>Fellowship</th><th>Unit</th></tr></thead>
//       <tbody>${rows.map(r => `<tr><td>${r.no}</td><td>${r.surname}</td><td>${r.firstName}</td><td>${r.gender}</td><td>${r.churchCenter||''}</td><td>${r.fellowship||''}</td><td>${r.unit||''}</td></tr>`).join('')}</tbody>
//       </table></body></html>`;
//     const w = window.open('', '_blank'); w.document.write(html); w.document.close(); w.print();
//   };

//   if (!activeEvent) return <div className="empty-state"><span className="empty-icon">📋</span><p>No active event.</p></div>;

//   return (
//     <div>
//       <div className="page-header">
//         <div>
//           <h1 className="page-h1">Reports</h1>
//           <span className="page-h1-sub">{activeEvent.name}</span>
//         </div>
//         {tab === 'attendance' && (
//           <div style={{ display: 'flex', gap: 8 }}>
//             <button className="btn btn-ghost btn-sm" onClick={exportCSV}><Icons.Download /> CSV</button>
//             <button className="btn btn-ghost btn-sm" onClick={printSheet}><Icons.Download /> Print / PDF</button>
//           </div>
//         )}
//       </div>

//       <div className="tabs">
//         <button className={`tab ${tab === 'attendance' ? 'active' : ''}`} onClick={() => setTab('attendance')}>Attendance</button>
//         <button className={`tab ${tab === 'manifest' ? 'active' : ''}`} onClick={() => setTab('manifest')}>Room Manifest</button>
//         <button className={`tab ${tab === 'unassigned' ? 'active' : ''}`} onClick={() => setTab('unassigned')}>Unassigned</button>
//       </div>

//       {tab === 'attendance' && (
//         <>
//           <div className="filters mb-16">
//             <select className="select" value={gFilter} onChange={e => setGFilter(e.target.value)}>
//               <option value="">All Genders</option><option value="Male">Male</option><option value="Female">Female</option>
//             </select>
//             <select className="select" value={pFilter} onChange={e => setPFilter(e.target.value)}>
//               <option value="">All</option><option value="true">Present only</option><option value="false">Absent only</option>
//             </select>
//           </div>
//           <div className="card">
//             {sl ? <div className="loading-overlay"><Spinner /></div> : (
//               <div className="table-wrap">
//                 <table>
//                   <thead><tr><th>#</th><th>Surname</th><th>First Name</th><th>Gender</th><th>Center / Fellowship</th><th>Unit</th></tr></thead>
//                   <tbody>
//                     {(sheet?.data || []).map(r => (
//                       <tr key={r.no}>
//                         <td className="text-muted">{r.no}</td>
//                         <td className="td-name">{r.surname}</td>
//                         <td>{r.firstName}</td>
//                         <td>{genderBadge(r.gender)}</td>
//                         <td className="text-muted">{[r.churchCenter, r.fellowship].filter(Boolean).join(' · ') || '—'}</td>
//                         <td className="td-mono">{r.unit || '—'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {(sheet?.data || []).length === 0 && <div className="empty-state"><p>No records</p></div>}
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {tab === 'manifest' && (
//         <div>
//           {ml ? <div className="loading-overlay"><Spinner /></div> :
//             (manifest?.data || []).map(m => (
//               <div key={m.unit._id} className="card mb-16" style={{ marginBottom: 14 }}>
//                 <div className="card-header">
//                   <span className="card-title">{m.unit.name}</span>
//                   <div style={{ display: 'flex', gap: 6 }}>
//                     {genderBadge(m.unit.gender)}
//                     <span className="badge badge-brown">{m.unit.type}</span>
//                     <span className="badge badge-gold">{m.unit.currentOccupancy}/{m.unit.capacity}</span>
//                   </div>
//                 </div>
//                 <div className="card-body" style={{ padding: '12px 16px' }}>
//                   {m.occupants.length === 0 ? <p className="text-muted">Empty</p> :
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
//                       {m.occupants.map((o, i) => (
//                         <span key={o._id} className="chip" style={{ fontSize: 12 }}>
//                           {i + 1}. {o.surname}, {o.firstName}
//                           {m.unit.leader === `${o.firstName} ${o.surname}` ? ' ★' : ''}
//                         </span>
//                       ))}
//                     </div>}
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}

//       {tab === 'unassigned' && (
//         <div className="card">
//           {ul ? <div className="loading-overlay"><Spinner /></div> : (
//             <>
//               {(unassigned?.data || []).length > 0 && (
//                 <div className="alert alert-warn" style={{ margin: 16 }}>
//                   {unassigned.count} checked-in attendees have no accommodation assigned.
//                 </div>
//               )}
//               <div className="table-wrap">
//                 <table>
//                   <thead><tr><th>Name</th><th>Gender</th><th>Center / Fellowship</th></tr></thead>
//                   <tbody>
//                     {(unassigned?.data || []).map(a => (
//                       <tr key={a._id}>
//                         <td className="td-name">{a.surname}, {a.firstName}</td>
//                         <td>{genderBadge(a.gender)}</td>
//                         <td className="text-muted">{[a.churchCenter, a.fellowship].filter(Boolean).join(' · ') || '—'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {(unassigned?.data || []).length === 0 && <div className="empty-state"><span className="empty-icon">✓</span><p>All checked-in attendees are assigned</p></div>}
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── EVENTS PAGE ───────────────────────────────────────────────────────────────
// function Events({ onEventChange }) {
//   const [showAdd, setShowAdd] = useState(false);
//   const [confirm, setConfirm] = useState(null);
//   const [msg, setMsg] = useState(null);

//   const { data, loading, reload } = useAsync(() => api.getEvents(), []);
//   const events = data?.data || [];

//   const doActivate = async (ev) => {
//     try { await api.activateEvent(ev._id); reload(); onEventChange(); setMsg({ type: 'success', text: `${ev.name} is now active` }); }
//     catch (e) { setMsg({ type: 'danger', text: e.message }); }
//   };

//   const doDelete = async (ev) => {
//     try { await api.deleteEvent(ev._id); reload(); onEventChange(); setMsg({ type: 'success', text: 'Event deleted' }); }
//     catch (e) { setMsg({ type: 'danger', text: e.message }); }
//     setConfirm(null);
//   };

//   return (
//     <div>
//       <div className="page-header">
//         <div><h1 className="page-h1">Events</h1></div>
//         <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(true)}><Icons.Plus /> New Event</button>
//       </div>

//       {msg && <Alert type={msg.type}>{msg.text} <button style={{ marginLeft: 8, cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }} onClick={() => setMsg(null)}>×</button></Alert>}

//       {loading ? <div className="loading-overlay"><Spinner /></div> : (
//         <div className="grid-2">
//           {events.map(ev => (
//             <div key={ev._id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
//               {ev.isActive && (
//                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))' }} />
//               )}
//               <div className="card-body">
//                 <div className="flex justify-between items-center gap-8 mb-8">
//                   <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-1)', fontWeight: 700 }}>{ev.name}</h3>
//                   {ev.isActive && <span className="badge badge-gold">Active</span>}
//                 </div>
//                 <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 4 }}>📍 {ev.venue}</p>
//                 <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>{fmtDate(ev.startDate)} → {fmtDate(ev.endDate)}</p>
//                 <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold-light)', fontWeight: 700 }}>{ev.registered}</div>
//                     <div style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>REGISTERED</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--success)', fontWeight: 700 }}>{ev.present}</div>
//                     <div style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>PRESENT</div>
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', gap: 8 }}>
//                   {!ev.isActive && <button className="btn btn-gold btn-sm" onClick={() => doActivate(ev)}>Set Active</button>}
//                   <button className="btn btn-danger btn-sm" onClick={() => setConfirm(ev)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {events.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>
//             <span className="empty-icon">📅</span><p>No events yet. Create your first one.</p>
//           </div>}
//         </div>
//       )}

//       {showAdd && <AddEventModal onClose={() => setShowAdd(false)} onSaved={() => { setShowAdd(false); reload(); onEventChange(); }} />}
//       {confirm && <Confirm title="Delete Event" danger
//         message={`Delete "${confirm.name}"? This will permanently delete all attendees and accommodation units for this event.`}
//         onConfirm={() => doDelete(confirm)} onClose={() => setConfirm(null)} />}
//     </div>
//   );
// }

// function AddEventModal({ onClose, onSaved }) {
//   const [form, setForm] = useState({ name: '', venue: '', startDate: '', endDate: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const submit = async () => {
//     if (!form.name || !form.venue || !form.startDate || !form.endDate) return setError('All fields are required');
//     setLoading(true); setError('');
//     try { await api.createEvent(form); onSaved(); }
//     catch (e) { setError(e.message); setLoading(false); }
//   };

//   return (
//     <Modal title="New Event" onClose={onClose}
//       footer={<>
//         <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
//         <button className="btn btn-gold btn-sm" onClick={submit} disabled={loading}>{loading ? <Spinner size={14} /> : 'Create'}</button>
//       </>}>
//       {error && <Alert type="danger">{error}</Alert>}
//       <div className="form-group"><label className="form-label">Event Name *</label><input className="input" placeholder="Annual Conference 2025" value={form.name} onChange={e => set('name', e.target.value)} /></div>
//       <div className="form-group"><label className="form-label">Venue *</label><input className="input" placeholder="Grace Hall, Ibadan" value={form.venue} onChange={e => set('venue', e.target.value)} /></div>
//       <div className="form-row">
//         <div className="form-group"><label className="form-label">Start Date *</label><input className="input" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} /></div>
//         <div className="form-group"><label className="form-label">End Date *</label><input className="input" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} /></div>
//       </div>
//     </Modal>
//   );
// }

// // ── SIDEBAR COMPONENT ─────────────────────────────────────────────────────────
// function Sidebar({ page, setPage, activeEvent, sidebarOpen, setSidebarOpen }) {
//   const nav = [
//     { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', Icon: Icons.Dashboard }] },
//     { section: 'Operations', items: [
//       { id: 'checkin',      label: 'Check‑In',     Icon: Icons.CheckIn },
//       { id: 'attendees',   label: 'Attendees',    Icon: Icons.Attendees },
//       { id: 'accommodation', label: 'Accommodation', Icon: Icons.Rooms },
//     ]},
//     { section: 'Reports', items: [{ id: 'reports', label: 'Reports', Icon: Icons.Reports }] },
//     { section: 'Setup',   items: [{ id: 'events',  label: 'Events',   Icon: Icons.Events }] },
//   ];

//   const go = (id) => { setPage(id); setSidebarOpen(false); };

//   return (
//     <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-logo">
//         <span className="sidebar-logo-mark">ACCOMS</span>
//         <span className="sidebar-logo-sub">Accommodation System</span>
//       </div>

//       {activeEvent && (
//         <div className="sidebar-active-event" onClick={() => go('events')}>
//           <span className="sidebar-active-event-label">Active Event</span>
//           <span className="sidebar-active-event-name">{activeEvent.name}</span>
//         </div>
//       )}

//       <nav className="sidebar-nav">
//         {nav.map(({ section, items }) => (
//           <div key={section}>
//             <span className="nav-section-label">{section}</span>
//             {items.map(({ id, label, Icon }) => (
//               <div key={id} className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => go(id)}>
//                 <div className="nav-icon"><Icon /></div>
//                 {label}
//               </div>
//             ))}
//           </div>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-4)', letterSpacing: '0.1em' }}>
//           ACCOMS v1.0
//         </span>
//       </div>
//     </aside>
//   );
// }

// // ── APP ROOT ──────────────────────────────────────────────────────────────────
// export default function App() {
//   const [page, setPage] = useState('dashboard');
//   const [activeEvent, setActiveEvent] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const loadActiveEvent = useCallback(async () => {
//     try {
//       const res = await api.getActiveEvent();
//       setActiveEvent(res.data);
//     } catch { setActiveEvent(null); }
//   }, []);

//   useEffect(() => { loadActiveEvent(); }, [loadActiveEvent]);

//   // Auto-refresh dashboard stats
//   useEffect(() => {
//     if (page !== 'dashboard') return;
//     const t = setInterval(loadActiveEvent, 30000);
//     return () => clearInterval(t);
//   }, [page, loadActiveEvent]);

//   const pages = {
//     dashboard:     <Dashboard activeEvent={activeEvent} />,
//     checkin:       <CheckIn activeEvent={activeEvent} />,
//     attendees:     <Attendees activeEvent={activeEvent} />,
//     accommodation: <Accommodation activeEvent={activeEvent} />,
//     reports:       <Reports activeEvent={activeEvent} />,
//     events:        <Events onEventChange={loadActiveEvent} />,
//   };

//   const titles = {
//     dashboard: 'Dashboard', checkin: 'Check‑In', attendees: 'Attendees',
//     accommodation: 'Accommodation', reports: 'Reports', events: 'Events',
//   };

//   return (
//     <div className="app-shell">
//       {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

//       <Sidebar
//         page={page} setPage={setPage}
//         activeEvent={activeEvent}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       <div className="main-area">
//         <header className="topbar">
//           <button className="hamburger" onClick={() => setSidebarOpen(o => !o)}>
//             <Icons.Menu />
//           </button>
//           <span className="topbar-title">{titles[page]}</span>
//           {page !== 'checkin' && activeEvent && (
//             <button className="btn btn-gold btn-sm" onClick={() => setPage('checkin')}>
//               <Icons.Zap /> Check In
//             </button>
//           )}
//         </header>

//         <main className="page" key={page}>
//           {pages[page]}
//         </main>
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { api } from './api.js';

// ── THEME CONTEXT ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext({ theme: 'dark', toggle: () => {} });

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('accoms-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('accoms-theme', theme);
  }, [theme]);

  const toggle = useCallback((t) => setTheme(t), []);
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

// ── TOAST CONTEXT ─────────────────────────────────────────────────────────────
const ToastCtx = createContext({ toast: () => {} });
let _toastId = 0;

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, type = 'info') => {
    const id = ++_toastId;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : t.type === 'warn' ? '⚠' : 'ℹ'}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

// ── POLLING HOOK ──────────────────────────────────────────────────────────────
// Polls a fn every `interval` ms. Returns { data, loading, syncing, lastSync, reload }.
// `syncing` = background re-fetch in progress. `loading` = initial fetch only.
function usePolling(fn, deps = [], interval = 15000) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [error, setError]     = useState(null);
  const isMounted = useRef(true);

  const run = useCallback(async (background = false) => {
    if (!isMounted.current) return;
    if (background) setSyncing(true);
    else setLoading(true);
    setError(null);
    try {
      const result = await fn();
      if (isMounted.current) {
        setData(result);
        setLastSync(new Date());
      }
    } catch (e) {
      if (isMounted.current) setError(e.message);
    } finally {
      if (isMounted.current) { setLoading(false); setSyncing(false); }
    }
  }, deps); // eslint-disable-line

  // Initial fetch
  useEffect(() => {
    isMounted.current = true;
    run(false);
    return () => { isMounted.current = false; };
  }, [run]);

  // Polling
  useEffect(() => {
    if (!interval) return;
    const t = setInterval(() => run(true), interval);
    return () => clearInterval(t);
  }, [run, interval]);

  const reload = useCallback(() => run(false), [run]);
  return { data, loading, syncing, lastSync, error, reload };
}

// Simple one-shot async hook (no polling)
function useAsync(fn, deps = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const run = useCallback(async () => {
    setLoading(true); setError(null);
    try { setData(await fn()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, deps); // eslint-disable-line

  useEffect(() => { run(); }, [run]);
  return { data, loading, error, reload: run };
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d={d} />
  </svg>
);

const Icons = {
  Dashboard:    () => <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />,
  CheckIn:      () => <Icon d="M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />,
  Attendees:    () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />,
  Rooms:        () => <Icon d="M3 9.5V19a1 1 0 001 1h16a1 1 0 001-1V9.5L12 3z M9 22V12h6v10" />,
  Reports:      () => <Icon d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />,
  Events:       () => <Icon d="M8 2v4 M16 2v4 M3 10h18 M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  Search:       () => <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  Plus:         () => <Icon d="M12 5v14M5 12h14" />,
  Trash:        () => <Icon d="M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6" />,
  Edit:         () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z" />,
  Menu:         () => <Icon d="M3 12h18M3 6h18M3 18h18" />,
  Upload:       () => <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12" />,
  ChevronRight: () => <Icon d="M9 18l6-6-6-6" />,
  Zap:          () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9z" />,
  Download:     () => <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" />,
  Sun:          () => <Icon d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 100 14A7 7 0 0012 5z" />,
  Moon:         () => <Icon d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />,
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const fmtTime = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

function occClass(pct) {
  if (pct >= 100) return 'full';
  if (pct >= 75)  return 'warn';
  return 'ok';
}

function GenderBadge({ g }) {
  return <span className={`badge badge-${g === 'Male' ? 'male' : 'female'}`}>{g}</span>;
}

// ── SHARED UI ─────────────────────────────────────────────────────────────────
function Spinner({ size = 20 }) {
  return <div className="spinner" style={{ width: size, height: size }} />;
}

function ProgBar({ pct }) {
  const cls = occClass(pct);
  return (
    <div className="prog-bar">
      <div className={`prog-fill ${cls}`} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

function Alert({ type = 'info', children }) {
  return <div className={`alert alert-${type}`}>{children}</div>;
}

function Modal({ title, onClose, children, footer, maxWidth }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={maxWidth ? { maxWidth } : {}}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

function Confirm({ title, message, onConfirm, onClose, danger }) {
  return (
    <Modal title={title} onClose={onClose} maxWidth={380}
      footer={<>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className={`btn btn-sm ${danger ? 'btn-danger' : 'btn-gold'}`} onClick={onConfirm}>Confirm</button>
      </>}>
      <p style={{ color: 'var(--text-2)', fontSize: 14 }}>{message}</p>
    </Modal>
  );
}

function FellowshipInput({ value, onChange, fellowships = [] }) {
  return (
    <>
      <input className="input" list="fl-list" placeholder="e.g. Agbo, Song, Ibadan…"
        value={value} onChange={e => onChange(e.target.value)} />
      <datalist id="fl-list">
        {fellowships.map(f => <option key={f} value={f} />)}
      </datalist>
    </>
  );
}

// ── LIVE INDICATOR ────────────────────────────────────────────────────────────
function LiveIndicator({ syncing, lastSync }) {
  const dotClass = syncing ? 'syncing' : lastSync ? '' : 'stale';
  return (
    <div className="live-indicator">
      <div className={`live-dot ${dotClass}`} />
      <span className="live-label">
        {syncing ? 'Syncing…' : lastSync ? `${fmtTime(lastSync)}` : 'Offline'}
      </span>
    </div>
  );
}

// ── THEME TOGGLE ──────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeCtx);
  return (
    <div className="theme-toggle">
      <button className={`theme-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => toggle('light')} title="Light mode">
        <Icons.Sun />
      </button>
      <button className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => toggle('dark')} title="Dark mode">
        <Icons.Moon />
      </button>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ activeEvent }) {
  const { toast } = useContext(ToastCtx);
  const eid = activeEvent?._id;
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const { data: statsRes, syncing: ss, lastSync: sl, reload: sr } =
    usePolling(() => eid ? api.getStats(eid) : Promise.resolve({ data: {} }), [eid], 12000);

  const { data: occRes, syncing: os, reload: or } =
    usePolling(() => eid ? api.getOccupancy(eid) : Promise.resolve({ data: [] }), [eid], 12000);

  const { data: distRes } =
    usePolling(() => eid ? api.getDistribution(eid) : Promise.resolve({ data: {} }), [eid], 20000);

  if (!activeEvent) return (
    <div className="empty-state">
      <span className="empty-icon">📅</span>
      <p>No active event. Go to Events and activate one.</p>
    </div>
  );

  const s = statsRes?.data || {};
  const rooms = (occRes?.data || []).filter(u => u.type === 'Room');
  const dorms = (occRes?.data || []).filter(u => u.type === 'Dorm');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-h1">Overview</h1>
          <span className="page-h1-sub">{activeEvent.name} · {fmtDate(activeEvent.startDate)}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <LiveIndicator syncing={ss || os} lastSync={sl} />
          <button className="btn btn-gold btn-sm" onClick={() => setShowQuickAdd(true)}>
            <Icons.Plus /> Add Attendee
          </button>
        </div>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Registered',   value: s.registered   ?? '—', sub: 'total attendees' },
          { label: 'Checked In',   value: s.present       ?? '—', sub: `${s.presentPercent ?? 0}% of registered` },
          { label: 'Males',        value: s.malePresent   ?? '—', sub: 'present' },
          { label: 'Females',      value: s.femalePresent ?? '—', sub: 'present' },
          { label: 'Assigned',     value: s.assigned      ?? '—', sub: 'in rooms/dorms' },
          { label: 'Active Units', value: s.activeUnits   ?? '—', sub: `${s.activeRooms ?? 0} rooms · ${s.activeDorms ?? 0} dorms` },
        ].map(c => (
          <div className="stat-card" key={c.label}>
            <span className="stat-label">{c.label}</span>
            <span className="stat-value">{c.value}</span>
            <span className="stat-sub">{c.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Rooms</span>
            {os && <Spinner size={14} />}
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {rooms.length === 0 ? <p className="text-muted text-center">No rooms</p> :
              rooms.map(u => <UnitBar key={u._id} u={u} />)}
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Dorms</span>
            {os && <Spinner size={14} />}
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {dorms.length === 0 ? <p className="text-muted text-center">No dorms</p> :
              dorms.map(u => <UnitBar key={u._id} u={u} />)}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <DistCard title="Fellowship / Centre Breakdown" items={distRes?.data?.byFellowship || []} />
        <DistCard title="Gender Breakdown" items={[
          { name: 'Male',   count: s.malePresent   ?? 0 },
          { name: 'Female', count: s.femalePresent ?? 0 },
        ]} />
      </div>

      {showQuickAdd && (
        <AddAttendeeModal eventId={activeEvent._id}
          onClose={() => setShowQuickAdd(false)}
          onSaved={() => { setShowQuickAdd(false); sr(); toast('Attendee added', 'success'); }} />
      )}
    </div>
  );
}

function UnitBar({ u }) {
  const pct = u.capacity > 0 ? Math.round((u.currentOccupancy / u.capacity) * 100) : 0;
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="flex justify-between items-center gap-8" style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{u.name}</span>
        <span className={`td-mono occ-${occClass(pct)}`} style={{ fontSize: 12 }}>{u.currentOccupancy}/{u.capacity}</span>
      </div>
      <ProgBar pct={pct} />
      {u.reservedSlots > 0 && <span style={{ fontSize: 10, color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>{u.reservedSlots} reserved</span>}
    </div>
  );
}

function DistCard({ title, items = [] }) {
  const max = Math.max(...items.map(i => i.count), 1);
  return (
    <div className="card">
      <div className="card-header"><span className="card-title">{title}</span></div>
      <div className="card-body" style={{ padding: '12px 16px' }}>
        {items.slice(0, 10).map(item => (
          <div key={item.name} style={{ marginBottom: 8 }}>
            <div className="flex justify-between" style={{ marginBottom: 3 }}>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{item.name || 'Unknown'}</span>
              <span className="text-mono" style={{ fontSize: 11, color: 'var(--gold)' }}>{item.count}</span>
            </div>
            <div className="prog-bar"><div className="prog-fill gold" style={{ width: `${(item.count / max) * 100}%` }} /></div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted text-center">No data yet</p>}
      </div>
    </div>
  );
}

// ── CHECK-IN ──────────────────────────────────────────────────────────────────
function CheckIn({ activeEvent }) {
  const { toast } = useContext(ToastCtx);
  const [query, setQuery]         = useState('');
  const [results, setResults]     = useState([]);
  const [searching, setSearching] = useState(false);
  const [checking, setChecking]   = useState(false);
  const [result, setResult]       = useState(null);
  const [error, setError]         = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!query.trim() || !activeEvent) { setResults([]); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      try { const r = await api.getAttendees({ eventId: activeEvent._id, search: query, limit: 8 }); setResults(r.data || []); }
      catch { setResults([]); }
      finally { setSearching(false); }
    }, 280);
    return () => clearTimeout(t);
  }, [query, activeEvent]);

  const doCheckIn = async (a) => {
    setChecking(true); setError('');
    try {
      const res = await api.checkIn(a._id);
      setResult(res);
      setQuery(''); setResults([]);
      if (!res.alreadyIn) toast(`${a.firstName} checked in → ${res.attendee?.accommodationId?.name || 'assigned'}`, 'success');
    } catch (e) { setError(e.message); toast(e.message, 'error'); }
    finally { setChecking(false); }
  };

  const reset = () => { setResult(null); setError(''); setTimeout(() => inputRef.current?.focus(), 50); };

  if (!activeEvent) return <div className="empty-state"><span className="empty-icon">📅</span><p>No active event.</p></div>;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div className="page-header">
        <div><h1 className="page-h1">Check‑In</h1><span className="page-h1-sub">{activeEvent.name}</span></div>
      </div>

      {result ? (
        result.alreadyIn ? (
          <div className="checkin-already">
            <div style={{ fontSize: 28 }}>⚠️</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: '10px 0 6px', color: 'var(--text-1)' }}>
              {result.attendee?.firstName} {result.attendee?.surname}
            </p>
            <p style={{ color: 'var(--warn)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Already checked in</p>
            <button className="btn btn-outline mt-16" onClick={reset}>Next →</button>
          </div>
        ) : (
          <div className="checkin-success">
            <div style={{ fontSize: 32 }}>✅</div>
            <p className="checkin-success-name">{result.attendee?.firstName} {result.attendee?.surname}</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <GenderBadge g={result.attendee?.gender} />
              {result.attendee?.fellowship && <span className="badge badge-dim">{result.attendee.fellowship}</span>}
            </div>
            {result.attendee?.accommodationId && (
              <p className="checkin-success-room">🏠 {result.attendee.accommodationId?.name || result.attendee.accommodationId}</p>
            )}
            <button className="btn btn-gold mt-16" onClick={reset}>Next →</button>
          </div>
        )
      ) : (
        <>
          <div className="checkin-search-wrap">
            <div className="checkin-search-icon"><Icons.Search /></div>
            <input ref={inputRef} className="checkin-input" placeholder="Search by name…"
              value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && results.length === 1) doCheckIn(results[0]); }}
              autoComplete="off" />
          </div>

          {error && <Alert type="danger">{error}</Alert>}
          {checking && <div className="loading-overlay"><Spinner size={32} /></div>}

          {results.length > 0 && (
            <div className="checkin-results">
              {results.map(a => (
                <div key={a._id} className="checkin-result-item" onClick={() => doCheckIn(a)}>
                  <div>
                    <div className="checkin-result-name">{a.surname}, {a.firstName}</div>
                    <div className="checkin-result-meta">{a.fellowship || '—'}{a.phone ? ` · ${a.phone}` : ''}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <GenderBadge g={a.gender} />
                    {a.present && <span className="badge badge-success">In</span>}
                    <Icons.ChevronRight />
                  </div>
                </div>
              ))}
            </div>
          )}

          {searching && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}><Spinner /></div>}

          {query.trim() && !searching && results.length === 0 && (
            <div className="empty-state" style={{ padding: 30 }}>
              <p>No attendees match "<strong>{query}</strong>"</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── ATTENDEES ─────────────────────────────────────────────────────────────────
function Attendees({ activeEvent }) {
  const { toast } = useContext(ToastCtx);
  const [search, setSearch]   = useState('');
  const [gFilter, setGFilter] = useState('');
  const [pFilter, setPFilter] = useState('');
  const [page, setPage]       = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [manage, setManage]   = useState(null);
  const [confirm, setConfirm] = useState(null);

  const { data, loading, syncing, lastSync, reload } = usePolling(() => {
    if (!activeEvent) return Promise.resolve({ data: [], pagination: {} });
    const p = { eventId: activeEvent._id, page, limit: 40 };
    if (search) p.search = search;
    if (gFilter) p.gender = gFilter;
    if (pFilter) p.present = pFilter;
    return api.getAttendees(p);
  }, [activeEvent?._id, search, gFilter, pFilter, page], 18000);

  const attendees  = data?.data || [];
  const pagination = data?.pagination || {};

  const doDelete = async (a) => {
    try { await api.deleteAttendee(a._id); reload(); toast(`${a.firstName} deleted`, 'info'); }
    catch (e) { toast(e.message, 'error'); }
    setConfirm(null);
  };

  const doCheckIn = async (a) => {
    try {
      const res = await api.checkIn(a._id); reload();
      if (res.alreadyIn) toast(`${a.firstName} already checked in`, 'warn');
      else toast(`${a.firstName} checked in → ${res.attendee?.accommodationId?.name || ''}`, 'success');
    } catch (e) { toast(e.message, 'error'); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-h1">Attendees</h1>
          <span className="page-h1-sub">{activeEvent?.name || 'No active event'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <LiveIndicator syncing={syncing} lastSync={lastSync} />
          <button className="btn btn-ghost btn-sm" onClick={() => setShowImport(true)}><Icons.Upload /> Import</button>
          <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(true)}><Icons.Plus /> Add</button>
        </div>
      </div>

      <div className="filters">
        <input className="input" placeholder="Search name, fellowship, phone…"
          value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="select" value={gFilter} onChange={e => { setGFilter(e.target.value); setPage(1); }}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select className="select" value={pFilter} onChange={e => { setPFilter(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="true">Present</option>
          <option value="false">Absent</option>
        </select>
        <button className="btn btn-ghost btn-sm" onClick={reload} title="Refresh">↻</button>
      </div>

      <div className="card">
        {loading ? <div className="loading-overlay"><Spinner /></div> :
          attendees.length === 0 ? (
            <div className="empty-state"><span className="empty-icon">👥</span><p>No attendees found</p></div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th><th>Gender</th><th>Fellowship / Centre</th>
                    <th>Contact</th><th>Status</th><th>Unit</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map(a => (
                    <tr key={a._id}>
                      <td className="td-name">{a.surname}, {a.firstName}</td>
                      <td><GenderBadge g={a.gender} /></td>
                      <td className="text-muted">{a.fellowship || '—'}</td>
                      <td style={{ fontSize: 11, color: 'var(--text-3)' }}>
                        {a.phone && <div>{a.phone}</div>}
                        {a.email && <div>{a.email}</div>}
                        {!a.phone && !a.email && '—'}
                      </td>
                      <td>
                        {a.present
                          ? <span className="badge badge-success">Present</span>
                          : <span className="badge badge-dim">Absent</span>}
                      </td>
                      <td className="td-mono">{a.accommodationId?.name || '—'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
                          {!a.present && <button className="btn btn-success btn-sm" onClick={() => doCheckIn(a)}>Check In</button>}
                          <button className="btn btn-ghost btn-sm" onClick={() => setManage(a)}>Manage</button>
                          <button className="btn btn-icon btn-ghost btn-sm" onClick={() => setConfirm(a)}><Icons.Trash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {pagination.pages > 1 && (
        <div className="flex items-center gap-8 mt-12" style={{ justifyContent: 'center' }}>
          <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="text-muted">{page} / {pagination.pages}</span>
          <button className="btn btn-ghost btn-sm" disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}

      {showAdd && <AddAttendeeModal eventId={activeEvent?._id} onClose={() => setShowAdd(false)}
        onSaved={() => { setShowAdd(false); reload(); toast('Attendee added', 'success'); }} />}

      {showImport && <ImportModal eventId={activeEvent?._id} onClose={() => setShowImport(false)}
        onSaved={(n) => { setShowImport(false); reload(); toast(`Imported ${n} attendees`, 'success'); }} />}

      {manage && <ManageAttendeeModal attendee={manage} eventId={activeEvent?._id}
        onClose={() => setManage(null)} onSaved={() => { setManage(null); reload(); }} />}

      {confirm && <Confirm title="Delete Attendee" danger
        message={`Delete ${confirm.firstName} ${confirm.surname}? This releases their accommodation slot.`}
        onConfirm={() => doDelete(confirm)} onClose={() => setConfirm(null)} />}
    </div>
  );
}

// ── ADD ATTENDEE MODAL ────────────────────────────────────────────────────────
function AddAttendeeModal({ eventId, onClose, onSaved }) {
  const [form, setForm] = useState({ firstName: '', surname: '', gender: '', fellowship: '', phone: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [fellowships, setFellowships] = useState([]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { api.getFellowships(eventId).then(r => setFellowships(r.data || [])).catch(() => {}); }, [eventId]);

  const submit = async () => {
    if (!form.firstName || !form.surname || !form.gender) return setError('First name, surname and gender are required');
    setLoading(true); setError('');
    try { await api.createAttendee({ ...form, eventId }); onSaved(); }
    catch (e) { setError(e.message); setLoading(false); }
  };

  return (
    <Modal title="Add Attendee" onClose={onClose}
      footer={<>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-gold btn-sm" onClick={submit} disabled={loading}>{loading ? <Spinner size={14} /> : 'Add'}</button>
      </>}>
      {error && <Alert type="danger">{error}</Alert>}
      <div className="form-row">
        <div className="form-group"><label className="form-label">First Name *</label><input className="input" value={form.firstName} onChange={e => set('firstName', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">Surname *</label><input className="input" value={form.surname} onChange={e => set('surname', e.target.value)} /></div>
      </div>
      <div className="form-group"><label className="form-label">Gender *</label>
        <select className="select" value={form.gender} onChange={e => set('gender', e.target.value)}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group"><label className="form-label">Fellowship / Church Centre</label>
        <FellowshipInput value={form.fellowship} onChange={v => set('fellowship', v)} fellowships={fellowships} />
      </div>
      <div className="form-row">
        <div className="form-group"><label className="form-label">Phone</label><input className="input" type="tel" placeholder="+234…" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">Email</label><input className="input" type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
      </div>
      <div className="form-group"><label className="form-label">Address / Location</label><input className="input" placeholder="City, State" value={form.address} onChange={e => set('address', e.target.value)} /></div>
    </Modal>
  );
}

// ── IMPORT MODAL ──────────────────────────────────────────────────────────────
function ImportModal({ eventId, onClose, onSaved }) {
  const [rows, setRows]       = useState([]);
  const [errors, setErrors]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState('');

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[\s-]+/g,'_').replace(/\r/g,''));
    return lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim().replace(/\r/g,''));
      const obj = {};
      headers.forEach((h, i) => obj[h] = vals[i] || '');
      if (obj.gender) obj.gender = obj.gender.charAt(0).toUpperCase() + obj.gender.slice(1).toLowerCase();
      return obj;
    }).filter(r => Object.values(r).some(Boolean));
  };

  const onFile = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const parsed = parseCSV(ev.target.result); setRows(parsed);
      const errs = [];
      parsed.forEach((r, i) => {
        if (!r.first_name && !r.firstname) errs.push(`Row ${i+1}: first_name missing`);
        if (!r.surname) errs.push(`Row ${i+1}: surname missing`);
        if (!['Male','Female'].includes(r.gender)) errs.push(`Row ${i+1}: gender must be Male/Female`);
      });
      setErrors(errs);
    };
    reader.readAsText(file);
  };

  const doImport = async () => {
    setLoading(true); setMsg('');
    try {
      const attendees = rows.map(r => ({
        firstName:  r.first_name || r.firstname || '',
        surname:    r.surname || '',
        gender:     r.gender,
        fellowship: r.fellowship || r.church_center || r.churchcenter || '',
        phone:      r.phone   || '',
        email:      r.email   || '',
        address:    r.address || '',
      }));
      const res = await api.importAttendees({ eventId, attendees });
      onSaved(res.count);
    } catch (e) { setMsg(`Error: ${e.message}`); }
    finally { setLoading(false); }
  };

  return (
    <Modal title="Import CSV" onClose={onClose}
      footer={<>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-gold btn-sm" onClick={doImport} disabled={loading || rows.length === 0 || errors.length > 0}>
          {loading ? <Spinner size={14} /> : `Import ${rows.length} rows`}
        </button>
      </>}>
      <Alert type="info">
        Columns: <code>first_name, surname, gender, fellowship, phone, email, address</code>
      </Alert>
      <input type="file" accept=".csv,.txt" onChange={onFile} style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 8 }} />
      {errors.length > 0 && <Alert type="danger">{errors.slice(0,3).join(' · ')}</Alert>}
      {msg && <Alert type="danger">{msg}</Alert>}
      {rows.length > 0 && errors.length === 0 && (
        <div className="table-wrap mt-12" style={{ maxHeight: 200, overflowY: 'auto' }}>
          <table>
            <thead><tr><th>Name</th><th>Gender</th><th>Fellowship</th><th>Phone</th></tr></thead>
            <tbody>{rows.slice(0,8).map((r,i) => (
              <tr key={i}>
                <td>{r.surname}, {r.first_name||r.firstname}</td>
                <td>{r.gender}</td>
                <td>{r.fellowship||r.church_center||'—'}</td>
                <td>{r.phone||'—'}</td>
              </tr>
            ))}</tbody>
          </table>
          {rows.length > 8 && <p className="text-muted text-center mt-8">…and {rows.length-8} more</p>}
        </div>
      )}
    </Modal>
  );
}

// ── MANAGE ATTENDEE MODAL ─────────────────────────────────────────────────────
function ManageAttendeeModal({ attendee: initial, eventId, onClose, onSaved }) {
  const { toast } = useContext(ToastCtx);
  const [tab, setTab]           = useState('edit');
  const [attendee, setAttendee] = useState(initial);
  const [units, setUnits]       = useState([]);
  const [unitId, setUnitId]     = useState('');
  const [useReserved, setUseReserved] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [fellowships, setFellowships] = useState([]);

  useEffect(() => {
    api.getUnits({ eventId, gender: attendee.gender, isActive: true }).then(r => setUnits(r.data||[])).catch(()=>{});
    api.getFellowships(eventId).then(r => setFellowships(r.data||[])).catch(()=>{});
  }, [eventId, attendee.gender]);

  const doReassign = async () => {
    if (!unitId) return;
    setLoading(true);
    try { await api.assignAttendee(attendee._id, { unitId, useReserved }); toast('Reassigned', 'success'); onSaved(); }
    catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  };

  const doUndo = async () => {
    setLoading(true);
    try { await api.undoCheckIn(attendee._id); toast('Check-in reversed', 'info'); onSaved(); }
    catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  };

  return (
    <Modal title={`${attendee.firstName} ${attendee.surname}`} onClose={onClose}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <GenderBadge g={attendee.gender} />
        {attendee.present ? <span className="badge badge-success">Present</span> : <span className="badge badge-dim">Absent</span>}
        {attendee.accommodationId && <span className="badge badge-gold">{attendee.accommodationId.name}</span>}
      </div>

      <div className="tabs">
        {['edit','reassign','undo','delete'].map(t => (
          <button key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>
            {t==='edit'?'Edit':t==='reassign'?'Reassign':t==='undo'?'Undo Check-In':'Delete'}
          </button>
        ))}
      </div>

      {tab === 'edit' && (
        <EditAttendeeForm attendee={attendee} fellowships={fellowships}
          onSaved={(updated) => { setAttendee(updated); toast('Saved','success'); onSaved(); }} />
      )}

      {tab === 'reassign' && (
        <div>
          <div className="form-group"><label className="form-label">Unit</label>
            <select className="select" value={unitId} onChange={e => setUnitId(e.target.value)}>
              <option value="">Select unit…</option>
              {units.map(u => {
                const avail = u.capacity - u.reservedSlots - u.currentOccupancy;
                return <option key={u._id} value={u._id}>{u.name} ({u.type}) — {avail} slots</option>;
              })}
            </select>
          </div>
          <label className="checkbox-row mt-8" style={{ marginBottom: 14 }}>
            <input type="checkbox" checked={useReserved} onChange={e => setUseReserved(e.target.checked)} />
            Use reserved slot (override)
          </label>
          {useReserved && <Alert type="warn">This uses a reserved slot.</Alert>}
          <button className="btn btn-gold w-full" onClick={doReassign} disabled={!unitId||loading}>
            {loading ? <Spinner size={14} /> : 'Confirm Reassign'}
          </button>
        </div>
      )}

      {tab === 'undo' && (
        !attendee.present
          ? <Alert type="info">Attendee is not currently checked in.</Alert>
          : <>
              <Alert type="warn">This marks the attendee absent and releases their slot.</Alert>
              <button className="btn btn-danger w-full mt-12" onClick={doUndo} disabled={loading}>
                {loading ? <Spinner size={14} /> : 'Undo Check-In'}
              </button>
            </>
      )}

      {tab === 'delete' && (
        <div>
          <Alert type="danger">Permanently deletes attendee and releases their slot.</Alert>
          <DeleteWithConfirm onConfirm={async () => {
            setLoading(true);
            try { await api.deleteAttendee(attendee._id); toast('Deleted', 'info'); onSaved(); }
            catch (e) { toast(e.message, 'error'); setLoading(false); }
          }} />
        </div>
      )}
    </Modal>
  );
}

function EditAttendeeForm({ attendee, fellowships, onSaved }) {
  const [form, setForm] = useState({
    firstName: attendee.firstName||'', surname: attendee.surname||'',
    fellowship: attendee.fellowship||'', phone: attendee.phone||'',
    email: attendee.email||'', address: attendee.address||'',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const submit = async () => {
    if (!form.firstName||!form.surname) return setError('Name required');
    setLoading(true); setError('');
    try { const res = await api.updateAttendee(attendee._id, form); onSaved(res.data); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div>
      {error && <Alert type="danger">{error}</Alert>}
      <div className="form-row">
        <div className="form-group"><label className="form-label">First Name</label><input className="input" value={form.firstName} onChange={e=>set('firstName',e.target.value)} /></div>
        <div className="form-group"><label className="form-label">Surname</label><input className="input" value={form.surname} onChange={e=>set('surname',e.target.value)} /></div>
      </div>
      <div className="form-group"><label className="form-label">Fellowship / Church Centre</label>
        <FellowshipInput value={form.fellowship} onChange={v=>set('fellowship',v)} fellowships={fellowships} />
      </div>
      <div className="form-row">
        <div className="form-group"><label className="form-label">Phone</label><input className="input" type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} /></div>
        <div className="form-group"><label className="form-label">Email</label><input className="input" type="email" value={form.email} onChange={e=>set('email',e.target.value)} /></div>
      </div>
      <div className="form-group"><label className="form-label">Address</label><input className="input" value={form.address} onChange={e=>set('address',e.target.value)} /></div>
      <button className="btn btn-gold w-full" onClick={submit} disabled={loading}>{loading?<Spinner size={14}/>:'Save Changes'}</button>
    </div>
  );
}

function DeleteWithConfirm({ onConfirm }) {
  const [armed, setArmed] = useState(false);
  if (!armed) return <button className="btn btn-danger w-full mt-12" onClick={()=>setArmed(true)}>Delete Permanently</button>;
  return (
    <div>
      <p style={{ color:'var(--text-2)', fontSize:13, marginBottom:12 }}>Are you absolutely sure?</p>
      <div style={{ display:'flex', gap:8 }}>
        <button className="btn btn-ghost btn-sm" onClick={()=>setArmed(false)}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm}>Yes, delete</button>
      </div>
    </div>
  );
}

// ── ACCOMMODATION ─────────────────────────────────────────────────────────────
function Accommodation({ activeEvent }) {
  const { toast } = useContext(ToastCtx);
  const [gFilter, setGFilter] = useState('');
  const [tFilter, setTFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail]   = useState(null);
  const [editing, setEditing] = useState(null);

  const { data, loading, syncing, lastSync, reload } = usePolling(() => {
    if (!activeEvent) return Promise.resolve({ data: [] });
    const p = { eventId: activeEvent._id };
    if (gFilter) p.gender = gFilter;
    if (tFilter) p.type   = tFilter;
    return api.getUnits(p);
  }, [activeEvent?._id, gFilter, tFilter], 15000);

  const units = data?.data || [];

  const doToggle = async (u) => {
    try { await api.toggleUnit(u._id); reload(); toast(`${u.name} ${u.isActive?'deactivated':'activated'}`, 'info'); }
    catch (e) { toast(e.message, 'error'); }
  };

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-h1">Accommodation</h1><span className="page-h1-sub">Rooms & Dorms</span></div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <LiveIndicator syncing={syncing} lastSync={lastSync} />
          <button className="btn btn-gold btn-sm" onClick={()=>setShowAdd(true)}><Icons.Plus /> Add Unit</button>
        </div>
      </div>

      <div className="filters">
        <select className="select" value={gFilter} onChange={e=>setGFilter(e.target.value)}>
          <option value="">All Genders</option><option value="Male">Male</option><option value="Female">Female</option>
        </select>
        <select className="select" value={tFilter} onChange={e=>setTFilter(e.target.value)}>
          <option value="">Rooms & Dorms</option><option value="Room">Rooms</option><option value="Dorm">Dorms</option>
        </select>
        <button className="btn btn-ghost btn-sm" onClick={reload}>↻</button>
      </div>

      {loading ? <div className="loading-overlay"><Spinner /></div> : (
        <div className="unit-grid">
          {units.map(u => {
            const pct = u.capacity > 0 ? Math.round((u.currentOccupancy/u.capacity)*100) : 0;
            return (
              <div key={u._id} className={`unit-card ${!u.isActive?'inactive':''}`}>
                <div className="unit-card-top">
                  <div>
                    <div className="unit-card-name">{u.name}</div>
                    <div style={{ display:'flex', gap:5, marginTop:5, flexWrap:'wrap' }}>
                      <GenderBadge g={u.gender} />
                      <span className="badge badge-brown">{u.type}</span>
                      {!u.isActive && <span className="badge badge-dim">Inactive</span>}
                    </div>
                  </div>
                  <span className={`td-mono occ-${occClass(pct)}`} style={{ fontSize:14, fontWeight:600 }}>
                    {u.currentOccupancy}/{u.capacity}
                  </span>
                </div>

                <div>
                  <ProgBar pct={pct} />
                  <div className="flex justify-between" style={{ marginTop:4 }}>
                    <span className="text-muted">{u.reservedSlots>0?`${u.reservedSlots} reserved`:''}</span>
                    {u.leaderId && <span style={{ fontSize:11, color:'var(--gold)', fontFamily:'var(--font-mono)' }}>★ {u.leaderId.firstName} {u.leaderId.surname}</span>}
                  </div>
                </div>

                {u.occupants?.length > 0 && (
                  <div className="chip-list">
                    {u.occupants.slice(0,4).map(o => <span key={o._id} className="chip">{o.firstName} {o.surname[0]}.</span>)}
                    {u.occupants.length>4 && <span className="chip">+{u.occupants.length-4}</span>}
                  </div>
                )}

                <div style={{ display:'flex', gap:7 }}>
                  <button className="btn btn-ghost btn-sm" style={{ flex:1 }} onClick={()=>setDetail(u)}>Details</button>
                  <button className="btn btn-ghost btn-sm btn-icon" title="Edit" onClick={()=>setEditing(u)}><Icons.Edit /></button>
                  <button className={`btn btn-sm ${u.isActive?'btn-outline':'btn-success'}`} onClick={()=>doToggle(u)}>
                    {u.isActive?'Deactivate':'Activate'}
                  </button>
                </div>
              </div>
            );
          })}
          {units.length===0 && (
            <div className="empty-state" style={{ gridColumn:'1/-1' }}>
              <span className="empty-icon">🏠</span><p>No units. Add your first room or dorm.</p>
            </div>
          )}
        </div>
      )}

      {showAdd && <AddUnitModal eventId={activeEvent?._id} onClose={()=>setShowAdd(false)}
        onSaved={()=>{ setShowAdd(false); reload(); toast('Unit created','success'); }} />}
      {editing && <EditUnitModal unit={editing} onClose={()=>setEditing(null)}
        onSaved={()=>{ setEditing(null); reload(); toast('Unit updated','success'); }} />}
      {detail && <UnitDetailModal unit={detail} onClose={()=>{ setDetail(null); reload(); }} />}
    </div>
  );
}

function AddUnitModal({ eventId, onClose, onSaved }) {
  const [form, setForm] = useState({ name:'', gender:'', type:'Room', capacity:'', reservedSlots:'0' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    if (!form.name||!form.gender||!form.capacity) return setError('Name, gender and capacity required');
    setLoading(true); setError('');
    try { await api.createUnit({...form, eventId, capacity:Number(form.capacity), reservedSlots:Number(form.reservedSlots)}); onSaved(); }
    catch(e){ setError(e.message); setLoading(false); }
  };

  return (
    <Modal title="Add Unit" onClose={onClose}
      footer={<><button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-gold btn-sm" onClick={submit} disabled={loading}>{loading?<Spinner size={14}/>:'Create'}</button></>}>
      {error && <Alert type="danger">{error}</Alert>}
      <div className="form-group"><label className="form-label">Name *</label><input className="input" placeholder="e.g. Room A1" value={form.name} onChange={e=>set('name',e.target.value)} /></div>
      <div className="form-row">
        <div className="form-group"><label className="form-label">Gender *</label>
          <select className="select" value={form.gender} onChange={e=>set('gender',e.target.value)}>
            <option value="">Select…</option><option value="Male">Male</option><option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group"><label className="form-label">Type</label>
          <select className="select" value={form.type} onChange={e=>set('type',e.target.value)}>
            <option value="Room">Room</option><option value="Dorm">Dorm</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group"><label className="form-label">Capacity *</label><input className="input" type="number" min="1" value={form.capacity} onChange={e=>set('capacity',e.target.value)} /></div>
        <div className="form-group"><label className="form-label">Reserved Slots</label><input className="input" type="number" min="0" value={form.reservedSlots} onChange={e=>set('reservedSlots',e.target.value)} /></div>
      </div>
    </Modal>
  );
}

function EditUnitModal({ unit, onClose, onSaved }) {
  const [form, setForm] = useState({ name:unit.name, type:unit.type, capacity:String(unit.capacity), reservedSlots:String(unit.reservedSlots) });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    const cap = Number(form.capacity), res = Number(form.reservedSlots);
    if (!form.name||!cap) return setError('Name and capacity required');
    if (cap < unit.currentOccupancy) return setError(`Capacity cannot be below current occupancy (${unit.currentOccupancy})`);
    if (res >= cap) return setError('Reserved slots must be less than capacity');
    setLoading(true); setError('');
    try { await api.updateUnit(unit._id,{ name:form.name, type:form.type, capacity:cap, reservedSlots:res }); onSaved(); }
    catch(e){ setError(e.message); setLoading(false); }
  };

  return (
    <Modal title={`Edit — ${unit.name}`} onClose={onClose}
      footer={<><button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-gold btn-sm" onClick={submit} disabled={loading}>{loading?<Spinner size={14}/>:'Save'}</button></>}>
      {error && <Alert type="danger">{error}</Alert>}
      <div className="form-group">
        <label className="form-label">Gender (fixed)</label>
        <div style={{ padding:'9px 12px', background:'var(--ink-4)', borderRadius:'var(--radius)', fontSize:13, color:'var(--text-3)' }}>{unit.gender}</div>
      </div>
      <div className="form-group"><label className="form-label">Name *</label><input className="input" value={form.name} onChange={e=>set('name',e.target.value)} /></div>
      <div className="form-group"><label className="form-label">Type</label>
        <select className="select" value={form.type} onChange={e=>set('type',e.target.value)}>
          <option value="Room">Room</option><option value="Dorm">Dorm</option>
        </select>
      </div>
      <div className="form-row">
        <div className="form-group"><label className="form-label">Capacity *</label>
          <input className="input" type="number" min={unit.currentOccupancy||1} value={form.capacity} onChange={e=>set('capacity',e.target.value)} />
          <span style={{ fontSize:10, color:'var(--text-4)', fontFamily:'var(--font-mono)', marginTop:3, display:'block' }}>Current occupancy: {unit.currentOccupancy}</span>
        </div>
        <div className="form-group"><label className="form-label">Reserved Slots</label>
          <input className="input" type="number" min="0" value={form.reservedSlots} onChange={e=>set('reservedSlots',e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}

function UnitDetailModal({ unit: init, onClose }) {
  const { toast } = useContext(ToastCtx);
  const { data, loading, reload } = useAsync(()=>api.getUnit(init._id), [init._id]);
  const u = data?.data || init;
  const [leaderId, setLeaderId]     = useState('');
  const [leaderToRes, setLeaderToRes] = useState(false);
  const [searchQ, setSearchQ]       = useState('');
  const [searchRes, setSearchRes]   = useState([]);
  const [tab, setTab]               = useState('occupants');

  useEffect(() => {
    if (!searchQ.trim()) { setSearchRes([]); return; }
    const t = setTimeout(async () => {
      try { const r = await api.getAttendees({ search:searchQ, gender:u.gender, limit:6 }); setSearchRes(r.data||[]); }
      catch { setSearchRes([]); }
    }, 280);
    return () => clearTimeout(t);
  }, [searchQ, u.gender]);

  const doSetLeader = async () => {
    if (!leaderId) return;
    try {
      await api.setLeader(u._id, { attendeeId: leaderId });
      if (leaderToRes && u.reservedSlots > 0) await api.reservedAssign(u._id, { attendeeId: leaderId });
      reload(); toast(leaderToRes ? 'Leader set & assigned to reserved slot' : 'Leader set', 'success');
    } catch (e) { toast(e.message, 'error'); }
  };

  const doReservedAssign = async (attendeeId) => {
    try { await api.reservedAssign(u._id, { attendeeId }); reload(); setSearchQ(''); setSearchRes([]); toast('Assigned to reserved slot','success'); }
    catch (e) { toast(e.message,'error'); }
  };

  const tabs = ['occupants','leader'];
  if (u.reservedSlots > 0) tabs.push('reserved');

  return (
    <Modal title={u.name} onClose={onClose} maxWidth={560}>
      <div style={{ display:'flex', gap:6, marginBottom:16, flexWrap:'wrap' }}>
        <GenderBadge g={u.gender} />
        <span className="badge badge-brown">{u.type}</span>
        <span className="badge badge-gold">{u.currentOccupancy}/{u.capacity}</span>
        {u.reservedSlots>0 && <span className="badge badge-dim">{u.reservedSlots} reserved</span>}
      </div>

      <div className="tabs">
        {tabs.map(t => (
          <button key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>
            {t==='occupants'?'Occupants':t==='leader'?'Leader':'Reserved'}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : (
        <>
          {tab==='occupants' && (
            u.occupants?.length===0
              ? <p className="text-muted text-center">No occupants yet</p>
              : <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {u.occupants?.map(o => (
                    <div key={o._id} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', background:'var(--ink-4)', borderRadius:6 }}>
                      <span style={{ flex:1, fontSize:13, color:'var(--text-1)' }}>{o.surname}, {o.firstName}</span>
                      {u.leaderId && (u.leaderId._id||u.leaderId)===o._id && <span className="badge badge-gold">★ Leader</span>}
                      <GenderBadge g={o.gender} />
                    </div>
                  ))}
                </div>
          )}

          {tab==='leader' && (
            <div>
              {u.leaderId && (
                <div style={{ padding:'10px 14px', background:'var(--gold-muted)', border:'1px solid var(--gold-dim)', borderRadius:'var(--radius)', marginBottom:14 }}>
                  <span style={{ fontSize:11, color:'var(--gold-dim)', fontFamily:'var(--font-mono)', display:'block', marginBottom:3 }}>CURRENT LEADER</span>
                  <span style={{ color:'var(--gold)', fontWeight:600 }}>{u.leaderId.firstName} {u.leaderId.surname}</span>
                </div>
              )}
              <div className="form-group"><label className="form-label">Assign Leader (from occupants)</label>
                <select className="select" value={leaderId} onChange={e=>setLeaderId(e.target.value)}>
                  <option value="">Select occupant…</option>
                  {u.occupants?.map(o => <option key={o._id} value={o._id}>{o.firstName} {o.surname}</option>)}
                </select>
              </div>
              {u.reservedSlots > 0 && (
                <label className="checkbox-row mt-8" style={{ marginBottom:14 }}>
                  <input type="checkbox" checked={leaderToRes} onChange={e=>setLeaderToRes(e.target.checked)} />
                  Also assign leader to a reserved slot
                </label>
              )}
              {leaderToRes && <Alert type="warn">Leader will be moved into a reserved slot.</Alert>}
              <div style={{ display:'flex', gap:8 }}>
                <button className="btn btn-gold" onClick={doSetLeader} disabled={!leaderId}>Set Leader</button>
                {u.leaderId && <button className="btn btn-ghost" onClick={async()=>{ await api.setLeader(u._id,{attendeeId:null}); reload(); }}>Clear</button>}
              </div>
            </div>
          )}

          {tab==='reserved' && (
            <div>
              <Alert type="warn">This unit has <strong>{u.reservedSlots}</strong> reserved slot{u.reservedSlots>1?'s':''}. Assigning here bypasses regular limits.</Alert>
              <div className="form-group mt-12"><label className="form-label">Search attendee</label>
                <input className="input" placeholder="Type name…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
              </div>
              {searchRes.map(a => (
                <div key={a._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 10px', background:'var(--ink-4)', borderRadius:6, marginBottom:5 }}>
                  <div>
                    <span style={{ fontSize:13, color:'var(--text-1)' }}>{a.firstName} {a.surname}</span>
                    {a.fellowship && <span className="text-muted" style={{ marginLeft:8 }}>{a.fellowship}</span>}
                  </div>
                  <button className="btn btn-gold btn-sm" onClick={()=>doReservedAssign(a._id)}>Assign</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

// ── REPORTS ───────────────────────────────────────────────────────────────────
function Reports({ activeEvent }) {
  const [tab, setTab]         = useState('attendance');
  const [gFilter, setGFilter] = useState('');
  const [pFilter, setPFilter] = useState('true');

  const { data: sheet, loading: sl } = usePolling(() => {
    if (!activeEvent) return Promise.resolve({ data: [] });
    const p = { eventId: activeEvent._id };
    if (gFilter) p.gender  = gFilter;
    if (pFilter) p.present = pFilter;
    return api.getAttendanceSheet(p);
  }, [activeEvent?._id, gFilter, pFilter], 20000);

  const { data: manifest, loading: ml } = useAsync(() => {
    if (!activeEvent||tab!=='manifest') return Promise.resolve({ data: [] });
    return api.getRoomManifest(activeEvent._id);
  }, [activeEvent?._id, tab]);

  const { data: unassigned, loading: ul } = useAsync(() => {
    if (!activeEvent||tab!=='unassigned') return Promise.resolve({ data: [] });
    return api.getUnassigned(activeEvent._id);
  }, [activeEvent?._id, tab]);

  const exportCSV = () => {
    const rows = sheet?.data || [];
    const hdr = 'No,Surname,First Name,Gender,Fellowship,Phone,Email,Address,Status,Unit\n';
    const body = rows.map(r =>
      `${r.no},${r.surname},${r.firstName},${r.gender},${r.fellowship||''},${r.phone||''},${r.email||''},${r.address||''},${r.present?'Present':'Absent'},${r.unit||''}`
    ).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([hdr+body],{type:'text/csv'}));
    a.download = `attendance-${activeEvent?.name||'export'}.csv`; a.click();
  };

  const printSheet = () => {
    const rows = sheet?.data || [];
    const html = `<html><head><title>Attendance</title><style>
      body{font-family:Georgia,serif;font-size:11px;color:#111;padding:20px}
      h1{font-size:18px;margin-bottom:4px}p{color:#555;margin-bottom:12px}
      table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #ccc;padding:5px 8px;text-align:left}
      th{background:#f0f0f0;font-weight:600}
      tr:nth-child(even){background:#fafafa}
    </style></head><body>
    <h1>${activeEvent?.name}</h1><p>Attendance · ${new Date().toLocaleDateString()}</p>
    <table><thead><tr><th>#</th><th>Surname</th><th>First Name</th><th>Gender</th><th>Fellowship</th><th>Phone</th><th>Unit</th></tr></thead>
    <tbody>${rows.map(r=>`<tr><td>${r.no}</td><td>${r.surname}</td><td>${r.firstName}</td><td>${r.gender}</td><td>${r.fellowship||''}</td><td>${r.phone||''}</td><td>${r.unit||''}</td></tr>`).join('')}</tbody>
    </table></body></html>`;
    const w = window.open('','_blank'); w.document.write(html); w.document.close(); w.print();
  };

  if (!activeEvent) return <div className="empty-state"><span className="empty-icon">📋</span><p>No active event.</p></div>;

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-h1">Reports</h1><span className="page-h1-sub">{activeEvent.name}</span></div>
        {tab==='attendance' && (
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-ghost btn-sm" onClick={exportCSV}><Icons.Download /> CSV</button>
            <button className="btn btn-ghost btn-sm" onClick={printSheet}><Icons.Download /> Print/PDF</button>
          </div>
        )}
      </div>

      <div className="tabs">
        <button className={`tab ${tab==='attendance'?'active':''}`} onClick={()=>setTab('attendance')}>Attendance</button>
        <button className={`tab ${tab==='manifest'?'active':''}`} onClick={()=>setTab('manifest')}>Room Manifest</button>
        <button className={`tab ${tab==='unassigned'?'active':''}`} onClick={()=>setTab('unassigned')}>Unassigned</button>
      </div>

      {tab==='attendance' && (
        <>
          <div className="filters mb-16">
            <select className="select" value={gFilter} onChange={e=>setGFilter(e.target.value)}>
              <option value="">All Genders</option><option value="Male">Male</option><option value="Female">Female</option>
            </select>
            <select className="select" value={pFilter} onChange={e=>setPFilter(e.target.value)}>
              <option value="">All</option><option value="true">Present only</option><option value="false">Absent only</option>
            </select>
          </div>
          <div className="card">
            {sl ? <div className="loading-overlay"><Spinner /></div> : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>#</th><th>Surname</th><th>First Name</th><th>Gender</th><th>Fellowship</th><th>Phone</th><th>Unit</th></tr></thead>
                  <tbody>
                    {(sheet?.data||[]).map(r => (
                      <tr key={r.no}>
                        <td className="text-muted">{r.no}</td>
                        <td className="td-name">{r.surname}</td>
                        <td>{r.firstName}</td>
                        <td><GenderBadge g={r.gender} /></td>
                        <td className="text-muted">{r.fellowship||'—'}</td>
                        <td className="text-muted">{r.phone||'—'}</td>
                        <td className="td-mono">{r.unit||'—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(sheet?.data||[]).length===0 && <div className="empty-state"><p>No records</p></div>}
              </div>
            )}
          </div>
        </>
      )}

      {tab==='manifest' && (
        <div>
          {ml ? <div className="loading-overlay"><Spinner /></div> :
            (manifest?.data||[]).map(m => (
              <div key={m.unit._id} className="card" style={{ marginBottom:14 }}>
                <div className="card-header">
                  <span className="card-title">{m.unit.name}</span>
                  <div style={{ display:'flex', gap:6 }}>
                    <GenderBadge g={m.unit.gender} />
                    <span className="badge badge-brown">{m.unit.type}</span>
                    <span className="badge badge-gold">{m.unit.currentOccupancy}/{m.unit.capacity}</span>
                  </div>
                </div>
                <div className="card-body" style={{ padding:'12px 16px' }}>
                  {m.occupants.length===0 ? <p className="text-muted">Empty</p> : (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {m.occupants.map((o,i) => (
                        <span key={o._id} className="chip" style={{ fontSize:12 }}>
                          {i+1}. {o.surname}, {o.firstName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {tab==='unassigned' && (
        <div className="card">
          {ul ? <div className="loading-overlay"><Spinner /></div> : (
            <>
              {(unassigned?.data||[]).length>0 && (
                <div className="alert alert-warn" style={{ margin:16 }}>
                  {unassigned.count} checked-in attendees have no accommodation assigned.
                </div>
              )}
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Name</th><th>Gender</th><th>Fellowship</th><th>Phone</th></tr></thead>
                  <tbody>
                    {(unassigned?.data||[]).map(a => (
                      <tr key={a._id}>
                        <td className="td-name">{a.surname}, {a.firstName}</td>
                        <td><GenderBadge g={a.gender} /></td>
                        <td className="text-muted">{a.fellowship||'—'}</td>
                        <td className="text-muted">{a.phone||'—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(unassigned?.data||[]).length===0 && <div className="empty-state"><span className="empty-icon">✓</span><p>All checked-in attendees are assigned</p></div>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── EVENTS ────────────────────────────────────────────────────────────────────
function Events({ onEventChange }) {
  const { toast } = useContext(ToastCtx);
  const [showAdd, setShowAdd] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const { data, loading, reload } = useAsync(()=>api.getEvents(), []);
  const events = data?.data || [];

  const doActivate = async (ev) => {
    try { await api.activateEvent(ev._id); reload(); onEventChange(); toast(`${ev.name} activated`, 'success'); }
    catch (e) { toast(e.message,'error'); }
  };

  const doDelete = async (ev) => {
    try { await api.deleteEvent(ev._id); reload(); onEventChange(); toast('Event deleted','info'); }
    catch (e) { toast(e.message,'error'); }
    setConfirm(null);
  };

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-h1">Events</h1></div>
        <button className="btn btn-gold btn-sm" onClick={()=>setShowAdd(true)}><Icons.Plus /> New Event</button>
      </div>

      {loading ? <div className="loading-overlay"><Spinner /></div> : (
        <div className="grid-2">
          {events.map(ev => (
            <div key={ev._id} className="card" style={{ position:'relative', overflow:'hidden' }}>
              {ev.isActive && <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, var(--gold-dim), var(--gold))' }} />}
              <div className="card-body">
                <div className="flex justify-between items-center gap-8 mb-8">
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:20, color:'var(--text-1)', fontWeight:700 }}>{ev.name}</h3>
                  {ev.isActive && <span className="badge badge-gold">Active</span>}
                </div>
                <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:4 }}>📍 {ev.venue}</p>
                <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:12, fontFamily:'var(--font-mono)' }}>
                  {fmtDate(ev.startDate)} → {fmtDate(ev.endDate)}
                </p>
                <div style={{ display:'flex', gap:10, marginBottom:14 }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:24, color:'var(--gold)', fontWeight:700 }}>{ev.registered}</div>
                    <div style={{ fontSize:10, color:'var(--text-4)', fontFamily:'var(--font-mono)', letterSpacing:'0.1em' }}>REGISTERED</div>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:24, color:'var(--success)', fontWeight:700 }}>{ev.present}</div>
                    <div style={{ fontSize:10, color:'var(--text-4)', fontFamily:'var(--font-mono)', letterSpacing:'0.1em' }}>PRESENT</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  {!ev.isActive && <button className="btn btn-gold btn-sm" onClick={()=>doActivate(ev)}>Set Active</button>}
                  <button className="btn btn-danger btn-sm" onClick={()=>setConfirm(ev)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {events.length===0 && <div className="empty-state" style={{ gridColumn:'1/-1' }}><span className="empty-icon">📅</span><p>No events yet.</p></div>}
        </div>
      )}

      {showAdd && <AddEventModal onClose={()=>setShowAdd(false)} onSaved={()=>{ setShowAdd(false); reload(); onEventChange(); toast('Event created','success'); }} />}
      {confirm && <Confirm title="Delete Event" danger
        message={`Delete "${confirm.name}"? All attendees and accommodation data will also be deleted.`}
        onConfirm={()=>doDelete(confirm)} onClose={()=>setConfirm(null)} />}
    </div>
  );
}

function AddEventModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ name:'', venue:'', startDate:'', endDate:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    if (!form.name||!form.venue||!form.startDate||!form.endDate) return setError('All fields required');
    setLoading(true); setError('');
    try { await api.createEvent(form); onSaved(); }
    catch(e){ setError(e.message); setLoading(false); }
  };

  return (
    <Modal title="New Event" onClose={onClose}
      footer={<><button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-gold btn-sm" onClick={submit} disabled={loading}>{loading?<Spinner size={14}/>:'Create'}</button></>}>
      {error && <Alert type="danger">{error}</Alert>}
      <div className="form-group"><label className="form-label">Event Name *</label><input className="input" placeholder="Annual Conference 2025" value={form.name} onChange={e=>set('name',e.target.value)} /></div>
      <div className="form-group"><label className="form-label">Venue *</label><input className="input" placeholder="Grace Hall, Ibadan" value={form.venue} onChange={e=>set('venue',e.target.value)} /></div>
      <div className="form-row">
        <div className="form-group"><label className="form-label">Start Date *</label><input className="input" type="date" value={form.startDate} onChange={e=>set('startDate',e.target.value)} /></div>
        <div className="form-group"><label className="form-label">End Date *</label><input className="input" type="date" value={form.endDate} onChange={e=>set('endDate',e.target.value)} /></div>
      </div>
    </Modal>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, activeEvent, sidebarOpen, setSidebarOpen }) {
  const nav = [
    { section: 'Overview',   items: [{ id:'dashboard',     label:'Dashboard',      Icon:Icons.Dashboard }] },
    { section: 'Operations', items: [
      { id:'checkin',         label:'Check‑In',             Icon:Icons.CheckIn },
      { id:'attendees',       label:'Attendees',            Icon:Icons.Attendees },
      { id:'accommodation',   label:'Accommodation',        Icon:Icons.Rooms },
    ]},
    { section: 'Reports',    items: [{ id:'reports',        label:'Reports',        Icon:Icons.Reports }] },
    { section: 'Setup',      items: [{ id:'events',         label:'Events',         Icon:Icons.Events }] },
  ];

  const go = (id) => { setPage(id); setSidebarOpen(false); };

  return (
    <aside className={`sidebar ${sidebarOpen?'open':''}`}>
      <div className="sidebar-logo">
        <span className="sidebar-logo-mark">ACCOMS</span>
        <span className="sidebar-logo-sub">Accommodation System</span>
      </div>

      {activeEvent && (
        <div className="sidebar-active-event" onClick={()=>go('events')}>
          <span className="sidebar-active-event-label">Active Event</span>
          <span className="sidebar-active-event-name">{activeEvent.name}</span>
        </div>
      )}

      <nav className="sidebar-nav">
        {nav.map(({ section, items }) => (
          <div key={section}>
            <span className="nav-section-label">{section}</span>
            {items.map(({ id, label, Icon }) => (
              <div key={id} className={`nav-item ${page===id?'active':''}`} onClick={()=>go(id)}>
                <div className="nav-icon"><Icon /></div>
                {label}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-ver">ACCOMS v1.1</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
function AppInner() {
  const [page, setPage]               = useState('dashboard');
  const [activeEvent, setActiveEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadActiveEvent = useCallback(async () => {
    try { const r = await api.getActiveEvent(); setActiveEvent(r.data); }
    catch { setActiveEvent(null); }
  }, []);

  // Poll active event every 20s so sidebar stays in sync across tabs
  useEffect(() => {
    loadActiveEvent();
    const t = setInterval(loadActiveEvent, 20000);
    return () => clearInterval(t);
  }, [loadActiveEvent]);

  const pages = {
    dashboard:     <Dashboard activeEvent={activeEvent} />,
    checkin:       <CheckIn activeEvent={activeEvent} />,
    attendees:     <Attendees activeEvent={activeEvent} />,
    accommodation: <Accommodation activeEvent={activeEvent} />,
    reports:       <Reports activeEvent={activeEvent} />,
    events:        <Events onEventChange={loadActiveEvent} />,
  };

  const titles = {
    dashboard:'Dashboard', checkin:'Check‑In', attendees:'Attendees',
    accommodation:'Accommodation', reports:'Reports', events:'Events',
  };

  return (
    <div className="app-shell">
      {sidebarOpen && <div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)} />}

      <Sidebar page={page} setPage={setPage} activeEvent={activeEvent}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-area">
        <header className="topbar">
          <button className="hamburger" onClick={()=>setSidebarOpen(o=>!o)}><Icons.Menu /></button>
          <span className="topbar-title">{titles[page]}</span>
          {page !== 'checkin' && activeEvent && (
            <button className="btn btn-gold btn-sm" onClick={()=>setPage('checkin')}>
              <Icons.Zap /> Check In
            </button>
          )}
        </header>

        <main className="page" key={page}>
          {pages[page]}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </ThemeProvider>
  );
}
