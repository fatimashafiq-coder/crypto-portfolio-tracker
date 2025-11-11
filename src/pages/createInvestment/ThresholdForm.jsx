import "./ThresholdForm.css";
const ThresholdForm = ({ values, handleChange }) => {
  const isDisabled = values.thresholdType === "noThreshold";

  return (
    <div className="threshold-container">
      <h2 className="threshold-title">Set Sell Threshold (Optional)</h2>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="thresholdType"
            value="noThreshold"
            checked={values.thresholdType === "noThreshold"}
            onChange={handleChange}
          />
          No Threshold
        </label>
        <label>
          <input
            type="radio"
            name="thresholdType"
            value="percentage"
            checked={values.thresholdType === "percentage"}
            onChange={handleChange}
          />
          Percentage (%)
        </label>
        <label>
          <input
            type="radio"
            name="thresholdType"
            value="targetPrice"
            checked={values.thresholdType === "targetPrice"}
            onChange={handleChange}
          />
          Target Price (USDT)
        </label>
      </div>

      <div className="threshold-inputs">
        <div className="input-field">
          <label>Profit Threshold</label>
          <input
            type="number"
            name="profitThreshold"
            placeholder="10"
            value={values.profitThreshold}
            onChange={handleChange}
              disabled={isDisabled}
          />
        </div>

        <div className="input-field">
          <label>Loss Threshold</label>
          <input
            type="number"
            name="lossThreshold"
            placeholder="-5"
            value={values.lossThreshold}
            onChange={handleChange}
              disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ThresholdForm;
