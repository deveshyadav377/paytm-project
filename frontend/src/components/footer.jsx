// components/Footer.jsx
import {
  Mail,
  Phone,
  MapPin,
  Send,
  HelpCircle,
  FileText,
  Shield,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-blue-50 to-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div className="space-y-5">
          <h2 className="text-3xl font-extrabold text-blue-700 tracking-wide">PayMate</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Your trusted partner for seamless and secure payments. Effortless peer-to-peer transfers and real-time transactions made simple.
          </p>
          <div className="flex space-x-4 mt-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-100 transition transform hover:-translate-y-1"
                aria-label="social link"
              >
                <Icon size={20} className="text-blue-600" />
              </a>
            ))}
          </div>
        </div>

        {/* Customer Feedback */}
        <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-5 text-gray-900">Customer Feedback</h3>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <textarea
              placeholder="Share your feedback..."
              className="border border-gray-300 rounded-lg p-3 resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              <Send size={18} /> Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
          <ul className="space-y-5 text-gray-700 text-sm">
            <li className="flex items-center gap-3 hover:text-blue-600 transition cursor-pointer">
              <Mail size={20} className="text-blue-600" /> support@paymate.com
            </li>
            <li className="flex items-center gap-3 hover:text-blue-600 transition cursor-pointer">
              <Phone size={20} className="text-blue-600" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-3 hover:text-blue-600 transition cursor-pointer">
              <MapPin size={20} className="text-blue-600" /> 123 Street, City, India
            </li>
          </ul>
        </div>

        {/* Quick Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Quick Info</h3>
          <ul className="space-y-5 text-sm">
            <li>
              <a
                href="/dashboard/faq"
                className="flex items-center gap-3 hover:text-blue-600 transition font-medium"
              >
                <HelpCircle size={20} className="text-blue-600" /> FAQ
              </a>
            </li>
            <li>
              <a
                href="/dashboard/terms"
                className="flex items-center gap-3 hover:text-blue-600 transition font-medium"
              >
                <FileText size={20} className="text-blue-600" /> Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/dashboard/privacy"
                className="flex items-center gap-3 hover:text-blue-600 transition font-medium"
              >
                <Shield size={20} className="text-blue-600" /> Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-50 border-t border-blue-200 text-center py-5 text-gray-600 text-xs select-none">
        © {new Date().getFullYear()} PayMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
