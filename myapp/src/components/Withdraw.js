import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const WithdrawPage = ({balance}) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [cookies] = useCookies(["token"]);
  const [showNotification, setShowNotification] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleWithdrawal = (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_BACKEND_URL;
    if (amount > balance) {
      // Show an error message or perform appropriate actions
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setAmount("")
      }, 700);
      return;
    }
    // Perform withdrawal logic here
    const cookieValue = cookies.token;
    const jsonPayload = JSON.stringify({ amount: parseInt(amount) });
    // Send API
    fetch(`${url}/user/withdraw`, {
      method: "post",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        setAmount("");
        if (data.code === 200) {
          // Reset form field
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            setAmount("");
            window.location.reload();
          }, 700);
          navigate("/me");
        } else {

          navigate('/withdraw');
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        navigate('/withdraw');
      });
  };

  return (
    <div className="max-w-md mx-auto">
      {showNotification && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          Withdrawal successful!
        </div>
      )}
      {showError && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          Amount must below of your balance
        </div>
      )}
      <form onSubmit={handleWithdrawal}>
        <div className="mb-4">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default WithdrawPage;
