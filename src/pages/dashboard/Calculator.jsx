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
  if (name === "plPercentage" && value !== "") {
    setIsTargetEnabled(true);
  } else if (name === "plPercentage" && value === "") {
    setIsTargetEnabled(false); 
  }
};

  const calcResults = () => {
    const coins = parseFloat(form.numberOfCoins) || 0;
    const price = parseFloat(form.buyPrice) || 0;
    const totalInvested = coins * price;

    let finalValue = 0,
      plAmount = 0,
      plPercent = 0,
      target = 0;

    if (form.plPercentage) {
      plPercent = parseFloat(form.plPercentage) || 0;
      plAmount = (totalInvested * plPercent) / 100;
      finalValue = totalInvested + plAmount;
      target = coins ? finalValue / coins : 0;
    } else if (form.targetPrice) {
      target = parseFloat(form.targetPrice) || 0;
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

  const InputField = ({ label, name, placeholder }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        className="field"
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
      />
    </div>
  );

  const ResultCard = ({ label, value, isPositive }) => (
    <div className="result-card">
      <p className="result-label">{label}</p>
      <p
        className={`result-value ${
          isPositive === undefined ? "" : isPositive ? "positive" : "negative"
        }`}
      >
        {value}
      </p>
    </div>
  );

  if (!visible) return null;

  const basicInputs = [
    { label: "Number of Coins", name: "numberOfCoins", placeholder: "5" },
    { label: "Buy Price (USDT)", name: "buyPrice", placeholder: "45000" },
  ];

  const calcInputs = [
    { label: "P&L Percentage (%)", name: "plPercentage", placeholder: "e.g. 30" },
    { label: "Target Price (USDT)", name: "targetPrice", placeholder: "e.g. 50000" },
  ];

  const resultsConfig = [
    { label: "TOTAL INVESTED", value: `$${result?.totalInvested}` },
    { label: "TARGET PRICE", value: `$${result?.targetPrice}` },
    {
      label: "P&L PERCENTAGE",
      value: `${parseFloat(result?.plPercentage || 0) >= 0 ? "+" : ""}${result?.plPercentage}%`,
      isPositive: parseFloat(result?.plPercentage || 0) >= 0,
    },
    {
      label: "P&L AMOUNT",
      value: `${parseFloat(result?.plAmount || 0) >= 0 ? "+" : ""}$${result?.plAmount}`,
      isPositive: parseFloat(result?.plAmount || 0) >= 0,
    },
  ];

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>P&L Calculator</h2>
        <span className="close-btn" onClick={() => setVisible(false)}>×</span>
      </div>

      <div className="divider" />

      <div className="modal-body">
        <div className="input-row">
          {basicInputs.map((input) => (
            <InputField key={input.name} {...input} />
          ))}
        </div>

        <div className="calculate-by-section">
          <h3>Calculate By (Choose One)</h3>
          <div className="input-row">
            {calcInputs.map((input) => (
              <InputField key={input.name} {...input} />
            ))}
          </div>
        </div>

        <button onClick={calcResults} className="calculate-btn">Calculate</button>

        {result && (
          <div className="results-container">
            <h3>📊 Calculation Results</h3>
            <div className="results-grid">
              {resultsConfig.map((res) => (
                <ResultCard key={res.label} {...res} />
              ))}
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
