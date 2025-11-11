import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchCoinPrice } from "../helpers/fetchCoinPrice";
import UseLocalStorage from "../Hooks/UseLocalStorage";

const InvestmentContext = createContext();

export const InvestmentProvider = ({ children }) => {
  const [investments, setInvestments] = UseLocalStorage("investments", []);

  useEffect(() => {
    if (!investments.length) return;

    const fetchAllPrices = async () => {
      try {
        const updated = await Promise.all(
          investments.map(async (inv) => {
            const price = await fetchCoinPrice(inv.coin);
            return { ...inv, currentPrice: price };
          })
        );
        setInvestments(updated);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchAllPrices();
  }, [investments.length]);

  const handleAddInvestment = (newInvestment) => {
    const investmentWithId = { id: uuidv4(), ...newInvestment };
    setInvestments((prev) => [...prev, investmentWithId]);
  };

  const handleDeleteInvestment = (id) => {
    const updatedInvestments = investments.filter((inv) => inv.id !== id);
    setInvestments(updatedInvestments);
  };

  const handleUpdateInvestment = (updatedInvestment) => {
    const updatedList = investments.map((inv) =>
      inv.id === updatedInvestment.id ? updatedInvestment : inv
    );
    setInvestments(updatedList);
  };

  return (
    <InvestmentContext.Provider
      value={{
        investments,
        addInvestment: handleAddInvestment,
        deleteInvestment: handleDeleteInvestment,
        updateInvestment: handleUpdateInvestment,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestments = () => useContext(InvestmentContext);
