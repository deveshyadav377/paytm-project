// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionCard from "../components/TransactionCard";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://paytm-backend-p8ix.onrender.com/api/v1/account/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📜 Transaction History</h2>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : transactions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transactions.map((txn, idx) => (
            <TransactionCard key={idx} txn={txn} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          No transactions found.
        </div>
      )}
    </div>
  );
};

export default Transactions;
