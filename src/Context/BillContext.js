import React, { useState, useEffect, createContext } from "react";

const BillContext = createContext();

const BillProvider = ({ children }) => {
  const [bills, setBills] = useState([]);

  const [selectedCostInterval, setSelectedCostInterval] = useState("Monthly");

  const [editModeEnabled, setEditModeEnabled] = useState(false);

  useEffect(() => {
    setBills(JSON.parse(localStorage.getItem("My-Bills")) || []);
  }, [setBills]);

  const updateBills = (bill) => {
    const updatedBills = [...bills, bill];

    localStorage.setItem("My-Bills", JSON.stringify(updatedBills));

    setBills(updatedBills);
  };

  const alphabeticalOrder = (bills) => {
    return bills.sort((a, b) =>
      a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 0
    );
  };

  const editBill = (billToUpdate) => {
    const billsFiltered = bills.filter(
      (bill) => bill.title !== billToUpdate.title
    );

    const updatedBills = alphabeticalOrder([...billsFiltered, billToUpdate]);
    setBills(updatedBills);
    localStorage.setItem("My-Bills", JSON.stringify(updatedBills));
  };

  const deleteBill = (billToDelete) => {
    const billsFiltered = bills.filter(
      (bill) => bill.title !== billToDelete.title
    );

    console.log(billsFiltered);

    localStorage.setItem("My-Bills", JSON.stringify(billsFiltered));
    setBills(billsFiltered);
  };

  return (
    <BillContext.Provider
      value={{
        bills,
        updateBills,
        editBill,
        selectedCostInterval,
        setSelectedCostInterval,
        editModeEnabled,
        setEditModeEnabled,
        deleteBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export { BillContext, BillProvider };
