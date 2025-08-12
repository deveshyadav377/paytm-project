import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const TransactionCard = ({ txn }) => {
  const [animate, setAnimate] = useState(false);
  const isCredit = txn.type === "credit" || txn.receiver === undefined;

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`
        bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-6 border border-gray-200
        transition-transform duration-300 ease-out
        ${animate ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        hover:shadow-2xl hover:scale-105
        max-w-md w-full
      `}
    >
      <div className="flex items-center justify-between mb-4">
        {/* User Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {isCredit
              ? `From: ${txn.sender?.username || "Unknown"}`
              : `To: ${txn.receiver?.username || "Unknown"}`}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Method: <span className="font-medium text-gray-700">{txn.method}</span>
          </p>
        </div>

        {/* Icon */}
        <div
          className={`p-4 rounded-full shadow-md ${
            isCredit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {isCredit ? (
            <ArrowDownLeft className="w-6 h-6" />
          ) : (
            <ArrowUpRight className="w-6 h-6" />
          )}
        </div>
      </div>

      {/* Amount */}
      <p
        className={`font-extrabold text-2xl ${
          isCredit ? "text-green-700" : "text-red-700"
        }`}
      >
        {isCredit ? "+ " : "- "}₹{txn.amount.toLocaleString()}
      </p>

      {/* Timestamp */}
      <p className="text-xs text-gray-400 mt-3">
        {new Date(txn.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionCard;
