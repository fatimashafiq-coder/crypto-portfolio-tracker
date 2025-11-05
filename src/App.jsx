import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import InvestmentFields from './investmentFields/InvestmentFields'
import Dashboard from './pages/Dashboard'
import Investments from './pages/Investments'
import Investment from './pages/Investment'
import EditInvestment from './pages/EditInvestment'
import CreateInvestment from './pages/CreateInvestment'
import Header from './components/Header'

function App() {
  return (
    <Router>
    <Header/>
 <InvestmentFields/>
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/investments' element={<Investments/>}/>
    <Route path='/investment' element={<Investment/>}/>
    <Route path='editinvestment' element={<EditInvestment/>}/>
    <Route path='/createinvestment' element={<CreateInvestment/>}/>
  </Routes>
    </Router>
  )
}

export default App
