import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Check, CheckCheck, Circle, LayoutList, Plus, Search, Trash2, X } from 'lucide-react';
import './styles.css';

const storageKey = 'daylist-tasks-v1';
const initialTasks = [
  { id: '1', title: 'ออกแบบหน้าแรกของโปรเจกต์', category: 'งาน', done: false },
  { id: '2', title: 'ลองเขียน React component แรก', category: 'เรียนรู้', done: false },
  { id: '3', title: 'อ่านหนังสือ 20 นาที', category: 'ส่วนตัว', done: false },
  { id: '4', title: 'เตรียมรายการงานสำหรับสัปดาห์นี้', category: 'งาน', done: true },
];
const categories = ['งาน', 'เรียนรู้', 'ส่วนตัว'];

function readTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(saved) && saved.every(task => task && typeof task.id === 'string' && typeof task.title === 'string' && typeof task.done === 'boolean' && categories.includes(task.category))) return saved;
  } catch { /* Fall back when storage is unavailable or contains invalid data. */ }
  return initialTasks;
}

function App() {
  const [tasks, setTasks] = useState(readTasks);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('งาน');
  const [showForm, setShowForm] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const inputRef = useRef(null);
  const addButtonRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      setStorageError(false);
    } catch { setStorageError(true); }
  }, [tasks]);

  useEffect(() => {
    if (showForm) inputRef.current?.focus();
  }, [showForm]);

  const completed = tasks.filter(task => task.done).length;
  const remaining = tasks.length - completed;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const visibleTasks = tasks.filter(task =>
    (filter === 'all' || (filter === 'active' ? !task.done : task.done)) &&
    task.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  );

  function closeForm() {
    setShowForm(false);
    setTitle('');
    addButtonRef.current?.focus();
  }

  function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks(current => [{ id: crypto.randomUUID(), title: title.trim(), category, done: false }, ...current]);
    setFilter('all');
    setQuery('');
    closeForm();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a href="/" className="brand"><span className="brand-mark"><CheckCheck size={23} /></span>daylist<span className="brand-dot">.</span></a>
        <div className="workspace-label">MY WORKSPACE</div>
        <div className="nav-current"><LayoutList size={19} /> งานของฉัน <span>{tasks.length}</span></div>
        <div className="sidebar-bottom"><span className="avatar">Y</span><div><strong>พื้นที่ของคุณ</strong><small>Personal workspace</small></div></div>
      </aside>

      <main>
        <header className="topbar"><span>พื้นที่ส่วนตัว <span className="breadcrumb">/</span> งานของฉัน</span><span className="date">{new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</span></header>
        <div className="content">
          <section className="page-heading"><div><p className="eyebrow">A LITTLE PROGRESS, EVERY DAY</p><h1>งานของฉัน<span className="heading-dot">.</span></h1><p className="subtitle">จัดระเบียบวันของคุณ แล้วค่อย ๆ ทำทีละอย่าง</p></div><button className="primary" ref={addButtonRef} onClick={() => setShowForm(true)}><Plus size={18} /> เพิ่มงาน</button></section>

          <section className="overview" aria-label="ภาพรวมงาน">
            <div className="stat"><span className="stat-icon green"><LayoutList size={21} /></span><div><span className="stat-label">งานทั้งหมด</span><strong>{tasks.length}<small> งาน</small></strong></div></div>
            <div className="stat"><span className="stat-icon coral"><Circle size={21} /></span><div><span className="stat-label">กำลังรอคุณ</span><strong>{remaining}<small> งาน</small></strong></div></div>
            <div className="stat"><span className="stat-icon violet"><CheckCheck size={21} /></span><div><span className="stat-label">เสร็จเรียบร้อย</span><strong>{completed}<small> งาน</small></strong></div></div>
          </section>

          <section className="progress-section"><div><strong>ก้าวเล็ก ๆ ของวันนี้</strong><span>{progress}% สำเร็จแล้ว</span></div><progress value={progress} max="100" aria-label="ความคืบหน้างาน" /></section>

          <section className="task-section" aria-label="รายการงาน">
            <div className="task-toolbar"><div className="tabs" role="group" aria-label="กรองงาน">{[['all', 'ทั้งหมด', tasks.length], ['active', 'ยังไม่เสร็จ', remaining], ['done', 'เสร็จแล้ว', completed]].map(([value, label, count]) => <button key={value} aria-pressed={filter === value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}<span>{count}</span></button>)}</div><label className="search"><Search size={17} /><input type="search" placeholder="ค้นหางาน..." aria-label="ค้นหางาน" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
            <div className="table-heading"><span>รายการงาน</span><span>หมวดหมู่</span><span className="actions-label">จัดการ</span></div>
            <div className="task-list">{visibleTasks.length ? visibleTasks.map(task => <div key={task.id} className={`task-row ${task.done ? 'is-done' : ''}`}><label className="task-title"><input type="checkbox" checked={task.done} onChange={() => setTasks(current => current.map(item => item.id === task.id ? { ...item, done: !item.done } : item))} /><span className="checkbox-visual">{task.done && <Check size={14} />}</span><span>{task.title}</span></label><span className={`category category-${categories.indexOf(task.category)}`}>{task.category}</span><button className="icon-button delete" title={`ลบ ${task.title}`} aria-label={`ลบ ${task.title}`} onClick={() => setTasks(current => current.filter(item => item.id !== task.id))}><Trash2 size={17} /></button></div>) : <div className="empty-state"><CheckCheck size={30} /><h2>{query ? 'ไม่พบงานที่ค้นหา' : 'ไม่มีงานในรายการนี้'}</h2><p>{query ? 'ลองค้นหาด้วยคำอื่น' : 'เริ่มต้นใหม่ด้วยงานเล็ก ๆ สักอย่าง'}</p></div>}</div>
            <button className="add-inline" onClick={() => setShowForm(true)}><Plus size={17} /> เพิ่มงานใหม่</button>
          </section>
          {storageError && <p className="storage-error" role="alert">เบราว์เซอร์บันทึกข้อมูลไม่ได้ งานจะอยู่เฉพาะระหว่างเปิดหน้านี้</p>}
          <footer><span>Make room for what matters.</span><span>ทีละงาน ทีละก้าว <ArrowUpRight size={14} /></span></footer>
        </div>
      </main>

      {showForm && <div className="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) closeForm(); }}><dialog open aria-labelledby="dialog-title" onKeyDown={event => {
        if (event.key === 'Escape') closeForm();
        if (event.key === 'Tab') {
          const controls = [...event.currentTarget.querySelectorAll('button, input, select')];
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}><div className="modal-heading"><h2 id="dialog-title">เพิ่มงานใหม่</h2><button className="icon-button" aria-label="ปิด" title="ปิด" onClick={closeForm}><X size={20} /></button></div><form onSubmit={addTask}><label className="field">ชื่องาน<input ref={inputRef} value={title} onChange={event => setTitle(event.target.value)} placeholder="วันนี้อยากทำอะไรให้สำเร็จ?" maxLength={160} required /></label><label className="field">หมวดหมู่<select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label><div className="modal-actions"><button type="button" className="secondary" onClick={closeForm}>ยกเลิก</button><button className="primary" type="submit" disabled={!title.trim()}><Plus size={17} /> เพิ่มงาน</button></div></form></dialog></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
