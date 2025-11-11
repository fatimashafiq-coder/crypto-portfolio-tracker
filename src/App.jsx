import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Investments from './pages/investments/Investments';
import Investment from './pages/investment/Investment';
import EditInvestment from './pages/editInvestment/EditInvestment';
import CreateInvestment from './pages/createInvestment/CreateInvestment';
import Header from './components/Header';
import { InvestmentProvider } from './context/InvestmentContext';

function App() {
  return (
    <div className='main-container'>
      <InvestmentProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/investments' element={<Investments />} />
            <Route path='/investments/:id' element={<Investment />} />
            <Route path='/investments/:id/edit' element={<EditInvestment />} />
            <Route path='/investment/create' element={<CreateInvestment />} />
          </Routes>
        </Router>
      </InvestmentProvider>
    </div>
  );
}

export default App;
