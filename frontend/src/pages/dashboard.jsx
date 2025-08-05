import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";

export const Dashboard = () => {
<<<<<<< HEAD
  const [balance, setBalance] = useState(null);
  
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
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Appbar */}
      <Appbar balance={balance} />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Welcome to your Dashboard
        </h1>

        {/* Wallet balance */}
        <div className="mb-6">
          <Balance value={balance} />
        </div>

        {/* All users */}
        <div>
          <Users />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-4 px-6 text-sm text-gray-500 text-center">
        <div>
          © {new Date().getFullYear()} PayMate. All rights reserved.
        </div>
        <div className="mt-1">
          Contact us: <a href="mailto:support@paymate.com" className="text-indigo-600">support@paymate.com</a>
        </div>
      </footer>
    </div>
  );
=======
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
                // Handle error
            }
        };
        
        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar/>
            <div className="m-8">
                <Balance value={balance} />
                <Users/>
            </div>
        </div>
    );
>>>>>>> 6e6eb9b309d147b6a0a3faf103b04f0d875b971a
};
