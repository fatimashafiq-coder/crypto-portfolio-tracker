import InvestmentCard from '../../components/InvestmentCard';
import './Dashboard.css'
import { useEffect } from "react";

async function getCryptoPrice(symbol) {
  try {
    const Api = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`;
    const response = await fetch(Api);
    const data = await response.json();
    console.log(`Current price of ${symbol} is ${data.price} USDT`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const Dashboard = () => {
  useEffect(() => {
    getCryptoPrice("BNB");
  }, []);

  return (
   <>
     <div className="container">
      <h2>Your Portfolio</h2>
      <button className='button' onClick={<InvestmentCard/>}>Create</button>
     </div>
   </>
  );
};

export default Dashboard;
