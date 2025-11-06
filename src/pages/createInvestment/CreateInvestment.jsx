import { Formik, Form } from "formik";
import InvestmentForm from "../../investmentForm/InvestmentForm";
import ThresholdForm from "../../ThresholdForm/ThresholdForm";

function CreateInvestment({ onAddInvestment }) {
  const initialValues = {
    coin: "",
    quantity: "",
    buyPrice: "",
    date: "",
    time: "",
    thresholdType: "noThreshold",
    profitThreshold: "",
    lossThreshold: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    onAddInvestment(values);
    resetForm();
  };

 const coinOptions = [
  { value: "BTC", label: "BTC - Bitcoin" },
  { value: "ETH", label: "ETH - Ethereum" },
  { value: "BNB", label: "BNB - Binance Coin" },
  { value: "XRP", label: "XRP - Ripple" },
  { value: "ADA", label: "ADA - Cardano" },
  { value: "DOGE", label: "DOGE - Dogecoin" },
  { value: "SOL", label: "SOL - Solana" },
  { value: "TRX", label: "TRX - Tron" },
  { value: "DOT", label: "DOT - Polkadot" },
  { value: "MATIC", label: "MATIC - Polygon" },
  { value: "LTC", label: "LTC - Litecoin" },
  { value: "SHIB", label: "SHIB - Shiba Inu" },
  { value: "AVAX", label: "AVAX - Avalanche" },
  { value: "UNI", label: "UNI - Uniswap" },
  { value: "LINK", label: "LINK - Chainlink" },
  { value: "ATOM", label: "ATOM - Cosmos" },
  { value: "XLM", label: "XLM - Stellar" },
  { value: "NEAR", label: "NEAR - Near Protocol" },
  { value: "ALGO", label: "ALGO - Algorand" },
  { value: "VET", label: "VET - VeChain" },
  { value: "FIL", label: "FIL - Filecoin" },
  { value: "HBAR", label: "HBAR - Hedera" },
  { value: "APT", label: "APT - Aptos" },
  { value: "ARB", label: "ARB - Arbitrum" },
  { value: "OP", label: "OP - Optimism" },
  { value: "ASTER", label: "ASTER - Aster" },
];

  return (
   <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <InvestmentForm coinOptions={coinOptions} />
          <ThresholdForm values={values} handleChange={handleChange} />
          <button type="submit" className="submit-btn">
            Add Investment
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateInvestment;
