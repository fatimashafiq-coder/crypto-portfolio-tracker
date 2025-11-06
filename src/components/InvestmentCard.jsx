import React, { useEffect, useState } from "react";
import "./InvestmentCard.css";

function InvestmentCard({ investment, onDelete }) {
  const {
    coin,
    quantity,
    buyPrice,
    date,
    time,
    thresholdType,
    profitThreshold,
    lossThreshold,
  } = investment;

  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const symbol = coin.toUpperCase();
        const response = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        const data = await response.json();
        setCurrentPrice(parseFloat(data.price));
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    }
    fetchPrice();
  }, [coin]);

  const invested = quantity * buyPrice;
  const currentValue = currentPrice ? quantity * currentPrice : 0;
  const profitLoss = currentValue - invested;
  const profitLossPercent = invested ? ((profitLoss / invested) * 100).toFixed(2) : 0;
  const isProfit = profitLoss >= 0;

  return (
    <div className="investment-card">
      <div className="card-top">
        <h3 className="coin-name">{coin}</h3>
        <div className="action-buttons">
          <button className="btn-edit">✏️</button>
          <button className="btn-delete" onClick={onDelete}>🗑️</button> 
        </div>
      </div>

      <div className="card-row">
        <span className="label">QUANTITY</span>
        <span className="label">BUY PRICE</span>
      </div>
      <div className="card-row values">
        <span className="value">{quantity}</span>
        <span className="value">${buyPrice}</span>
      </div>

      <div className="card-row">
        <span className="label">CURRENT PRICE</span>
        <span className="label">INVESTED</span>
      </div>
      <div className="card-row values">
        <span className="value">{currentPrice ? `$${currentPrice.toFixed(4)}` : "Loading..."}</span>
        <span className="value">${invested.toFixed(2)}</span>
      </div>

      <div className="card-row">
        <span className="label">CURRENT VALUE</span>
        <span className="label">THRESHOLD</span>
      </div>
      <div className="card-row values">
        <span className="value">${currentValue.toFixed(2)}</span>
        <span className="threshold-badge">
          {thresholdType !== "noThreshold" ? `+${profitThreshold}% / ${lossThreshold}%` : "None"}
        </span>
      </div>

      <div className="purchase-date-section">
        <span className="label">PURCHASE DATE</span>
        <span className="date-text">{date}, {time}</span>
      </div>

      <div className="card-row total-row">
        <span>Profit/Loss</span>
        <span>P&L %</span>
      </div>
      <div className="card-row profit-loss-values">
        <span className={isProfit ? "profit" : "loss"}>
          ${profitLoss.toFixed(2)}
        </span>
        <span className={isProfit ? "profit" : "loss"}>
          {isProfit ? '+' : ''}{profitLossPercent}%
        </span>
      </div>
    </div>
  );
}

export default InvestmentCard;
