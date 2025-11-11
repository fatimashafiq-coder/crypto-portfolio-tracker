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

   const handleSubmit = (values, { resetForm }) => {
    if (!values.coin || !values.quantity || !values.buyPrice) {
      alert("Please fill all required fields!");
      return;
    }

      addInvestment(values);
    resetForm();
      navigate("/investments");
  };
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
