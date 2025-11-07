import React from "react";
import InvestmentCard from "../../components/InvestmentCard";
import './Investments.css';
import Dashboard from "../dashboard/Dashboard";
function Investments({ investments, onDelete }) {
  return (
    <>
    <div className="investments-container">
      <div className="investment-cards">
        {investments.length > 0 ? (
          investments.map((inv) => (
            <InvestmentCard
              key={inv.id}
              investment={inv}
              onDelete={() => onDelete(inv.id)}
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