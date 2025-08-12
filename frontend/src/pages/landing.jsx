import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin,
  Users, Shield, Clock, CreditCard, ArrowRight, HelpCircle
} from "lucide-react";
import { useState } from "react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left"
      >
        <span className="text-blue-800 font-semibold">{question}</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <HelpCircle className="text-blue-600" />
        </motion.span>
      </button>
      {open && (
        <motion.div
          className="px-5 pb-5 text-blue-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      {/* Navbar */}
      <motion.header
        className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-3xl font-extrabold text-blue-700 tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          PayMate
        </h1>
        <div className="space-x-4">
          <motion.button
            className="px-5 py-2 text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signin")}
          >
            Log In
          </motion.button>
          <motion.button
            className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 shadow-md transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.main
        className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 md:py-24 max-w-7xl mx-auto gap-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="max-w-xl text-center md:text-left"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
            Send & Receive <span className="text-blue-600">Money</span><br />
            Instantly with PayMate
          </h2>
          <p className="text-lg text-blue-700 mb-8">
            Experience seamless and secure money transfers with your dummy wallet. Built for simplicity and speed.
          </p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-lg rounded-xl hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
          >
            🚀 Get Started
          </motion.button>
        </motion.div>

        <motion.img
          src="https://static.vecteezy.com/system/resources/previews/055/075/739/non_2x/illustration-of-digital-wallet-concept-free-vector.jpg"
          alt="Digital Wallet Illustration"
          className="w-full md:w-1/2 mb-12 md:mb-0 drop-shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
      </motion.main>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Users size={32} />, value: "50K+", label: "Active Users" },
            { icon: <CreditCard size={32} />, value: "1M+", label: "Transactions" },
            { icon: <Shield size={32} />, value: "99.99%", label: "Security Uptime" },
            { icon: <Clock size={32} />, value: "< 1s", label: "Transfer Speed" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-100"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-blue-600 mb-3 flex justify-center">{stat.icon}</div>
              <h4 className="text-2xl font-bold text-blue-900">{stat.value}</h4>
              <p className="text-blue-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-16 bg-gradient-to-r from-blue-50 to-blue-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h3
            className="text-3xl font-bold text-blue-800 mb-12"
            variants={fadeUp}
          >
            How It Works
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "1. Sign Up", desc: "Create your free PayMate account in seconds.", icon: <Users /> },
              { title: "2. Add Wallet", desc: "Securely store your dummy balance for testing.", icon: <CreditCard /> },
              { title: "3. Start Transferring", desc: "Send and receive funds instantly.", icon: <ArrowRight /> }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition"
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-blue-600 mb-3 flex justify-center">{step.icon}</div>
                <h4 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h4>
                <p className="text-blue-700">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h3
            className="text-3xl font-bold text-blue-800 mb-12"
            variants={fadeUp}
          >
            Why Choose PayMate?
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "⚡ Instant Transfers", desc: "Send and receive money instantly with zero delays." },
              { title: "🔒 Secure & Reliable", desc: "Your transactions are encrypted and safe." },
              { title: "💳 Real-Time Payments (Coming Soon)", desc: "Link your bank account for live payments." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition"
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-xl font-semibold text-blue-800 mb-3">{feature.title}</h4>
                <p className="text-blue-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-blue-50 to-blue-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.h3
            className="text-3xl font-bold text-blue-800 mb-8 text-center"
            variants={fadeUp}
          >
            Frequently Asked Questions
          </motion.h3>
          <div className="space-y-4">
            {[
              { q: "Is PayMate a real payment app?", a: "No, PayMate is a demo app for testing and UI purposes only. It does not process real transactions." },
              { q: "Can I connect my bank account?", a: "Currently, PayMate only supports dummy wallets. Bank linking will be added soon for live mode." },
              { q: "Is my data secure?", a: "Yes, even though this is a dummy wallet, all stored data is encrypted for your safety." },
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="bg-gradient-to-r from-blue-50 to-blue-100 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h3
            className="text-3xl font-bold text-blue-800 mb-12"
            variants={fadeUp}
          >
            What Our Users Say
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rohit Sharma", feedback: "PayMate made testing wallet apps so much easier. Love the UI and simplicity!", rating: 5 },
              { name: "Ananya Verma", feedback: "Smooth transfers, real-time feel, and great design. Can't wait for real payments!", rating: 5 },
              { name: "Siddharth Mehra", feedback: "Best app for testing payment workflows. Really helpful for developers.", rating: 4 }
            ].map(({ name, feedback, rating }, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg border border-blue-100"
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-blue-800 italic mb-4">&quot;{feedback}&quot;</p>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="text-yellow-400 w-5 h-5" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-blue-600">— {name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-blue-900 text-white py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold mb-3">PayMate</h4>
            <p>Secure. Fast. Simple.</p>
            <p>Built with ❤️ using the MERN stack.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <p className="flex items-center justify-center md:justify-start gap-2"><Mail size={16}/> support@paymate.com</p>
            <p className="flex items-center justify-center md:justify-start gap-2"><Phone size={16}/> +91-9876543210</p>
            <p className="flex items-center justify-center md:justify-start gap-2"><MapPin size={16}/> India</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <Facebook className="hover:text-blue-400 cursor-pointer" />
              <Twitter className="hover:text-blue-400 cursor-pointer" />
              <Instagram className="hover:text-pink-400 cursor-pointer" />
              <Linkedin className="hover:text-blue-300 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-blue-200">
          © {new Date().getFullYear()} PayMate. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
