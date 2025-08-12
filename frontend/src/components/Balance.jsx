import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

export const Balance = ({ value }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex items-center justify-between bg-white shadow-lg rounded-xl p-6 max-w-sm w-full">
      <div className="flex items-center space-x-3">
        <Wallet className="w-8 h-8 text-green-500" />
        <div className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
          Your Balance
        </div>
      </div>
      <div className={`text-green-600 font-extrabold text-2xl transform transition-all duration-500 ease-out ${animate ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        Rs {value != null ? value.toLocaleString() : "0"}
        </div>

    </div>
  );
};
