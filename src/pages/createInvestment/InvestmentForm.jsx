import { useEffect } from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";
import Select from "react-select";
import "./InvestmentForm.css";

const FormField = ({ label, name, type = "text", placeholder }) => {
  const { errors, touched } = useFormikContext();
  return (
    <div className="form-group">
      <label>{label}</label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="input-field"
      />
      {errors[name] && touched[name] && (
        <div className="error-message">{errors[name]}</div>
      )}
    </div>
  );
};

function InvestmentForm({ coinOptions }) {
  const { setFieldValue, errors, touched } = useFormikContext();

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      return {
        date: now.toISOString().split("T")[0],
        time: now.toTimeString().slice(0, 5),
      };
    };
    const { date, time } = getCurrentDateTime();
    setFieldValue("date", date);
    setFieldValue("time", time);
  }, [setFieldValue]);

  const fieldConfigs = [
    { label: "Quantity", name: "quantity", type: "number", placeholder: "0.5" },
    { label: "Buy Price (USDT)", name: "buyPrice", type: "number", placeholder: "45000" },
    { label: "Purchase Date", name: "date", type: "date" },
    { label: "Purchase Time", name: "time", type: "time" },
  ];

  return (
    <div className="p-[30px]">
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
                value={coinOptions.find((opt) => opt.value === field.value)}
                onChange={(opt) => form.setFieldValue("coin", opt.value)}
              />
            )}
          />
          {errors.coin && touched.coin && (
            <div className="error-message">{errors.coin}</div>
          )}
        </div>

        {fieldConfigs.map((field) => (
          <FormField key={field.name} {...field} />
        ))}
      </div>
    </div>
  );
}

export default InvestmentForm;
