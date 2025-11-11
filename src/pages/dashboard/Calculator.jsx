import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import './Calculator.css';
import ResultSection from './ResultSection';

const Calculator = ({ onClose }) => {
  const [results, setResults] = useState(null);

  const handleSubmit = (values) => {
    const numberOfCoins = parseFloat(values.numberOfCoins);
    const buyPrice = parseFloat(values.buyPrice);
    const plPercentage = values.plPercentage ? parseFloat(values.plPercentage) : null;
    const targetPrice = values.targetPrice ? parseFloat(values.targetPrice) : null;

    const totalInvested = numberOfCoins * buyPrice;
    let calculatedTargetPrice, calculatedPercentage, pnlAmount, finalValue;

    if (plPercentage !== null) {
      calculatedPercentage = plPercentage;
      pnlAmount = totalInvested * (plPercentage / 100);
      finalValue = totalInvested + pnlAmount;
      calculatedTargetPrice = finalValue / numberOfCoins;
    } else if (targetPrice !== null) {
      calculatedTargetPrice = targetPrice;
      finalValue = numberOfCoins * targetPrice;
      pnlAmount = finalValue - totalInvested;
      calculatedPercentage = (pnlAmount / totalInvested) * 100;
    }

    setResults({
      totalInvested: totalInvested.toFixed(2),
      targetPrice: calculatedTargetPrice.toFixed(2),
      plPercentage: calculatedPercentage.toFixed(2),
      pnlAmount: pnlAmount.toFixed(2),
      finalValue: finalValue.toFixed(2),
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="calculator-header">
          <h1>P&L Calculator</h1>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <Formik
          initialValues={{
            numberOfCoins: "",
            buyPrice: "",
            plPercentage: "",
            targetPrice: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="two-column">
                <div className="form-group">
                  <label htmlFor="numberOfCoins">Number of Coins</label>
                  <Field as="input" type="number" name="numberOfCoins" placeholder="0.5" />
                </div>

                <div className="form-group">
                  <label htmlFor="buyPrice">Buy Price (USDT)</label>
                  <Field as="input" type="number" name="buyPrice" placeholder="45000" />
                </div>
              </div>

              <div className="calculate-section">
                <h3>Calculate By (Choose One)</h3>

                <div className="two-column">
                  <div className="form-group">
                    <label htmlFor="plPercentage">P&L Percentage (%)</label>
                    <Field
                      as="input"
                      type="number"
                      name="plPercentage"
                      placeholder="e.g. 20 or -10"
                      onChange={(e) => {
                        setFieldValue("plPercentage", e.target.value);
                        if (e.target.value) setFieldValue("targetPrice", "");
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="targetPrice">Target Price (USDT)</label>
                    <Field
                      as="input"
                      type="number"
                      name="targetPrice"
                      placeholder="e.g. 50000"
                      step="0.01"
                      onChange={(e) => {
                        setFieldValue("targetPrice", e.target.value);
                        if (e.target.value) setFieldValue("plPercentage", "");
                      }}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Calculate
              </button>
            </Form>
          )}
        </Formik>
        <ResultSection results={results} />
      </div>
    </div>
  );
};

export default Calculator;
