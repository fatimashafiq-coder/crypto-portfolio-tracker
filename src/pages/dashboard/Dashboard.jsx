import { useState } from "react";
import CreateInvestment from "../createInvestment/CreateInvestment";
import PortfolioCards from "./PortfolioCards";
import Calculator from "./Calculator";
import UseLocalStorage from "../../Hooks/UseLocalStorage";
import ImportCV from "./ImportCv";
import ExportCV from "./ExportCv";
import "./Dashboard.css";

const Dashboard = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [portfolio, setPortfolio] = useState([]);

  const [investments] = UseLocalStorage("investments", []);

  return (
    <>
      <div className="portfolio-header">
        <h2>Your Portfolio</h2>
        <div className="actions">
          <button className="button" onClick={() => setShowCreate(true)}>
            Create
          </button>
          <button
            className="button calculator-button"
            onClick={() => setShowCalculator((prev) => !prev)}
          >
            Calculator
          </button>
          <ImportCV portfolio={portfolio} setPortfolio={setPortfolio} />
          <ExportCV portfolio={portfolio} />
        </div>
      </div>


      {showCalculator && (
        <div className="calculator-overlay">
          <Calculator />
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
