import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import TicketList from "./TicketList";
import TopUpPage from "./TopUp";
import WithdrawPage from "./Withdraw";

const UserDetail = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [cookies, , removeCookie] = useCookies(["token"]);
  const cookieValue = cookies.token;
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (cookieValue) {
      const expirationDate = new Date(cookieValue.expires);
      const currentDate = new Date();
      if (expirationDate < currentDate) {
        removeCookie("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [cookieValue, removeCookie, navigate]);

  useEffect(() => {
    fetch(`${url}/user/me`, {
      method: "get",
      headers: {
        Authorization: cookieValue,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.code === 200) {
          console.log(data);
          setUser(data.data);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }, [cookieValue, url]);

  const [activeTab, setActiveTab] = useState("my-ticket");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-md mx-auto">
      {cookieValue && (
        <>
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={user.avatar}
                  alt="User Avatar"
                />
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-500">{user.username}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Balance: {user.balance}</p>
                <p className="text-gray-700">Age: {user.age}</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <ul className="flex border-b">
              <li
                className={`mr-4 cursor-pointer ${
                  activeTab === "my-ticket" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => handleTabClick("my-ticket")}
              >
                My Ticket
              </li>
              <li
                className={`mr-4 cursor-pointer ${
                  activeTab === "topup" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => handleTabClick("topup")}
              >
                Top-up
              </li>
              <li
                className={`mr-4 cursor-pointer ${
                  activeTab === "withdraw" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => handleTabClick("withdraw")}
              >
                Withdraw
              </li>
            </ul>
          </div>
          {activeTab === "my-ticket" && (
            <div className="mb-8">
              <TicketList />
            </div>
          )}
          {activeTab === "topup" && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Top-up Page</h3>
              {/* Render the top-up form or component */}
              <TopUpPage />
            </div>
          )}
          {activeTab === "withdraw" && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Withdraw Page</h3>
              {/* Render the withdraw form or component */}
              <WithdrawPage balance={user.balance} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserDetail;
