import React, { useContext } from "react";
import "./style.css";
import { BillContext } from "../../Context/BillContext";

const BillList = () => {
  const { bills, editBill, setEditModeEnabled } = useContext(BillContext);
  console.log(bills);

  return (
    <div className="bill-list-container">
      <h6 className="edit-mode-btn" onClick={() => setEditModeEnabled(true)}>
        Edit
      </h6>

      {bills &&
        bills.length &&
        bills.map((bill, index) => {
          return (
            <div key={index} className="bill-list-row">
              <input
                type="checkbox"
                className="form-check-input"
                checked={bill.enabled}
                onChange={(e) => {
                  editBill({
                    title: bill.title,
                    monthlyCost: bill.monthlyCost,
                    enabled: !bill.enabled,
                  });
                }}
              ></input>
              <div className="bill-list-row-content">
                {bill.title} - {`Rs. ${bill.monthlyCost}`}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BillList;
