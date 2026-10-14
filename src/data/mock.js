// Données de démonstration reprises des maquettes (design/*.dc.html).
// À remplacer par des appels API.

export const fmt = (n) => n.toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g, ' ')
export const F = (n) => `${fmt(n)} F`
export const CFA = (n) => `${fmt(n)} CFA`

export const ORDER_STATUS = {
  pending: { label: 'En attente', cls: 'b-wait' },
  confirmed: { label: 'Confirmée', cls: 'b-confirm' },
  shipping: { label: 'En livraison', cls: 'b-ship' },
  delivered: { label: 'Livrée', cls: 'b-ok' },
  cancelled: { label: 'Annulée', cls: 'b-cancel' },
}

export const STATUS_FLOW = ['received', 'pending', 'confirmed', 'shipping', 'delivered']

export const PAYMENT_STATUS = {
  paid: { label: 'Payée', cls: 'b-ok' },
  pending: { label: 'En att.', cls: 'b-wait' },
}

export const products = [
  { id: 'carotte', name: 'Carotte', emoji: '🥕', category: 'Racines', catCls: { background: '#FFF3E0', color: '#E65100' }, bg: 'linear-gradient(135deg,#FFF3E0,#FFCCBC)', market: 700, sale: 1200, purchase: null, active: true },
  { id: 'tomate', name: 'Tomate', emoji: '🍅', category: 'Légumes-fruits', catCls: { background: '#FEE2E2', color: '#B91C1C' }, bg: 'linear-gradient(135deg,#FFEBEE,#FFCDD2)', market: 550, sale: 800, purchase: 600, active: true },
  { id: 'oignon', name: 'Oignon', emoji: '🧅', category: 'Aromates', catCls: { background: '#FEF3C7', color: '#92400E' }, bg: 'linear-gradient(135deg,#FFF8E1,#FFE082)', market: 380, sale: 600, purchase: null, active: true },
  { id: 'laitue', name: 'Laitue', emoji: '🥬', category: 'Légumes-feuilles', catCls: { background: '#DCFCE7', color: '#15803D' }, bg: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)', market: 300, sale: 500, purchase: null, active: true },
  { id: 'gombo', name: 'Gombo', emoji: '🫑', category: 'Légumes-fruits', catCls: { background: '#DCFCE7', color: '#15803D' }, bg: 'linear-gradient(135deg,#E8F5E9,#A5D6A7)', market: 650, sale: 1000, purchase: null, active: true },
  { id: 'piment', name: 'Piment', emoji: '🌶️', category: 'Aromates', catCls: { background: '#FEE2E2', color: '#B91C1C' }, bg: 'linear-gradient(135deg,#FFEBEE,#FFCDD2)', market: 900, sale: 1500, purchase: null, active: true },
]

export const CATEGORIES = ['Légumes-feuilles', 'Légumes-fruits', 'Racines', 'Aromates']
export const UNITS = ['kg', 'botte', 'pièce']

export const orders = [
  {
    id: 'SS-0042', client: 'Fatou Diallo', phone: '77 123 45 67', amount: 4400, delivery: 'Mer. 8 oct.', deliveryShort: 'Mer. 15h',
    status: 'pending', payment: 'pending',
    placedAt: 'Lundi 7 oct. 2026 à 14h32', slot: 'Mercredi 15h–19h', paymentMethod: 'Espèces à la livraison',
    deliveryFee: 2000,
    items: [
      { product: 'carotte', qty: 1, unit: 400 },
      { product: 'tomate', qty: 2, unit: 600 },
      { product: 'oignon', qty: 1, unit: 800 },
    ],
    address: { line: 'Rue 10, Villa 42', area: 'Thiaroye, Dakar' },
    note: 'Portail bleu en face de la mosquée',
    clientSince: 'mars 2026',
    history: { orders: 8, revenue: 32500, last: 'il y a 12 jours' },
  },
  { id: 'SS-0041', client: 'Moussa Touré', phone: '76 456 78 90', amount: 6200, delivery: 'Sam. 11 oct.', deliveryShort: 'Sam. 15h', status: 'confirmed', payment: 'paid' },
  { id: 'SS-0040', client: 'Aïda Sarr', phone: '70 789 01 23', amount: 3100, delivery: 'Mer. 8 oct.', deliveryShort: 'Mer. 15h', status: 'shipping', payment: 'paid' },
  { id: 'SS-0039', client: 'Ibrahima Fall', phone: '77 234 56 78', amount: 5600, delivery: 'Sam. 4 oct.', deliveryShort: 'Sam. 15h', status: 'delivered', payment: 'paid' },
  { id: 'SS-0038', client: 'Rokhaya Ndiaye', phone: '78 345 67 89', amount: 2800, delivery: 'Mer. 1 oct.', deliveryShort: 'Mer. 15h', status: 'delivered', payment: 'pending' },
  { id: 'SS-0037', client: 'Mamadou Diop', phone: '76 567 89 01', amount: 7200, delivery: 'Sam. 27 sept.', deliveryShort: 'Sam. 15h', status: 'cancelled', payment: 'pending' },
]

export const orderStats = { pending: 3, confirmed: 5, shipping: 2, delivered: 42, total: 42 }

export const dashboard = {
  date: 'Mercredi 7 octobre 2026',
  revenue: { total: 48500, vegetables: 24500, delivery: 24000 },
  purchaseCost: 18200,
  netGain: 6300,
  margin: '25,7 %',
  losses: 0,
  ordersCount: 12,
  avgBasket: 2040,
  deliveryResult: 24000,
  deliveryUnit: 2000,
}

export const clients = [
  { name: 'Fatou Diallo', phone: '77 123 45 67', area: 'Thiaroye', orders: 8, revenue: 32500, last: 'il y a 12 jours', status: 'active', color: ['#D6E8CF', '#1F5E3B'] },
  { name: 'Mamadou Sarr', phone: '77 234 56 78', area: 'Pikine', orders: 5, revenue: 19200, last: 'il y a 3 jours', status: 'active', color: ['#FFF3E0', '#E65100'] },
  { name: 'Awa Ndiaye', phone: '77 345 67 89', area: 'Guédiawaye', orders: 12, revenue: 48600, last: 'hier', status: 'active', color: ['#E8F5E9', '#1B5E20'] },
  { name: 'Oumar Faye', phone: '77 456 78 90', area: 'Thiaroye', orders: 2, revenue: 7400, last: 'il y a 32 jours', status: 'inactive', color: ['#FFEBEE', '#B71C1C'] },
  { name: 'Rokhaya Ba', phone: '78 567 89 01', area: 'Keur Massar', orders: 4, revenue: 14800, last: 'il y a 7 jours', status: 'active', color: ['#EDE7F6', '#4527A0'] },
  { name: 'Ibrahima Mbaye', phone: '70 678 90 12', area: 'Pikine', orders: 1, revenue: 3200, last: 'il y a 2 jours', status: 'new', color: ['#E3F2FD', '#0D47A1'] },
]

export const CLIENT_STATUS = {
  active: { label: 'Actif', style: { background: '#D4EDDA', color: '#155724' } },
  inactive: { label: 'Inactif', style: { background: '#F5F0E3', color: '#3F4F43' } },
  new: { label: 'Nouveau', style: { background: '#EFF5EF', color: '#1F5E3B' } },
}

export const clientStats = { total: 47, active: 38, new: 6, avgBasket: 4850, loyalty: '3,2' }

export const shoppingList = {
  date: 'Mercredi 7 octobre 2026',
  confirmedOrders: 7,
  items: [
    { product: 'tomate', qty: 4.5 },
    { product: 'carotte', qty: 3.3 },
    { product: 'oignon', qty: 2.8 },
    { product: 'laitue', qty: 1.7 },
    { product: 'gombo', qty: 1.1 },
  ],
  recent: [
    { date: 'Mardi 6 oct.', amount: 7200, orders: 5, kg: '10,5', margin: 3150 },
    { date: 'Lundi 5 oct.', amount: 9850, orders: 8, kg: '14,2', margin: 4200 },
    { date: 'Samedi 4 oct.', amount: 12300, orders: 11, kg: '18,8', margin: 4900 },
  ],
}

export const trends = {
  sparklines: [
    { product: 'tomate', change: 18, price: 620, color: '#E53935', points: { 7: [32, 28, 24, 30, 16, 10, 8], 30: [30, 32, 26, 22, 18, 12, 8], 90: [20, 24, 30, 26, 18, 14, 8] } },
    { product: 'oignon', change: -5, price: 750, color: '#F57F17', points: { 7: [10, 12, 8, 14, 18, 22, 26], 30: [14, 10, 12, 16, 20, 22, 26], 90: [8, 12, 16, 14, 20, 24, 26] } },
    { product: 'carotte', change: 0, price: 350, color: '#F57C00', points: { 7: [20, 22, 18, 20, 19, 21, 20], 30: [18, 20, 22, 20, 18, 20, 20], 90: [24, 20, 18, 22, 20, 19, 20] } },
    { product: 'gombo', change: 32, price: 1100, color: '#43A047', points: { 7: [34, 30, 28, 20, 14, 8, 4], 30: [36, 34, 30, 26, 18, 10, 4], 90: [30, 34, 32, 24, 16, 10, 4] } },
  ],
  table: [
    { name: 'Tomate', purchase: 520, sale: 600, margin: 15, trend: 'up', alert: 'watch' },
    { name: 'Oignon', purchase: 650, sale: 800, margin: 23, trend: 'down', alert: 'ok' },
    { name: 'Carotte', purchase: 280, sale: 400, margin: 43, trend: 'stable', alert: 'ok' },
    { name: 'Gombo', purchase: 980, sale: 1200, margin: 22, trend: 'strong-up', alert: 'adjust' },
    { name: 'Laitue', purchase: 200, sale: 350, margin: 75, trend: 'down', alert: 'ok' },
  ],
}

export const priceSuggestions = [
  { product: 'carotte', market: 700, purchase: 700, sale: 1200, suggested: 1000, note: 'Bonne marge' },
  { product: 'tomate', market: 550, purchase: 700, sale: 800, suggested: 1000, note: 'Marge sous la cible' },
  { product: 'oignon', market: 380, purchase: 380, sale: 600, suggested: 680, note: 'Dans la cible' },
  { product: 'laitue', market: 300, purchase: 300, sale: 500, suggested: 600, note: 'Dans la cible' },
  { product: 'gombo', market: 650, purchase: 850, sale: 1000, suggested: 1150, note: 'Coût en hausse +31%' },
  { product: 'piment', market: 900, purchase: 900, sale: 1500, suggested: 1200, note: 'Excellente marge' },
]

export const productById = Object.fromEntries(products.map((p) => [p.id, p]))
