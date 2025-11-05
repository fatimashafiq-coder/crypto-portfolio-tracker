import React from "react";
import { Formik, Form, Field } from "formik";
import "./InvestmentFields.css"

function InvestmentFields() {
  const initialValues = {
    coin: "",
    quantity: "",
    buyPrice: "",
    date: "",
    time: "",
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
  };

  return (
    <div className="investment-form-container">
          <h2 className="form-title">Add New Investment</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit} 
      >
        <Form className="investment-form">
          <div className="form-group">
            <label>Coin Symbol</label>
            <Field
              type="text"
              name="coin"
              placeholder="Type to search..."
              className="input-field"
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

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Investment
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default InvestmentFields;
