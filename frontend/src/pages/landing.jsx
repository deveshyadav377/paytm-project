import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
          PayMate
        </h1>
        <div className="space-x-4">
          <button
            className="px-5 py-2 text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-100"
            onClick={() => navigate("/signin")}
          >
            Log In
          </button>
          <button
            className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 leading-tight">
            Send & Receive <span className="text-blue-600">Money</span><br />
            Instantly with PayMate
          </h2>
          <p className="text-lg text-blue-700 mb-8">
            Experience seamless and secure money transfers with your dummy wallet. Built for simplicity and speed.
          </p>
          <button
            className="px-6 py-3 bg-blue-700 text-white text-lg rounded-xl hover:bg-blue-800 transition"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>

        <img
          src="https://static.vecteezy.com/system/resources/previews/055/075/739/non_2x/illustration-of-digital-wallet-concept-free-vector.jpg"
          alt="Digital Wallet Illustration"
          className="w-full md:w-1/2 mb-12 md:mb-0"
        />
      </main>

      {/* About Section */}
      <section className="bg-white py-16 px-6 md:px-20 text-center md:text-left">
        <h3 className="text-3xl font-bold text-blue-800 mb-6">About Us</h3>
        <p className="text-blue-700 max-w-4xl mx-auto">
          PayMate is a modern payment platform designed to help users send and receive money easily with a dummy wallet system. Whether you’re settling a bill with a friend or testing wallet functionalities, PayMate ensures a fast, secure, and user-friendly experience. We’re also integrating real-time payment gateways for live transactions soon!
        </p>
      </section>

      {/* Real-Time Payment Section */}
      <section className="py-16 px-6 md:px-20 bg-blue-100 text-center">
        <h3 className="text-3xl font-bold text-blue-800 mb-6">Coming Soon: Real-Time Payments</h3>
        <p className="text-blue-700 max-w-3xl mx-auto">
          Soon, you’ll be able to link your real bank account and perform live transactions using trusted payment gateways like Razorpay. Secure transfers, real wallets, and complete payment history – all within PayMate.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-bold text-blue-800 mb-10">What Our Users Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Rohit Sharma",
              feedback: "PayMate made testing wallet apps so much easier. Love the UI and simplicity!"
            },
            {
              name: "Ananya Verma",
              feedback: "Smooth transfers, real-time feel, and great design. Can't wait for real payments!"
            },
            {
              name: "Siddharth Mehra",
              feedback: "Best app for testing payment workflows. Really helpful for developers."
            }
          ].map(({ name, feedback }, idx) => (
            <div
              key={idx}
              className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200"
            >
              <p className="text-blue-800 italic mb-4">&quot;{feedback}&quot;</p>
              <p className="text-sm font-semibold text-blue-600">— {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-6 md:px-20 shadow-inner text-blue-900">
        <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold mb-2">PayMate</h4>
            <p>Secure. Fast. Simple.</p>
            <p>Built with ❤️ using the MERN stack.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p>Email: support@paymate.com</p>
            <p>Phone: +91-9876543210</p>
            <p>Customer Care: 24/7 Available</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <p className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/signin")}>Login</p>
            <p className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/signup")}>Register</p>
            <p className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/")}>Home</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-blue-700">
          © {new Date().getFullYear()} PayMate. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
