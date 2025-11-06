import { Field } from "formik";
import Select from "react-select";
import "./InvestmentForm.css";

function InvestmentForm({ coinOptions }) {
  return (
    <div className="investment-form-container">
      <h2 className="form-title">Add New Investment</h2>

      <div className="investment-form">
        <div className="form-group">
          <label>Coin Symbol</label>
          <Field
            name="coin"
            component={({ field, form }) => (
              <Select
               placeholder="Type to search..."
                options={coinOptions}
                value={coinOptions.find((option) => option.value === field.value)} 
                onChange={(option) => form.setFieldValue("coin", option.value)} 
              />
            )}
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <Field
            type="number"
            name="quantity"
            placeholder="0.5"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Buy Price (USDT)</label>
          <Field
            type="number"
            name="buyPrice"
            placeholder="45000"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Purchase Date</label>
          <Field type="date" name="date" className="input-field" />
        </div>

        <div className="form-group">
          <label>Purchase Time</label>
          <Field type="time" name="time" className="input-field" />
        </div>
      </div>
    </div>
  );
}

export default InvestmentForm;
