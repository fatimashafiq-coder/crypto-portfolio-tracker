import { Formik, Form } from "formik";
import InvestmentForm from "./InvestmentForm";
import ThresholdForm from "./ThresholdForm";
import { coinOptions } from "../../constants/coinOptions";
import { useNavigate } from "react-router-dom";
import { useInvestments } from "../../context/InvestmentContext";

function CreateInvestment() {
  const navigate = useNavigate();
  const { addInvestment } = useInvestments();
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
    const validate = (values) => {
    const errors = {};

    if (!values.coin) errors.coin = "Required";
    if (!values.quantity) errors.quantity = "Required";
    if (!values.buyPrice) errors.buyPrice = "Required";
    if (!values.date) errors.date = "Required";
    if (!values.time) errors.time = "Required";

    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
 addInvestment(values);
    resetForm();
    navigate("/investments");
    }

  return (
    <Formik initialValues={initialValues}
     validate={validate}
    onSubmit={handleSubmit}>
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
