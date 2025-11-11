import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import InvestmentForm from "../createInvestment/InvestmentForm";
import ThresholdForm from "../createInvestment/ThresholdForm";
import { coinOptions } from "../../constants/coinOptions";
import { useInvestments } from "../../context/InvestmentContext";

function EditInvestment() {
  const { id } = useParams();
  const navigate = useNavigate();
 const { investments, updateInvestment } = useInvestments();

  const investmentToEdit = investments.find((inv) => inv.id === id);

  if (!investmentToEdit) {
    return <div className="investment-not-found">Investment not found.</div>;
  }

  const handleSubmit = (values) => {
    const updatedInvestment = { ...investmentToEdit, ...values };
    updateInvestment(updatedInvestment);
    navigate("/investments");
  };

  return (
    <div className="edit-investment-page">
      <h2>Edit Investment</h2>

      <Formik initialValues={investmentToEdit} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <InvestmentForm coinOptions={coinOptions} />
            <ThresholdForm values={values} handleChange={handleChange} />

            <div className="edit-buttons">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditInvestment;
