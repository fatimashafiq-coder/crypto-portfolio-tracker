import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Investments from './pages/investments/Investments';
import Investment from './pages/investment/Investment';
import EditInvestment from './pages/editInvestment/EditInvestment';
import CreateInvestment from './pages/createInvestment/CreateInvestment';
import { InvestmentProvider } from './context/InvestmentContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <div className='main-container'>
      <InvestmentProvider>
        <Router>
          <Routes>
            <Route path='/' element={<AppLayout />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='investments' element={<Investments />} />
              <Route path='investments/:id' element={<Investment />} />
              <Route path='investments/:id/edit' element={<EditInvestment />} />
              <Route path='investment/create' element={<CreateInvestment />} />
            </Route>
          </Routes>
        </Router>
      </InvestmentProvider>
    </div>
  );
}

export default App;
