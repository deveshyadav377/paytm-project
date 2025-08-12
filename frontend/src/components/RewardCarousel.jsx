import React, { useEffect, useState } from "react";

const rewardsData = [
  {
    id: 1,
    title: "💸 Cashback Rewards",
    description: "Get up to 5% cashback on every transaction!",
    color: "from-green-300 to-green-400",
  },
  {
    id: 2,
    title: "🎯 Loyalty Points",
    description: "Earn points for every ₹100 spent and redeem exciting gifts.",
    color: "from-yellow-300 to-yellow-400",
  },
  {
    id: 3,
    title: "🤝 Referral Bonus",
    description: "Invite friends and earn ₹100 for each successful referral.",
    color: "from-blue-300 to-blue-400",
  },
  {
    id: 4,
    title: "🎁 Special Offers",
    description: "Exclusive deals and discounts for premium users.",
    color: "from-purple-300 to-purple-400",
  },
  {
    id: 5,
    title: "🚀 Early Access",
    description: "Get early access to new features and promotions.",
    color: "from-pink-300 to-pink-400",
  },
];

export const RewardsCarousel = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-indigo-700 tracking-wide">
        🎉 Your Rewards & Offers
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {rewardsData.map(({ id, title, description, color }, index) => (
          <div
            key={id}
            style={{
              animationDelay: `${index * 150}ms`,
              backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            }}
            className={`bg-gradient-to-br ${color} bg-opacity-30 rounded-3xl p-6 shadow-md w-64 cursor-pointer transform transition duration-500 ease-in-out
              ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              hover:scale-105 hover:shadow-lg`}
          >
            <h3 className="text-indigo-800 font-semibold text-xl mb-3">{title}</h3>
            <p className="text-indigo-700 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
