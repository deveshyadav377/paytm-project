import React from "react";

export const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <div className="w-1.5 h-12 bg-indigo-600 rounded-r-full mr-4"></div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Terms & Conditions
          </h1>
        </div>

        <Section
          number={1}
          title="Introduction"
          content="Welcome to PayMate. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. Please read them carefully."
        />
        <Section
          number={2}
          title="Use of Service"
          content="You agree to use the services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the services."
        />
        <Section
          number={3}
          title="User Accounts"
          content="You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account."
        />
        <Section
          number={4}
          title="Intellectual Property"
          content="All content, features, and functionality are the exclusive property of PayMate and are protected by copyright and other laws."
        />
        <Section
          number={5}
          title="Limitation of Liability"
          content="We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services."
        />
        <Section
          number={6}
          title="Changes to Terms"
          content="We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the services after changes signifies your acceptance of the new terms."
        />
        <Section
          number={7}
          title="Governing Law"
          content="These Terms are governed by and construed in accordance with the laws of Government of India , and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
        />
        <Section
          number={8}
          title="Contact Us"
          content={
            <>
              If you have any questions about these Terms and Conditions,
              please contact us at{" "}
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

const Section = ({ number, title, content }) => {
  return (
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
};
