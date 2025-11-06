import React from "react";
import { v4 as uuidv4 } from "uuid";
import CreateInvestment from "../createInvestment/CreateInvestment";
import InvestmentCard from "../../components/InvestmentCard";
import UseLocalStorage from "../../Hooks/UseLocalStorage"; 
import './Investments.css';

function Investments() {
  const [investments, setInvestments] = UseLocalStorage("investments", []);

  const handleAddInvestment = (newInvestment) => {
    const investmentWithId = { id: uuidv4(), ...newInvestment };
    setInvestments((prev) => [...prev, investmentWithId]);
  };

  // 🔥 Delete handler
  const handleDeleteInvestment = (id) => {
    const updatedInvestments = investments.filter((inv) => inv.id !== id);
    setInvestments(updatedInvestments);
  };

  return (
    <div className="investments-container">
      <CreateInvestment onAddInvestment={handleAddInvestment} />

      <div className="investment-cards">
        {investments.length > 0 ? (
          investments.map((inv) => (
            <InvestmentCard
              key={inv.id}
              investment={inv}
              onDelete={() => handleDeleteInvestment(inv.id)}
            />
          ))
        ) : (
          <p>No investments yet.</p>
        )}
      </div>
    </div>
  );
}

export default Investments;
