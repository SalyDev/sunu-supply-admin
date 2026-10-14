import { useState } from 'react'
import Topbar from '../components/Topbar'
import { PurchaseTag } from '../components/Badges'
import { SearchIcon } from '../components/Icons'
import { products as initialProducts, CATEGORIES, UNITS, CFA } from '../data/mock'

const emptyForm = { name: '', category: CATEGORIES[0], market: '', sale: '', purchase: '', unit: UNITS[0] }

export default function Catalogue() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  const [form, setForm] = useState(emptyForm)

  const q = query.trim().toLowerCase()
  const rows = products.filter((p) => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))

  const toggle = (id) => setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const add = (e) => {
    e.preventDefault()
    if (!form.name || !form.market || !form.sale) return
    setProducts((ps) => [...ps, {
      id: `${form.name.toLowerCase()}-${Date.now()}`,
      name: form.name,
      emoji: '🥗',
      category: form.category,
      catCls: { background: '#F5F0E3', color: '#3F4F43' },
      bg: '#F5F0E3',
      market: Number(form.market),
      sale: Number(form.sale),
      purchase: form.purchase ? Number(form.purchase) : null,
      active: true,
    }])
    setForm(emptyForm)
  }

  return (
    <>
      <Topbar
        title="Catalogue"
        extra={<span className="badge pill b-brand">{products.length} produits</span>}
      >
        <label className="search" style={{ background: 'var(--cream)', border: 'none' }}>
          <SearchIcon />
          <input placeholder="Rechercher…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <a className="btn primary" href="#ajout">+ Nouveau produit</a>
      </Topbar>

      <div className="legend">
        <span style={{ fontWeight: 600 }}>Légende :</span>
        <span>📋 <b>Prix marché</b> = estimation recueillie avant le jour J</span>
        <span>🏷️ <b>Prix de vente</b> = affiché sur le site</span>
        <span>🛒 <b>Prix d'achat</b> = réel le jour J (si vide = prix marché)</span>
        <span>💰 <b>Marge/kg</b> = vente − achat</span>
      </div>

      <div className="content">
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 200 }}>Produit</th>
                <th>Catégorie</th>
                <th className="r">📋 Prix marché</th>
                <th className="r" style={{ color: 'var(--green-dark)' }}>🏷️ Prix vente</th>
                <th className="r">🛒 Prix d'achat</th>
                <th className="c" style={{ color: 'var(--green)' }}>💰 Marge/kg</th>
                <th className="c">Actif</th>
                <th className="c">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const purchase = p.purchase ?? p.market
                const margin = p.sale - purchase
                return (
                  <tr key={p.id} style={{ background: i % 2 ? '#FAFAF8' : undefined, opacity: p.active ? 1 : 0.55 }}>
                    <td>
                      <div className="product">
                        <div className="product-icon" style={{ background: p.bg }}>{p.emoji}</div>
                        <span className="product-name">{p.name}</span>
                      </div>
                    </td>
                    <td><span className="badge pill" style={{ ...p.catCls, fontWeight: 500 }}>{p.category}</span></td>
                    <td className="r grey">{CFA(p.market)}</td>
                    <td className="r" style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-dark)' }}>{CFA(p.sale)}</td>
                    <td className={`r ${purchase > p.market ? 'neg' : 'grey'}`}>
                      {CFA(purchase)} <PurchaseTag market={p.market} purchase={purchase} />
                    </td>
                    <td className="c" style={{ fontWeight: 800, fontSize: 14, color: margin >= 0 ? 'var(--green)' : 'var(--red)' }}>
                      {margin >= 0 ? '+' : ''}{CFA(margin)}
                    </td>
                    <td className="c">
                      <button className={`switch${p.active ? ' on' : ''}`} onClick={() => toggle(p.id)} aria-label={`Activer ${p.name}`} />
                    </td>
                    <td className="c"><button className="btn sm" style={{ fontWeight: 400 }}>✏️ Modifier</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length === 0 && <div className="empty">Aucun produit trouvé.</div>}
        </div>

        <form id="ajout" className="card pad-sm" style={{ marginTop: 14 }} onSubmit={add}>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-dark)', marginBottom: 14 }}>+ Ajouter un produit</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 110px 110px 110px 80px auto', gap: 10, alignItems: 'end' }}>
            <div>
              <div className="field-label">Nom</div>
              <input className="input" placeholder="ex. Aubergine" value={form.name} onChange={set('name')} />
            </div>
            <div>
              <div className="field-label">Catégorie</div>
              <select className="input" value={form.category} onChange={set('category')}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div className="field-label">📋 Prix marché</div>
              <input className="input" type="number" placeholder="CFA/kg" value={form.market} onChange={set('market')} />
            </div>
            <div>
              <div className="field-label" style={{ color: 'var(--green-dark)' }}>🏷️ Prix vente</div>
              <input className="input" type="number" placeholder="CFA/kg" style={{ borderColor: 'var(--green-light)' }} value={form.sale} onChange={set('sale')} />
            </div>
            <div>
              <div className="field-label">🛒 Prix achat</div>
              <input className="input" type="number" placeholder="optionnel" style={{ background: '#FAFAFA' }} value={form.purchase} onChange={set('purchase')} />
            </div>
            <div>
              <div className="field-label">Unité</div>
              <select className="input" value={form.unit} onChange={set('unit')}>
                {UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
            <button type="submit" className="btn primary" style={{ padding: '9px 16px' }}>Ajouter</button>
          </div>
        </form>
      </div>
    </>
  )
}
