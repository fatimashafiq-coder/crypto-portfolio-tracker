import { useState } from 'react';
import CreateInvestment from '../createInvestment/CreateInvestment';
import './Dashboard.css';
const Dashboard = () => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <>
      <div className="container">
        <h2>Your Portfolio</h2>
        <button
          className="button"
          onClick={() => setShowCreate(true)}
        >
          Create
        </button>
      </div>
      {showCreate && (
        <div className="create-container">
          <CreateInvestment />
        </div>
      )}
    </>
  )
}

export default Dashboard
