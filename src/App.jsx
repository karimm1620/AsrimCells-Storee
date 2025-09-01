import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Telepon_Atmin = '6285782580079';

/* HELPERS */
function formatRupiah(num) {
  const n = Number(num) || 0;
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/* constants */
const CLASS_OPTIONS = (() => {
  const grades = ['10', '11', '12'];
  const majors = ['TKJ', 'Ph', 'OTKP', 'TBSM', 'MIA', 'MIPA'];
  const groups = [1, 2, 3];
  const list = [];
  grades.forEach(g => { majors.forEach(m => { groups.forEach(n => { list.push(`${g} ${m} ${n}`); }); }); });
  return list;
})();

const PRODUCTS = [
  // INTERNET
  // Axis
  { id: 1, category: 'internet', provider: 'Axis', name: 'Paket AXIS 1.5GB', price: 7000, desc: 'Bronet 1.5GB 1 hari', logo: '/assets/logos/axis.png' },
  { id: 2, category: 'internet', provider: 'Axis', name: 'Paket AXIS 2.5GB', price: 9000, desc: 'Bronet 2.5GB 1 hari', logo: '/assets/logos/axis.png' },
  { id: 3, category: 'internet', provider: 'Axis', name: 'Paket AXIS 2GB', price: 11000, desc: 'Bronet 2GB 3 hari', logo: '/assets/logos/axis.png' },
  { id: 4, category: 'internet', provider: 'Axis', name: 'Paket AXIS 4GB', price: 12000, desc: 'Bronet 4GB 3 hari', logo: '/assets/logos/axis.png' },
  
  // Indosat
  { id: 5, category: 'internet', provider: 'Indosat', name: 'Paket Indosat 4GB', price: 22000, desc: '3GB 20 hari', logo: '/assets/logos/indosat.png' },
  { id: 6, category: 'internet', provider: 'Indosat', name: 'Paket Indosat 6GB', price: 27000, desc: '6GB 28 hari', logo: '/assets/logos/indosat.png' },

  // Smartfren
  { id: 7, category: 'internet', provider: 'Smartfren', name: 'Paket Smartfren 1GB', price: 5500, desc: 'Smart 1GB All 3 hari', logo: '/assets/logos/smartfren.png' },
  { id: 8, category: 'internet', provider: 'Smartfren', name: 'Paket Smartfren 2GB', price: 8500, desc: 'Smart 2GB All 3 hari', logo: '/assets/logos/smartfren.png' },
  { id: 9, category: 'internet', provider: 'Smartfren', name: 'Paket Smartfren 1GB (7 hari)', price: 11000, desc: 'Smart 1GB All 7 hari', logo: '/assets/logos/smartfren.png' },
  { id: 10, category: 'internet', provider: 'Smartfren', name: 'Paket Smartfren 1.5GB', price: 12000, desc: 'Smart 1.5GB All 7 hari', logo: '/assets/logos/smartfren.png' },
  { id: 11, category: 'internet', provider: 'Smartfren', name: 'Paket Smartfren 3GB', price: 13000, desc: 'Smart 3GB All 5 hari', logo: '/assets/logos/smartfren.png' },
  { id: 12, category: 'internet', provider: 'Smartfren', name: 'Paket Smartfren 4GB', price: 18000, desc: 'Smart 4GB + Unli App 14 hari', logo: '/assets/logos/smartfren.png' },

  // By.U
  { id: 13, category: 'internet', provider: 'ByU', name: 'Paket ByU 3GB', price: 10500, desc: 'By.U 3GB All 7 hari', logo: '/assets/logos/byU.png' },
  { id: 14, category: 'internet', provider: 'ByU', name: 'Paket ByU 2.5GB', price: 11000, desc: 'By.U 2.5GB All 5 hari', logo: '/assets/logos/byU.png' },
  { id: 15, category: 'internet', provider: 'ByU', name: 'Paket ByU 3GB', price: 12000, desc: 'By.U 3GB All 14 hari', logo: '/assets/logos/byU.png' },
  { id: 16, category: 'internet', provider: 'ByU', name: 'Paket ByU 7GB', price: 17000, desc: 'By.U 7GB All 30 hari', logo: '/assets/logos/byU.png' },
  { id: 17, category: 'internet', provider: 'ByU', name: 'Paket ByU 4GB', price: 17500, desc: 'By.U 4GB All 30 hari', logo: '/assets/logos/byU.png' },
  { id: 18, category: 'internet', provider: 'ByU', name: 'Paket ByU 6GB', price: 18000, desc: 'By.U 6GB All 30 hari', logo: '/assets/logos/byU.png' },

  // GAME
  // Mobile Legend
  { id: 101, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 3', price: 2000, desc: '3 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 102, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 5', price: 2500, desc: '5 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 103, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 12', price: 4000, desc: '12 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 104, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 19', price: 6500, desc: '19 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 105, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 28', price: 8500, desc: '28 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 106, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 36', price: 10500, desc: '36 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 107, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 56', price: 15500, desc: '56 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 108, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 100', price: 27000, desc: '100 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 109, category: 'game', provider: 'MOBILE LEGENDS', name: 'Weekly Diamond', price: 28000, desc: '220 Diamonds', logo: '/assets/logos/mobile-legends.png' },

  // Free Fire
  { id: 201, category: 'game', provider: 'FREE FIRE', name: 'Diamond 5', price: 1000, desc: '5 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 202, category: 'game', provider: 'FREE FIRE', name: 'Diamond 12', price: 2500, desc: '12 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 203, category: 'game', provider: 'FREE FIRE', name: 'Diamond 50', price: 7000, desc: '50 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 204, category: 'game', provider: 'FREE FIRE', name: 'Diamond 70', price: 10000, desc: '70 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 205, category: 'game', provider: 'FREE FIRE', name: 'Diamond 100', price: 13500, desc: '100 Diamonds', logo: '/assets/logos/free-fire.png' },
];

/* icons */
const InternetIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C7.03 3 2.73 5.69 1 9.5C2.73 13.31 7.03 16 12 16C16.97 16 21.27 13.31 23 9.5C21.27 5.69 16.97 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 12C9.5 10.75 10.67 10 12 10C13.33 10 14.5 10.75 15.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 20V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const GameIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8C8.55228 14 9 13.5523 9 13V11C9 10.4477 8.55228 10 8 10H6Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 10C15.4477 10 15 10.4477 15 11V13C15 13.5523 15.4477 14 16 14H18C18.5523 14 19 13.5523 19 13V11C19 10.4477 18.5523 10 18 10H16Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 10.5C9.5 7.5 14.5 7.5 16 10.5V13.5C14.5 16.5 9.5 16.5 8 13.5V10.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.2"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);

/* SearchableSelect (same as before) */
function SearchableSelect({ options = [], value, onChange, placeholder = 'Cari...' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const ref = useRef(null);

  const filtered = options.filter(opt => opt.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => setHighlight(0), [query]);

  function handleKeyDown(e) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) { setOpen(true); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[highlight]) { onChange(filtered[highlight]); setOpen(false); setQuery(''); } }
    else if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex gap-2">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
          placeholder={placeholder}
          value={open ? query : (value || '')}
          onChange={e => { setQuery(e.target.value); if (!open) setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-expanded={open}
          aria-haspopup="listbox"
        />
        <button type="button" onClick={() => { setOpen(o => !o); setQuery(''); }} className="px-3 py-2 rounded-lg bg-gray-100" aria-label="Toggle">{open ? '▴' : '▾'}</button>
      </div>

      {open && (
        <div role="listbox" className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">Tidak ada hasil</div>
          ) : (
            filtered.map((opt, idx) => {
              const isHighlighted = idx === highlight;
              return (
                <div
                  key={opt}
                  role="option"
                  aria-selected={value === opt}
                  onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); setQuery(''); }}
                  onMouseEnter={() => setHighlight(idx)}
                  className={`px-3 py-2 cursor-pointer ${isHighlighted ? 'bg-yellow-100' : 'hover:bg-gray-50'}`}
                >
                  <div className="text-sm">{opt}</div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

/* ProductSelect (same as before) */
function ProductSelect({ products = [], value, onChange, placeholder = 'Cari paket...', className = '' }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [highlight, setHighlight] = useState(0);
  const ref = useRef(null);

  const filtered = products.filter(p => {
    const t = `${p.name} ${p.provider} ${p.desc}`.toLowerCase();
    return !q.trim() || t.includes(q.trim().toLowerCase());
  });

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  useEffect(() => setHighlight(0), [q, open]);

  function onKey(e) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) { setOpen(true); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[highlight]) { onChange(filtered[highlight].id); setOpen(false); setQ(''); } }
    else if (e.key === 'Escape') setOpen(false);
  }

  const selected = products.find(p => p.id === value);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <label className="sr-only">Pilih paket</label>
      <div
        className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm cursor-text"
        onClick={() => { setOpen(o => !o); }}
      >
        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="flex items-center gap-3">
              <img src={selected.logo} alt={selected.provider} className="w-10 h-10 object-contain bg-gray-50 rounded p-1" />
              <div className="min-w-0">
                <div className="font-semibold truncate text-sm">{selected.name}</div>
                <div className="text-xs text-gray-500 truncate">{selected.provider} • Rp {formatRupiah(selected.price)}</div>
              </div>
            </div>
          ) : (
            <input
              type="text"
              value={open ? q : ''}
              onChange={e => { setQ(e.target.value); if (!open) setOpen(true); }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKey}
              placeholder={placeholder}
              className="w-full placeholder-gray-400 outline-none"
              aria-expanded={open}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          {selected && <button type="button" onClick={(e) => { e.stopPropagation(); onChange(null); }} className="text-gray-400 hover:text-gray-600 px-2">✕</button>}
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }} aria-label="Toggle" className="text-gray-500">
            {open ? '▴' : '▾'}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow max-h-64 overflow-auto">
          <div className="px-3 py-2 sticky top-0 bg-white border-b">
            <input
              autoFocus
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Cari nama paket, provider, atau deskripsi..."
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={onKey}
            />
          </div>

          <div className="p-2 space-y-2">
            {filtered.length === 0 && <div className="text-sm text-gray-500 px-2 py-3">Tidak ada paket.</div>}

            {filtered.map((p, i) => {
              const isH = i === highlight;
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={e => { e.preventDefault(); onChange(p.id); setOpen(false); setQ(''); }}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${isH ? 'bg-yellow-50 ring-1 ring-yellow-300' : 'hover:bg-gray-50'}`}
                >
                  <img src={p.logo} alt={p.provider} className="w-12 h-12 object-contain bg-gray-50 rounded p-1" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{p.name}</div>
                    <div className="text-xs text-gray-500 truncate">{p.provider} • {p.desc}</div>
                  </div>
                  <div className="text-right min-w-[90px]">
                    <div className="text-sm font-bold">Rp {formatRupiah(p.price)}</div>
                    <div className="text-xs text-gray-400">{p.category === 'game' ? 'Game' : 'Internet'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* AllProductsModal: unchanged (kept for modal behavior) */
function AllProductsModal({ open, onClose, products = [], isMobile = false }) {
  const [mounted, setMounted] = useState(open);
  const [animateIn, setAnimateIn] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
      const t = setTimeout(() => setMounted(false), 260);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    if (mounted) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mounted, onClose]);

  useEffect(() => {
    function onOpenFilter(e) {
      const cat = e.detail;
      if (cat) setFilter(cat);
    }
    window.addEventListener('openFilter', onOpenFilter);
    return () => window.removeEventListener('openFilter', onOpenFilter);
  }, []);

  if (!mounted) return null;

  const filtered = products.filter(p => filter === 'all' ? true : p.category === filter);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${animateIn ? 'opacity-100' : 'opacity-0'}`} />

      <div
        className={`relative w-full ${isMobile ? 'max-h-[85vh] rounded-t-xl' : 'md:w-3/4 max-w-3xl rounded-xl'} bg-white shadow-xl overflow-hidden transform transition-all duration-260`}
        style={{
          transform: animateIn ? 'translateY(0) scale(1)' : (isMobile ? 'translateY(100%)' : 'translateY(10px) scale(0.98)'),
          transitionProperty: 'transform, opacity',
          transitionDuration: '260ms'
        }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Semua Paket</h3>
            <div className="text-sm text-gray-500">Pilih paket yang kamu mau</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">✕</button>
        </div>

        <div className="px-4 py-3 border-b flex gap-2 overflow-auto">
          {['all', 'internet', 'game'].map(key => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-sm ${filter === key ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              {key === 'all' ? 'Semua' : key === 'internet' ? 'Internet' : 'Game'}
            </button>
          ))}
          <div className="flex-1" />
        </div>

        <div className="p-4 overflow-auto" style={{ maxHeight: isMobile ? 'calc(85vh - 120px)' : 'calc(70vh - 120px)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map(p => (
              <div key={p.id} className="bg-gray-50 rounded-lg p-3 shadow-sm flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded overflow-hidden flex items-center justify-center">
                    <img src={p.logo} alt={p.provider} className="object-contain h-full p-1" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-sm truncate">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.provider}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm font-bold">Rp {formatRupiah(p.price)}</div>
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('modalChooseProduct', { detail: p }));
                    }}
                    className="px-3 py-1 rounded bg-yellow-500 text-white text-sm"
                  >
                    Pilih
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && <div className="text-center text-gray-500 mt-6">Tidak ada paket.</div>}
        </div>
      </div>
    </div>
  );
}

/* GameSection (mobile strip) - unchanged */
function GameSection({ games, onSelect }) {
  return (
    <section className="md:hidden container-max mx-auto px-3 py-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-lg font-semibold">Top Up Hemat & Ramai</h3>
        <button
          className="text-sm text-gray-600"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('openGameCategory'));
            window.dispatchEvent(new CustomEvent('openAllModal'));
          }}
        >
          Semua »
        </button>
      </div>

      <div className="overflow-x-auto -mx-3 px-3 snap-x snap-mandatory flex gap-3">
        {games.map(g => (
          <div
            key={g.id}
            className="min-w-[140px] snap-start bg-gradient-to-br from-pink-500 to-violet-500 text-white rounded-xl p-3 shadow-md flex-shrink-0 cursor-pointer"
            onClick={() => onSelect(g)}
            role="button"
          >
            <div className="h-20 w-full mb-2 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
              <img src={g.logo} alt={g.provider} className="max-h-[72px] object-contain" />
            </div>

            <div className="font-semibold text-sm leading-tight truncate">{g.name}</div>
            <div className="text-xs opacity-90">{g.desc}</div>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Promo</div>
              <div className="text-sm font-bold">Rp {formatRupiah(g.price)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Lightweight LoaderAnimation (compact mode for mobile) */
function LoaderAnimation({ size = 160, compact = false }) {
  if (compact) {
    // super compact loader: small ring + dot
    return (
      <div className="flex items-center justify-center" aria-hidden>
        <svg width={size} height={size} viewBox="0 0 48 48" className="loader-svg-compact" role="img">
          <defs>
            <linearGradient id="cg" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff8a00" />
              <stop offset="100%" stopColor="#7c4dff" />
            </linearGradient>
          </defs>
          <g transform="translate(24,24)">
            <circle r="12" stroke="#ffffff30" strokeWidth="3" fill="none" />
            <path d="M12 0 A12 12 0 1 1 -11.99 0" stroke="url(#cg)" strokeWidth="3" strokeLinecap="round" fill="none" className="arc-compact" />
            <circle r="4" fill="#fff" className="core-compact" />
          </g>
        </svg>

        <style>{`
          .arc-compact { transform-origin: 24px 24px; animation: rotateCompact 2s linear infinite; }
          .core-compact { animation: pulseCompact 1.2s ease-in-out infinite; }
          @keyframes rotateCompact { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes pulseCompact { 0% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.25); opacity: .6 } 100% { transform: scale(1); opacity: 1 } }
          @media (prefers-reduced-motion: reduce) { .arc-compact, .core-compact { animation: none; } }
        `}</style>
      </div>
    );
  }

  // full loader (desktop/tablet)
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <svg width={size} height={size} viewBox="0 0 120 120" className="loader-svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff8a00" />
            <stop offset="50%" stopColor="#ff3d81" />
            <stop offset="100%" stopColor="#7c4dff" />
          </linearGradient>
          <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(60,60)">
          <path
            d="M40 0 A40 40 0 1 1 -39.99 0"
            stroke="url(#g1)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            className="arc arc-outer"
          />
          <circle r="24" stroke="#ffffff20" strokeWidth="6" fill="none" />
          <circle r="8" fill="#ffffff" className="core" />
        </g>
      </svg>

      <style>{`
        .loader-svg { display:block; }
        .arc { transform-origin: 60px 60px; animation: rotateArc 3s linear infinite; filter: url(#f1); }
        .arc-outer { stroke-dasharray: 120; stroke-dashoffset: 40; }
        .core { transform-origin: 60px 60px; animation: corePulse 1.6s ease-in-out infinite; opacity: 0.95; }
        @keyframes rotateArc { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes corePulse { 0% { transform: scale(1); opacity: 0.95;} 50% { transform: scale(1.25); opacity: 0.6;} 100% { transform: scale(1); opacity: 0.95;} }
        @media (prefers-reduced-motion: reduce) {
          .arc, .core { animation: none; }
        }
      `}</style>
    </div>
  );
}

/* Compact HeroBanner: smaller footprint on mobile */
function HeroBanner({ isMobile }) {
  return (
    <div className="container-max mx-auto px-4 py-3">
      <div
        className={`bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl overflow-hidden relative text-white
          ${isMobile ? 'p-3 flex items-center gap-3' : 'p-6 md:p-8 flex flex-col md:flex-row items-stretch'}`}
      >
        {/* Left / main content */}
        <div className={`${isMobile ? 'flex-1' : 'md:w-1/2 flex flex-col justify-center'}`}>
          <div className="text-xs uppercase font-semibold opacity-90">Promo Spesial</div>
          <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-4xl'} mt-1 font-extrabold leading-tight`}>
            Diskon Paket Internet 15%
          </h2>
          <p className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} mt-1 opacity-90`}>
            Terbatas — kuota hemat untuk belajar & streaming.
          </p>

          <div className={`${isMobile ? 'mt-3 flex gap-2 items-center' : 'mt-6 flex gap-3 flex-wrap'}`}>
            <button
              onClick={() => { window.dispatchEvent(new CustomEvent('openAllModal')); window.dispatchEvent(new CustomEvent('openFilter', { detail: 'internet' })); }}
              className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'} bg-white text-gray-900 rounded-lg font-semibold shadow hover:shadow-lg transition`}
            >
              Lihat Paket
            </button>

            <button
              onClick={() => { window.scrollTo({ top: document.getElementById('order-form')?.offsetTop - 80 || 0, behavior: 'smooth' }); }}
              className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'} bg-white/20 border border-white/30 rounded-lg hover:bg-white/10 transition`}
            >
              Order Sekarang
            </button>
          </div>

          {isMobile && <div className="mt-2 text-[11px] opacity-80">Selamat Berbelanja di asrim cell</div>}
        </div>

        {/* Right / visual */}
        <div className={`${isMobile ? 'w-auto flex-shrink-0' : 'md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center gap-4'}`}>
          {/* compact loader on mobile */}
          {isMobile ? (
            <div className="flex items-center gap-2">
              <LoaderAnimation size={56} compact />
              {/* tiny badge (optional) instead of big image */}
              <div className="text-xs font-semibold">Flash Sale</div>
            </div>
          ) : (
            <>
              <LoaderAnimation size={180} />
              <div className="w-full max-w-sm mt-2">
                <img src="/assets/carousel/featured2.jpg" alt="promo" className="w-full h-auto object-contain rounded-lg shadow-lg" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* main App (most logic unchanged) */
export default function App() {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [classSelection, setClassSelection] = useState(CLASS_OPTIONS[0]);

  const [showAllModal, setShowAllModal] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : true);

  useEffect(() => { function onResize() { setIsMobile(window.innerWidth < 768); } window.addEventListener('resize', onResize); return () => window.removeEventListener('resize', onResize); }, []);

  const games = PRODUCTS.filter(p => p.category === 'game');
  const internets = PRODUCTS.filter(p => p.category === 'internet');

  useEffect(() => {
    function onOpenGameCategory() { setSelectedCategory('game'); const el = document.getElementById('products'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    function onOpenAllModal() { setShowAllModal(true); }
    function onModalChoose(e) {
      const product = e.detail;
      if (product && product.id) {
        setSelectedId(product.id);
        setSelectedCategory(product.category || 'all');
        setShowAllModal(false);
        const el = document.getElementById('order-form');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${product.name} dipilih`, showConfirmButton: false, timer: 900 });
      }
    }
    window.addEventListener('openGameCategory', onOpenGameCategory);
    window.addEventListener('openAllModal', onOpenAllModal);
    window.addEventListener('modalChooseProduct', onModalChoose);
    return () => {
      window.removeEventListener('openGameCategory', onOpenGameCategory);
      window.removeEventListener('openAllModal', onOpenAllModal);
      window.removeEventListener('modalChooseProduct', onModalChoose);
    };
  }, []);

  const categories = [
    { key: 'all', label: 'Semua' },
    { key: 'internet', label: 'Internet' },
    { key: 'game', label: 'Game' }
  ];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCategory = selectedCategory === 'all' ? true : p.category === selectedCategory;
    const q = search.trim().toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.provider.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const visibleProducts = isMobile ? filteredProducts.slice(0, 6) : filteredProducts;

  const providerLogos = Array.from(new Map(filteredProducts.map(p => [p.provider, p.logo])).entries()).map(([provider, logo]) => ({ provider, logo }));

  function addToCart(product) {
    setSelectedId(product.id);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${product.name} dipilih`, showConfirmButton: false, timer: 1200 });
  }

  function totalPrice() {
    const p = PRODUCTS.find(p => p.id === selectedId);
    return p ? p.price * qty : 0;
  }

  async function handleSubmitToWhatsApp(e) {
    e.preventDefault();
    if (!selectedId) return Swal.fire({ icon: 'warning', title: 'Pilih paket dulu ya' });
    if (!name.trim() || !phone.trim()) return Swal.fire({ icon: 'warning', title: 'Isi nama dan nomor ponsel kamu dulu yaa' });

    const product = PRODUCTS.find(p => p.id === selectedId);
    const lines = [];
    lines.push('Halo, saya ingin memesan:');
    lines.push(`Kategori: ${product.category === 'game' ? 'Game' : 'Internet'}`);
    lines.push(`Paket: ${product.name} (${product.desc})`);
    lines.push(`Provider: ${product.provider}`);
    lines.push(`Jumlah: ${qty}`);
    lines.push(`Total: Rp ${formatRupiah(totalPrice())}`);
    lines.push('');
    lines.push(`Nama: ${name}`);
    lines.push(`No HP: ${phone}`);
    lines.push(`Metode Pembayaran: ${paymentMethod === 'cash' ? 'Cash' : 'Transfer'}`);
    lines.push(`Kelas: ${classSelection}`);
    if (note.trim()) lines.push(`Catatan: ${note}`);
    lines.push('Mohon konfirmasi ya. Terima kasih.');

    const message = lines.join('\n');
    const waUrl = `https://api.whatsapp.com/send?phone=${Telepon_Atmin}&text=${encodeURIComponent(message)}`;

    const result = await Swal.fire({ title: 'Konfirmasi Pesanan', html: `<pre style="text-align:left; white-space:pre-wrap;">${escapeHtml(message)}</pre>`, showCancelButton: true, confirmButtonText: 'Kirim ke WhatsApp', cancelButtonText: 'Batal', width: 600 });

    if (result.isConfirmed) {
      window.open(waUrl, '_blank');
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Pembelian diarahkan ke WhatsApp', showConfirmButton: false, timer: 1400 });
    }
  }

  function escapeHtml(str) {
    return str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-white shadow-sm fixed w-full z-40">
        <div className="container-max mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-extrabold text-xl">AsrimCell</div>
            <div className="hidden sm:flex items-center text-sm text-gray-500">• Beli Voucher & Top Up</div>
          </div>

          <div className="hidden md:flex gap-6">
            {categories.map(c => (<button key={c.key} onClick={() => setSelectedCategory(c.key)} className={`px-3 py-2 rounded ${selectedCategory === c.key ? 'bg-yellow-500 text-white' : 'bg-white'}`}>{c.label}</button>))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-md focus:outline-none focus:ring" aria-label="Toggle menu">
              {mobileOpen ? (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>) : (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <div className="px-4 py-3 flex flex-col gap-2">
              {categories.map(c => (<button key={c.key} onClick={() => { setSelectedCategory(c.key); setMobileOpen(false); }} className="py-2 text-left">{c.label}</button>))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-28">
        <header className="container-max mx-auto px-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl p-6 shadow-md" data-aos="fade-up">
            <h1 className="text-2xl md:text-4xl font-bold">Beli Voucher & Top Up Mudah</h1>
            <p className="mt-2 text-gray-700">Pilih kategori, pilih paket, isi data, lalu kirim pesanan ke WhatsApp.</p>

            <div className="mt-4 flex flex-col md:flex-row gap-3 items-center">
              <input type="text" placeholder="Cari paket atau provider" value={search} onChange={e => setSearch(e.target.value)} className="w-full md:flex-1 px-4 py-2 rounded-lg shadow-sm border" />
            </div>
          </div>
        </header>

        {/* Replaced carousel area with hero + loader (lightweight) */}
        <HeroBanner isMobile={isMobile} />

        {/* mobile-only game strip */}
        <GameSection games={games} onSelect={(g) => { addToCart(g); setSelectedCategory('game'); const el = document.getElementById('order-form'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} />

        <section id="products" className="container-max mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{selectedCategory === 'all' ? 'Semua Produk' : selectedCategory === 'internet' ? 'Paket Internet' : 'Voucher Game'}</h2>
            {isMobile && filteredProducts.length > 6 && (<button onClick={() => setShowAllModal(true)} className="text-sm text-gray-600">Lihat Semua</button>)}
          </div>

          {providerLogos.length > 0 && (
            <div className="mb-4 flex gap-4 items-center overflow-x-auto pb-2">
              {providerLogos.map(pl => (
                <div key={pl.provider} className="flex-shrink-0 bg-white p-2 rounded-lg shadow text-center" style={{ minWidth: 110 }} data-aos="fade-up">
                  <img src={pl.logo} alt={pl.provider} className="mx-auto h-10 object-contain" />
                  <div className="text-xs text-gray-600 mt-2">{pl.provider}</div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProducts.map(p => (
              <article key={p.id} className={`bg-white rounded-lg p-4 shadow hover:shadow-lg transition ${p.category === 'game' ? 'hidden sm:block' : ''}`} data-aos="fade-up">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-base flex items-center gap-2">{p.name}<span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">{p.provider}</span></h3>
                    <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
                  </div>

                  <div className="text-right w-28 flex-shrink-0">
                    <div className="text-lg font-bold">Rp {formatRupiah(p.price)}</div>
                    <div className="text-xs text-gray-500 mt-2">
                      {p.category === 'game' ? (<span className="flex items-center justify-end gap-2"><GameIcon className="w-4 h-4 inline-block" /><span>Game</span></span>) : (<span className="flex items-center justify-end gap-2"><InternetIcon className="w-4 h-4 inline-block" /><span>Internet</span></span>)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <img src={p.logo} alt={p.provider} className="w-12 h-12 object-contain bg-gray-50 rounded p-1" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Provider</div>
                    <div className="font-semibold">{p.provider}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => addToCart(p)} className={`px-3 py-1 rounded-lg text-sm font-semibold ${selectedId === p.id ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>{selectedId === p.id ? 'Pilihan' : 'Pilih'}</button>
                    <button onClick={() => { addToCart(p); const el = document.getElementById('order-form'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm">Order</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {isMobile && filteredProducts.length > visibleProducts.length && (
            <div className="mt-4 text-center">
              <button onClick={() => setShowAllModal(true)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Tampilkan Semua Paket</button>
            </div>
          )}
        </section>

        <section id="order" className="container-max mx-auto px-4 py-10">
          <div className="bg-white rounded-xl p-6 shadow" id="order-form" data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4">Form Pemesanan</h3>
            <form onSubmit={handleSubmitToWhatsApp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold">Kategori</label>
                <div className="mt-2 flex gap-2">{categories.map(c => (<button key={c.key} type="button" onClick={() => setSelectedCategory(c.key)} className={`px-3 py-2 rounded flex items-center gap-2 ${selectedCategory === c.key ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>{c.label}</button>))}</div>

                <label className="block text-sm font-semibold mt-3">Paket</label>

                {/* ProductSelect used here */}
                <div className="mt-2">
                  <ProductSelect
                    products={PRODUCTS.filter(p => selectedCategory === 'all' ? true : p.category === selectedCategory)}
                    value={selectedId}
                    onChange={(id) => setSelectedId(id)}
                    placeholder={selectedCategory === 'game' ? '-- Cari Paket Game --' : '-- Cari Paket Internet --'}
                  />
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm font-semibold">Jumlah</label>
                  <input type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} className="w-24 px-3 py-2 border rounded-lg" />
                </div>

                <div className="mt-3">
                  <label className="text-sm font-semibold">Catatan (opsional) / jika kalian top up game maka wajib tulis id dan server disini</label>
                  <input value={note} onChange={e => setNote(e.target.value)} placeholder="contoh: id-server" className="w-full mt-2 px-3 py-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold">Nama Pemesan</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-2 px-3 py-2 border rounded-lg" placeholder="Nama lengkap" />

                <label className="block text-sm font-semibold mt-4">No HP (WhatsApp)</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full mt-2 px-3 py-2 border rounded-lg" placeholder="contoh: 0812xxxx (bisa 0 atau 62)" />

                <div className="mt-4">
                  <label className="block text-sm font-semibold">Metode Pembayaran</label>
                  <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full mt-2 px-3 py-2 border rounded-lg">
                    <option value="cash">Cash</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold">Pilih Kelas</label>
                  <SearchableSelect options={CLASS_OPTIONS} value={classSelection} onChange={setClassSelection} placeholder="Cari kelas, misal: 12 TKJ 1..." />
                </div>

                <div className="mt-4 bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Total estimasi:</div>
                  <div className="text-2xl font-bold">Rp {formatRupiah(totalPrice())}</div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">Kirim ke WhatsApp</button>
                  <button type="button" onClick={async () => {
                    if (!selectedId) return Swal.fire({ icon: 'warning', title: 'Pilih paket dulu' });
                    const product = PRODUCTS.find(p => p.id === selectedId);
                    const preview = `PESAN\nProduk: ${product.name}\nQty: ${qty}\nNama: ${name}\nNoHP: ${phone}\nMetode: ${paymentMethod}\nKelas: ${classSelection}`;
                    try { await navigator.clipboard.writeText(preview); Swal.fire({ icon: 'success', title: 'Pesan preview disalin' }); } catch (err) { Swal.fire({ icon: 'error', title: 'Gagal menyalin ke clipboard' }); }
                  }} className="px-4 py-2 bg-gray-200 rounded-lg">Salin Preview</button>
                </div>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-3">Catatan: setelah klik "Kirim ke WhatsApp", nanti kamu bakal diarahin ke wa dan pesan nya bakal keisi otomatis. Jadi kamu tinggal pencet kirim aja yaa.</p>
          </div>
        </section>

        <section id="testimoni" className="container-max mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4" data-aos="fade-right">Testimoni</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow" data-aos="fade-up">"Pelayanan cepat dan voucher langsung aktif" — Salman Alfarissi</div>
            <div className="bg-white p-4 rounded-xl shadow" data-aos="fade-up" data-aos-delay="150">"Harga terjangkau dan terpercaya" — Bayu F</div>
          </div>
        </section>

        <section id="bukti" className="container-max mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4" data-aos="fade-left">Bukti Pembayaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded overflow-hidden shadow" data-aos="zoom-in"><img src="/assets/bukti1.jpg" alt="bukti" /></div>
            <div className="rounded overflow-hidden shadow" data-aos="zoom-in" data-aos-delay="100"><img src="/assets/bukti2.jpg" alt="bukti" /></div>
            <div className="rounded overflow-hidden shadow" data-aos="zoom-in" data-aos-delay="200"><img src="/assets/bukti3.jpg" alt="bukti" /></div>
          </div>
        </section>

        {/* modal / bottom-sheet */}
        <AllProductsModal open={showAllModal} onClose={() => setShowAllModal(false)} products={PRODUCTS} isMobile={isMobile} />

        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="container-max mx-auto px-4 text-center">
            <div className="mb-3">© {new Date().getFullYear()} AsrimCell. All rights reserved.</div>
            <div className="flex items-center justify-center gap-6">
              <a href="https://instagram.com/rimmzz__" target="_blank" rel="noreferrer" className="flex items-center gap-2"><InstagramIcon /><span>rimmzz__</span></a>
              <a href="https://instagram.com/uus_dreamer" target="_blank" rel="noreferrer" className="flex items-center gap-2"><InstagramIcon /><span>uus_dreamer</span></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
