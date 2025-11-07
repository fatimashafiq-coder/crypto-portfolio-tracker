import React from "react";
import "./PortfolioCards.css";

const PortfolioCards = ({ investments }) => {
  if (!investments || investments.length === 0) {
    return <p className="no-data">No investments yet.</p>;
  }

  const totalInvested = investments.reduce(
    (acc, inv) => acc + inv.quantity * inv.buyPrice,
    0
  );

  const totalCurrentValue = investments.reduce(
    (acc, inv) => acc + (inv.currentPrice ? inv.quantity * inv.currentPrice : 0),
    0
  );

  const totalPL = totalCurrentValue - totalInvested;
  const totalPLPercent = totalInvested
    ? ((totalPL / totalInvested) * 100).toFixed(2)
    : 0;

  const isProfit = totalPL >= 0;

  return (
    <div className="portfolio-summary">
      <div className="portfolio-card">
        <h3>Total Invested</h3>
        <p>${totalInvested.toFixed(2)}</p>
      </div>

      <div className="portfolio-card">
        <h3>Current Value</h3>
        <p>${totalCurrentValue.toFixed(2)}</p>
      </div>

      <div className="portfolio-card">
        <h3>Total P&L</h3>
        <p className={isProfit ? "profit" : "loss"}>
          {isProfit ? "+" : "-"}${Math.abs(totalPL).toFixed(2)}
        </p>
      </div>

      <div className="portfolio-card">
        <h3>P&L Percentage</h3>
        <p className={isProfit ? "profit" : "loss"}>
          {isProfit ? "+" : "-"}
          {Math.abs(totalPLPercent)}%
        </p>
      </div>
    </div>
  );
};

export default PortfolioCards;
