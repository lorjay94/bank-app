import React, { useState } from 'react';
import './PopUp.css';

function WithdrawalPopUp(props) {
  const [withdrawal, setWithdrawal] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleWithdrawal = () => {
    const withdrawalAmount = parseFloat(withdrawal);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setErrorMessage('INVALID AMOUNT');
      return;
    }

    setErrorMessage('');

    props.handleWithdrawal({
      description: description,
      amount: withdrawalAmount,
    });

    setDescription('');
    setWithdrawal('');

    props.setTrigger(false);
  };

  const handleClose = () => {
    setDescription('');
    setWithdrawal('');
    setErrorMessage('');
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <input
          value={description}
          className="description"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          id="description"
          placeholder="description"
        />
        <br />
        <input
          value={withdrawal}
          className="amount"
          onChange={(e) => setWithdrawal(e.target.value)}
          type="number"
          id="withdrawal"
          placeholder="0.00"
        />
        <button className="btnAction" onClick={handleWithdrawal}>
          Withdraw
        </button>
        <button className="btnClose" onClick={handleClose}>
          X
        </button>
        {props.children}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  ) : '';
}

export default WithdrawalPopUp;
