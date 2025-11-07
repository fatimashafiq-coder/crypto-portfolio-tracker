import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [result, setResult] = useState(null);
  const [visible, setVisible] = useState(true); 

  const [form, setForm] = useState({
    numberOfCoins: "",
    buyPrice: "",
    plPercentage: "",
    targetPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calcResults = () => {
    const { numberOfCoins, buyPrice, plPercentage, targetPrice } = form;
    const coins = parseFloat(numberOfCoins) || 0;
    const price = parseFloat(buyPrice) || 0;
    const totalInvested = coins * price;

    let finalValue = 0,
      plAmount = 0,
      plPercent = 0,
      target = 0;

    if (plPercentage) {
      plPercent = parseFloat(plPercentage);
      plAmount = (totalInvested * plPercent) / 100;
      finalValue = totalInvested + plAmount;
      target = coins ? finalValue / coins : 0;
    } else if (targetPrice) {
      target = parseFloat(targetPrice);
      finalValue = coins * target;
      plAmount = finalValue - totalInvested;
      plPercent = totalInvested ? (plAmount / totalInvested) * 100 : 0;
    }

    setResult({
      totalInvested: totalInvested.toFixed(2),
      targetPrice: target.toFixed(2),
      plPercentage: plPercent.toFixed(2),
      plAmount: plAmount.toFixed(2),
      finalValue: finalValue.toFixed(2),
    });
  };

  const InputField = ({ label, name, placeholder, disabled }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="number"
        name={name}
        className="field"
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );

  const ResultCard = ({ label, value, isPositive }) => (
    <div className="result-card">
      <p className="result-label">{label}</p>
      <p
        className={`result-value ${
          isPositive === undefined
            ? ""
            : isPositive
            ? "positive"
            : "negative"
        }`}
      >
        {value}
      </p>
    </div>
  );
  if (!visible) return null;

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>P&L Calculator</h2>
        <span className="close-btn" onClick={() => setVisible(false)}>
          ×
        </span>
      </div>

      <div className="divider" />

      <div className="modal-body">
        <div className="input-row">
          <InputField label="Number of Coins" name="numberOfCoins" placeholder="5" />
          <InputField label="Buy Price (USDT)" name="buyPrice" placeholder="45000" />
        </div>

        <div className="calculate-by-section">
          <h3>Calculate By (Choose One)</h3>
          <div className="input-row">
            <InputField
              label="P&L Percentage (%)"
              name="plPercentage"
              placeholder="e.g. 30"
              disabled={form.targetPrice !== ""}
            />
            <InputField
              label="Target Price (USDT)"
              name="targetPrice"
              placeholder="e.g. 50000"
              disabled={form.plPercentage !== ""}
            />
          </div>
        </div>

        <button onClick={calcResults} className="calculate-btn">
          Calculate
        </button>

        {result && (
          <div className="results-container">
            <h3>📊 Calculation Results</h3>
            <div className="results-grid">
              <ResultCard label="TOTAL INVESTED" value={`$${result.totalInvested}`} />
              <ResultCard label="TARGET PRICE" value={`$${result.targetPrice}`} />
              <ResultCard
                label="P&L PERCENTAGE"
                value={`${
                  parseFloat(result.plPercentage) >= 0 ? "+" : ""
                }${result.plPercentage}%`}
                isPositive={parseFloat(result.plPercentage) >= 0}
              />
              <ResultCard
                label="P&L AMOUNT"
                value={`${
                  parseFloat(result.plAmount) >= 0 ? "+" : ""
                }$${result.plAmount}`}
                isPositive={parseFloat(result.plAmount) >= 0}
              />
            </div>

            <div className="final-value-card">
              <p className="result-label">FINAL VALUE</p>
              <p className="final-value">${result.finalValue}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
