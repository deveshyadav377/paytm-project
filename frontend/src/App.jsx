import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { SendMoney } from "./pages/send";
import LandingPage from "./pages/landing";
import DashboardLayout from "./pages/DashboardLayout";
import { Balance } from "./components/Balance";
import { ProfilePage } from "./pages/profile";
import { Users } from "./components/User";
import Rewards from "./pages/Rewards";
import Transactions from "./pages/Transactions";
import { Dashboard } from "./pages/dashboard";
import { TermsAndConditions } from "./pages/Termsandcondition";
import {Faq} from "./pages/faq";
import {PrivacyPolicy} from "./pages/privacypolicy";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/send" element={<SendMoney />} />

        {/* Dashboard routes with nested layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="send" element={<SendMoney />} />
          <Route path = "terms" element ={<TermsAndConditions />} />
          <Route path ="faq" element={<Faq/>} />
          <Route path ="privacy" element={<PrivacyPolicy />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="transactions" element={<Transactions />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
