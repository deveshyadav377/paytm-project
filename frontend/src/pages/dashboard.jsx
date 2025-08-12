import { useState, useEffect } from "react";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { RewardsCarousel } from "../components/RewardCarousel";
export const Dashboard = () => {
  
  const [balance, setBalance] = useState(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const decoded = jwtDecode(token);
        const firstName = decoded.firstName || "";
        const lastName = decoded.lastName || "";
  
        const fullName = `${firstName} ${lastName}`.trim();
        setUserName(fullName);
      } catch (e) {
        console.error("❌ Invalid token:", e.message);
      }
    }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "https://paytm-backend-p8ix.onrender.com/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setBalance(response.data.balance);
        console.log("Balance fetched successfully:", response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div>
       <h1 className="text-3xl font-extrabold mb-6 text-gray-900 drop-shadow-md">
  👋  Hey {userName}, <span className="text-indigo-600">Welcome back!</span>
      <br />
      <span className="text-lg font-medium text-gray-500">Here's your personalized dashboard</span>
  </h1>
     
      {/* Wallet balance */}
      <div className="mb-6">
        <Balance value={balance} />
      </div>

      {/* All users */}
      <div>
        <RewardsCarousel />
      </div>
    </div>
  );
};
