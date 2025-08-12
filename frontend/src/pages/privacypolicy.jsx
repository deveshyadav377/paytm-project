import React from "react";

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <div className="w-1.5 h-12 bg-indigo-600 rounded-r-full mr-4"></div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <Section
          number={1}
          title="Introduction"
          content="At PayMate, your privacy is our priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services."
        />

        <Section
          number={2}
          title="Information We Collect"
          content="We may collect personal information such as your name, email address, contact details, and payment information. We also collect non-personal data like usage statistics and cookies to enhance your experience."
        />

        <Section
          number={3}
          title="How We Use Your Information"
          content="Your information is used to provide, maintain, and improve our services, communicate with you, process transactions, and comply with legal obligations."
        />

        <Section
          number={4}
          title="Sharing Your Information"
          content="We do not sell your personal data. We may share information with trusted third parties who assist us in operating our services, comply with legal requests, or protect our rights."
        />

        <Section
          number={5}
          title="Cookies and Tracking Technologies"
          content="We use cookies and similar tracking technologies to understand usage patterns, improve functionality, and personalize your experience."
        />

        <Section
          number={6}
          title="Your Rights"
          content="You have the right to access, correct, or delete your personal information. You can also opt out of certain data processing activities by contacting us."
        />

        <Section
          number={7}
          title="Data Security"
          content="We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, or destruction."
        />

        <Section
          number={8}
          title="Changes to This Policy"
          content="We may update this Privacy Policy occasionally. We will notify you of any significant changes by posting the new policy on this page."
        />

        <Section
          number={9}
          title="Contact Us"
          content={
            <>
              For any questions or concerns regarding this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:support@yourapp.com"
                className="text-indigo-600 underline hover:text-indigo-800 transition"
              >
                support@paymate.com
              </a>
              .
            </>
          }
        />
      </div>
    </div>
  );
};

const Section = ({ number, title, content }) => (
  <section className="mb-8">
    <div className="flex items-center mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold mr-3 select-none text-sm">
        {number}
      </div>
      <h2 className="text-xl font-medium text-gray-900">{title}</h2>
    </div>
    <p className="text-gray-700 leading-relaxed text-sm">{content}</p>
  </section>
);
