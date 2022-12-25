import React, { useContext, useState, useEffect } from "react";
import "./style.css";

import { BillContext } from "../../Context/BillContext";

const AddBill = () => {
  const [newBillTitle, setNewBillTitle] = useState("");
  const [newBillCost, setNewBillCost] = useState("");

  const billObjectValid = () => {
    // price must be truthy and number
    const costValid = newBillCost && Number.parseFloat(newBillCost);

    const titleValid =
      newBillTitle && newBillTitle.split("").find((char) => char !== " ");

    return costValid && titleValid;
  };

  // destructure from context
  const { updateBills } = useContext(BillContext);

  const clearForm = () => {
    setNewBillCost("");
    setNewBillTitle("");
  };

  return (
    <div className="add-bill-container">
      <input
        className="add-bill-form-control form-control"
        placeholder="Enter bill title"
        type="text"
        value={newBillTitle}
        onChange={(e) => setNewBillTitle(e.target.value)}
      ></input>
      <input
        className="add-bill-form-control form-control"
        placeholder="Enter bill monthly cost"
        type="number"
        value={newBillCost}
        onChange={(e) => setNewBillCost(e.target.value)}
      ></input>
      <button
        className="add-bill-form-control btn btn-primary"
        onClick={() => {
          if (billObjectValid()) {
            // update bills
            updateBills({
              title: newBillTitle,
              monthlyCost: newBillCost,
              enabled: true,
            });
            // clear form
            clearForm();
          }
        }}
      >
        Add Bill
      </button>
    </div>
  );
};

export default AddBill;
