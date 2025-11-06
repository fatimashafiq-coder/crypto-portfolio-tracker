import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreateInvestment from "../createInvestment/CreateInvestment";
import InvestmentCard from "../../components/InvestmentCard";

function Investments() {
  const [investments, setInvestments] = useState([]);

  const handleAddInvestment = (newInvestment) => {
    const investmentWithId = { id: uuidv4(), ...newInvestment };
    setInvestments([...investments, investmentWithId]);
    console.log(investmentWithId);
  };

  return (
    <div className="investments-container">
      <CreateInvestment onAddInvestment={handleAddInvestment} />
      <div className="investment-cards">
        {investments.map((inv) => (
          <InvestmentCard key={inv.id} investment={inv} /> 
        ))}
      </div>
    </div>
  );
}
export default Investments;
