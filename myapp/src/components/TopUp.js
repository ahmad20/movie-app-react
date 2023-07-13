import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const TopUpPage = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [cookies] = useCookies(["token"]);
  const [showNotification, setShowNotification] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTopUp = (event) => {
    event.preventDefault();
    const cookieValue = cookies.token;

    if (!amount || parseInt(amount) < 1000) {
      // Show an error message or perform appropriate actions
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setAmount("")
      }, 700);
      return;
    }
    // Perform login logic here
    const jsonPayload = JSON.stringify({ amount: parseInt(amount) });
    // Send API
    fetch(`${url}/user/top-up`, {
      method: "post",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    })
      .then((response) => response.json())
      .then((data) => {
        setAmount("");
        // Handle the response from the server
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
          navigate("/top-up");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        navigate("/top-up");
      });
  };

  return (
    <div className="max-w-md mx-auto">
      {showNotification && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          Top-up successful!
        </div>
      )}
      {showError && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          Amount must be provided and should be at least 1000.
        </div>
      )}
      <form onSubmit={handleTopUp}>
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
          Top-up
        </button>
      </form>
    </div>
  );
};

export default TopUpPage;
