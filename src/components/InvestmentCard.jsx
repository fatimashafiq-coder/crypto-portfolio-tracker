import React from "react";
import './InvestmentCard.css';
function InvestmentCard({ investment }) {
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

  const invested = quantity * buyPrice;
  return (
    <div className="protfolio-cards">
    

      <div className="portfolio-card">
        <h2 className="heading">{coin}</h2>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Buy Price:</strong> ${buyPrice}</p>
        <p><strong>Invested:</strong> ${invested}</p>
        <p><strong>Date:</strong> {date} {time}</p>
      </div>

      {thresholdType !== "noThreshold" && (
        <div className="threshold">
          <p><strong>Threshold:</strong> {profitThreshold}/ {lossThreshold}</p>
        </div>
      )}
    </div>
  );
}

export default InvestmentCard;
