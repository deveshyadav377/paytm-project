import { useEffect, useState } from "react";
import { Gift } from "lucide-react";

const RewardCard = ({ reward }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`
        bg-gradient-to-br from-white/90 to-blue-50/70 backdrop-blur-md shadow-md rounded-2xl p-6 border border-gray-200
        transition-transform duration-300 ease-out
        ${animate ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        hover:shadow-2xl hover:scale-105
      `}
    >
      {/* Header with Icon */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-200 p-3 rounded-full shadow-inner">
          <Gift className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {reward.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-base mb-5">
        {reward.description}
      </p>

      {/* Amount and Timestamp Container */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p className="text-green-700 font-bold text-lg">
          + ₹{reward.amount.toLocaleString()}
        </p>
        <p>
          {new Date(reward.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RewardCard;
