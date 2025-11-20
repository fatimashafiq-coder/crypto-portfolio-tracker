import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateInvestment from "../createInvestment/CreateInvestment";
import PortfolioCards from "./PortfolioCards";
import Calculator from "./Calculator";
import ImportCV from "./ImportCv";
import ExportCV from "./ExportCv";
import "./Dashboard.css";
import { useInvestments } from "../../context/InvestmentContext"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [showCalculator, setShowCalculator] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { investments } = useInvestments();
  return (
    <>
      <div className="portfolio-header">
        <h2>Your Portfolio</h2>
        <div className="actions">
          <button className="button" onClick={() => navigate("/investment/create")}>
            Create
          </button>
          <button
            className="button calculator-button"
            onClick={() => setShowCalculator((prev) => !prev)}
          >
            Calculator
          </button>
          <ImportCV portfolio={investments} />
          <ExportCV portfolio={investments} />
        </div>
      </div>

      {showCalculator && (
        <div className="calculator-overlay">
          <Calculator onClose={() => setShowCalculator(false)} />
        </div>
      )}

      {showCreate && (
        <div className="create-container">
          <CreateInvestment />
        </div>
      )}

      <PortfolioCards investments={investments} />
    </>
  );
};

export default Dashboard;
