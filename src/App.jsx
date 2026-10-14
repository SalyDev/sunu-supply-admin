import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Commandes from './pages/Commandes'
import CommandeDetail from './pages/CommandeDetail'
import Catalogue from './pages/Catalogue'
import Clients from './pages/Clients'
import Appro from './pages/Appro'
import Tendances from './pages/Tendances'
import Prix from './pages/Prix'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="commandes" element={<Commandes />} />
          <Route path="commandes/:id" element={<CommandeDetail />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="clients" element={<Clients />} />
          <Route path="approvisionnement" element={<Appro />} />
          <Route path="tendances" element={<Tendances />} />
          <Route path="prix" element={<Prix />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
