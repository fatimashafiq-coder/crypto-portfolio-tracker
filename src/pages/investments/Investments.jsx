import InvestmentCard from "./InvestmentCard";
import './Investments.css';
import { useInvestments } from "../../context/InvestmentContext";

function Investments() {
  const { investments, deleteInvestment } = useInvestments();
  return (
    <>
      <div className="investments-container">
        <div className="investment-cards">
          {investments.length > 0 ? (
            investments.map((inv) => (
              <InvestmentCard
                key={inv.id}
                investment={inv}
                onDelete={() => deleteInvestment(inv.id)}
              />
            ))
          ) : (
            <p>No investments yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Investments;
