import { Field } from "formik";
import "./ThresholdForm.css";

const ThresholdForm = ({ values }) => {
  const isDisabled = values.thresholdType === "noThreshold";
  return (
    <div className="p-5 mt-5">
      <h2 className="text-[#667eea] mt-4 font-semibold text-xl">
        Set Sell Threshold (Optional)
      </h2>
      <div className="flex gap-6 mt-5">
        <label>
          <Field
            type="radio"
            name="thresholdType"
            value="noThreshold"
          />
          No Threshold
        </label>

        <label>
          <Field
            type="radio"
            name="thresholdType"
            value="percentage"
          />
          Percentage (%)
        </label>

        <label>
          <Field
            type="radio"
            name="thresholdType"
            value="targetPrice"
          />
          Target Price (USDT)
        </label>
      </div>
      <div className="threshold-inputs">
        <div className="input-field">
          <label>Profit Threshold</label>
          <Field
            type="number"
            name="profitThreshold"
            placeholder="10"
            disabled={isDisabled}
          />
        </div>

        <div className="input-field">
          <label>Loss Threshold</label>
          <Field
            type="number"
            name="lossThreshold"
            placeholder="-5"
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ThresholdForm;
