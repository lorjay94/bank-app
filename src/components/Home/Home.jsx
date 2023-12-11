import React, { useState, useEffect } from "react";
import WithdrawalPopUp from "../Action/WithdrawalPopUp";
import DepositPopUp from "../Action/DepositPopUp";
import { useNavigate } from "react-router-dom";
import './Home.css';

export default function Home() {
    const [btnWithdrawalPopup, setBtnWithdrawalPopup] = useState(false);
    const [btnDepositPopup, setBtnDepositPopup] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
  
    useEffect(() => {
      const storedTransactions = JSON.parse(localStorage.getItem("transactions"));
      const storedBalance = JSON.parse(localStorage.getItem("balance"));
  
      if (storedTransactions && storedTransactions.length > 0) {
        setTransactions(storedTransactions);
      }
  
      if (storedBalance) {
        setBalance(storedBalance);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem("transactions", JSON.stringify(transactions));
      localStorage.setItem("balance", JSON.stringify(balance));
    }, [transactions, balance]);
  
    const handleDeposit = (newDeposit) => {
      const newBalance = balance + newDeposit.amount;
      setBalance(newBalance);
      setTransactions([...transactions, { ...newDeposit, type: 'deposit', balance: newBalance }]);
    };
  
    const handleWithdrawal = (newWithdrawal) => {
      const newBalance = balance - newWithdrawal.amount;
      setBalance(newBalance);
      setTransactions([...transactions, { ...newWithdrawal, type: 'withdrawal', balance: newBalance }]);
    };
  
    const handleClearAll = () => {
      setTransactions([]);
      setBalance(0);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
      navigate("/");
    }
  
    return (
      <div className="App">
        <div className="header-container">
          <h1>Balance: <span style={{ color: balance > 0 ? 'darkgreen' : 'darkred' }}>{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></h1>
        </div>
        <div className="buttons-container">
          <button className="btnMain" onClick={() => setBtnDepositPopup(true)}>Deposit</button>
          <DepositPopUp trigger={btnDepositPopup} setTrigger={setBtnDepositPopup} handleDeposit={handleDeposit} />
          <button className="btnMain" onClick={() => setBtnWithdrawalPopup(true)}>Withdraw</button>
          <WithdrawalPopUp
            trigger={btnWithdrawalPopup}
            setTrigger={setBtnWithdrawalPopup}
            handleWithdrawal={handleWithdrawal}
          />
        </div>
        <div>
          <table className="container">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.description}</td>
                  <td style={{ color: transaction.type === 'deposit' ? 'green' : 'red' }}>
                    {transaction.type === 'deposit' ? '+' : '-'}
                    {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                  <td style={{ color: transaction.balance > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                    {transaction.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button className="btnClearAll" onClick={handleClearAll}>Clear All</button>
          <button className="btnLogout" type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }