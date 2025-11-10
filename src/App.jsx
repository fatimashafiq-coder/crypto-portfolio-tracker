import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Investments from './pages/investments/Investments';
import Investment from './pages/investment/Investment';
import EditInvestment from './pages/editInvestment/EditInvestment';
import CreateInvestment from './pages/createInvestment/CreateInvestment';
import Header from './components/Header';
import { v4 as uuidv4 } from "uuid";
import UseLocalStorage from "./Hooks/UseLocalStorage";

function App() {
  const [investments, setInvestments] = UseLocalStorage("investments", []);
useEffect(() => {
  if (!investments.length) return;
  const fetchAllPrices = async () => {
    try {
      const updated = await Promise.all(
        investments.map(async (inv) => {
          const url = `${import.meta.env.VITE_BINANCE_API}?symbol=${inv.coin.toUpperCase()}USDT`;
          console.log("Fetching URL:", url);
          
          const res = await fetch(url);
          if (!res.ok) {
            console.error(`Failed for ${inv.coin}:`, res.status);
            return { ...inv, currentPrice: 0 };
          }
          
          const data = await res.json();
          console.log(`${inv.coin} response:`, data);
          
          return { ...inv, currentPrice: parseFloat(data.price) || 0 };
        })
      );
      
      setInvestments(updated);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  fetchAllPrices();
}, [investments.length]);

  const handleAddInvestment = (newInvestment) => {
    const investmentWithId = { id: uuidv4(), ...newInvestment };
    setInvestments((prev) => [...prev, investmentWithId]);
  };

  const handleDeleteInvestment = (id) => {
    const updatedInvestments = investments.filter((inv) => inv.id !== id);
    setInvestments(updatedInvestments);
  };

  const handleUpdateInvestment = (updatedInvestment) => {
    const updatedList = investments.map((inv) =>
      inv.id === updatedInvestment.id ? updatedInvestment : inv
    );
    setInvestments(updatedList);
  };

  return (
    <div className='main-container'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard investments={investments} />} />
          <Route path='/dashboard' element={<Dashboard investments={investments} />} />
          <Route
            path='/investments'
            element={
              <Investments
                investments={investments}
                onDelete={handleDeleteInvestment}
              />
            }
          />
          <Route path='/investments/:id' element={<Investment />} />
          <Route
            path='/investments/:id/edit'
            element={
              <EditInvestment
                investments={investments}
                onUpdateInvestment={handleUpdateInvestment}
              />
            }
          />
          <Route
            path='/investment/create'
            element={<CreateInvestment onAddInvestment={handleAddInvestment} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
