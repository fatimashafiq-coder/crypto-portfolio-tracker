import { useNavigate } from "react-router-dom";
import "./InvestmentCard.css";
import { useInvestments } from "../../context/InvestmentContext";

function InvestmentCard({ investment }) {
  const {
    id,
    coin,
    quantity,
    buyPrice,
    currentPrice,
    date,
    time,
    thresholdType,
    profitThreshold,
    lossThreshold,
  } = investment;

  const navigate = useNavigate();
  const { deleteInvestment } = useInvestments();
  const invested = quantity * buyPrice;
  const currentValue = currentPrice ? quantity * currentPrice : 0;
  console.log(currentPrice);
  const profitLoss = currentValue - invested;
  const profitLossPercent = invested
    ? ((profitLoss / invested) * 100).toFixed(2)
    : 0;
  const isProfit = profitLoss >= 0;

  const handleEdit = () => {
    navigate(`/investments/${id}/edit`);
  };
  const handleDelete = () => {
    deleteInvestment(id);
  };

  return (
    <div className="investment-card">
      <div className="card-top">
        <h3 className="coin-name">{coin}</h3>
        <div className="action-buttons">
          <button className="btn-edit" onClick={handleEdit}>✏️</button>
          <button className="btn-delete" onClick={handleDelete}>🗑️</button>
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
        <span className="value">
          {currentPrice ? `$${currentPrice.toFixed(4)}` : "Loading..."}
        </span>
        <span className="value">${invested.toFixed(2)}</span>
      </div>
      <div className="card-row">
        <span className="label">CURRENT VALUE</span>
        <span className="label">THRESHOLD</span>
      </div>
      <div className="card-row values">
        <span className="value">${currentValue.toFixed(2)}</span>
        <span className="threshold-badge">
          {thresholdType !== "noThreshold"
            ? `+${profitThreshold}% / ${lossThreshold}%`
            : "None"}
        </span>
      </div>

      <div className="purchase-date-section">
        <span className="label">PURCHASE DATE</span>
        <span className="date-text">
          {date}, {time}
        </span>
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
          {isProfit ? "+" : ""}
          {profitLossPercent}%
        </span>
      </div>
    </div>
  );
}

export default InvestmentCard;
