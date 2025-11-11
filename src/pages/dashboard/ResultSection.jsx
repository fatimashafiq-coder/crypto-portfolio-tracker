import React from 'react';

const ResultsSection = ({ results }) => {
  if (!results) return null; 

  const isProfit = parseFloat(results.plPercentage) >= 0;
  const isAmountPositive = parseFloat(results.pnlAmount) >= 0;

  return (
    <div className="results-section">
      <h2>📊 Calculation Results</h2>

      <div className="results-grid">
        <div className="result-card">
          <div className="result-label">TOTAL INVESTED</div>
          <div className="result-value">${results.totalInvested}</div>
        </div>

        <div className="result-card">
          <div className="result-label">TARGET PRICE</div>
          <div className="result-value">${results.targetPrice}</div>
        </div>

        <div className="result-card">
          <div className="result-label">P&L PERCENTAGE</div>
          <div
            className="result-value"
            style={{ color: isProfit ? '#10b981' : '#ef4444' }}
          >
            {isProfit ? '+' : ''}
            {results.plPercentage}%
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">P&L AMOUNT</div>
          <div
            className="result-value"
            style={{ color: isAmountPositive ? '#10b981' : '#ef4444' }}
          >
            {isAmountPositive ? '+' : ''}
            ${results.pnlAmount}
          </div>
        </div>
      </div>

      <div className="result-card result-card-full">
        <div className="result-label">FINAL VALUE</div>
        <div className="result-value-large">${results.finalValue}</div>
      </div>
    </div>
  );
};

export default ResultsSection;
