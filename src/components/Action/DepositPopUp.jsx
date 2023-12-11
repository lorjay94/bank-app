import React, { useState } from 'react';
import './PopUp.css';

function DepositPopUp(props) {
  const [deposit, setDeposit] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeposit = () => {
    const depositAmount = parseFloat(deposit);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      setErrorMessage('INVALID AMOUNT');
      return;
    }

    setErrorMessage('');

    props.handleDeposit({
      description: description,
      amount: depositAmount,
    });

    setDescription('');
    setDeposit('');
    props.setTrigger(false);
  };

  const handleClose = () => {
    setDescription('');
    setDeposit('');
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
          value={deposit}
          className="amount"
          onChange={(e) => setDeposit(e.target.value)}
          type="number"
          id="deposit"
          placeholder="0.00"
        />
        <button className="btnAction" onClick={handleDeposit}>
          Deposit
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

export default DepositPopUp;
