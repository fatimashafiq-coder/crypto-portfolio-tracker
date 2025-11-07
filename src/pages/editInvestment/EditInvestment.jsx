import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import InvestmentForm from "../../investmentForm/InvestmentForm";
import ThresholdForm from "../../ThresholdForm/ThresholdForm";
import { coinOptions } from "../../constants/coinOptions";

function EditInvestment({ investments, onUpdateInvestment }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const investmentToEdit = investments.find((inv) => inv.id === id);

  if (!investmentToEdit) {
    return <div style={{ padding: "20px" }}>Investment not found.</div>;
  }

  const handleSubmit = (values) => {
    const updatedInvestment = { ...investmentToEdit, ...values };
    onUpdateInvestment(updatedInvestment);
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
              <button type="submit" className="btn-save">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-cancel"
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
