// src/pages/Rewards.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import RewardCard from "../components/RewardCard";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://paytm-backend-p8ix.onrender.com/api/v1/account/rewards",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRewards(res.data.rewards || []);
      } catch (err) {
        console.error("Failed to fetch rewards", err);
      } finally {
        setLoading(false); // hide loader after fetching
      }
    };

    fetchRewards();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">🎁 Your Rewards</h2>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : rewards.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward, idx) => (
            <RewardCard key={idx} reward={reward} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          No rewards available at the moment.
        </div>
      )}
    </div>
  );
};

export default Rewards;
