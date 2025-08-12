import React, { useState } from "react";

const faqData = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click on the Sign Up button on the top right and fill in your details.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards, UPI, and net banking for transactions.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes, we use industry-standard security measures to protect your personal information.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact support anytime by emailing support@yourapp.com or using the chat feature in the app.",
  },
];

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqData.map(({ question, answer }, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer transition hover:shadow-md"
              onClick={() => toggleIndex(index)}
            >
              <div className="p-5 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">{question}</h2>
                <svg
                  className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`px-5 pb-5 text-gray-700 text-sm leading-relaxed overflow-hidden transition-max-height duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
