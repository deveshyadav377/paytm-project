import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.includes("@") || !username.includes(".")) newErrors.username = "Enter a valid email.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://paytm-backend-p8ix.onrender.com/api/v1/user/signin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (e) {
      alert("Signin failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-300">
      {/* Minimal Header */}
      <div className="py-4 text-center text-3xl font-bold text-blue-700">
        PayMate
      </div>

      {/* Signin Card */}
      <div className="flex justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-md">
          <Heading label={"Welcome Back to PayMate"} />
          <SubHeading label={"Login to continue sending and receiving money securely."} />

          <div className="space-y-4 mt-6">
            <InputBox
              label="Email"
              placeholder="example@mail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            <InputBox
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>

          <div className="pt-6">
            <Button
              onClick={handleSignin}
              label="Sign In"
              loading={isLoading}
              loadingLabel="Signing In..."
            />
          </div>

          <div className="mt-4">
            <BottomWarning
              label="Don't have an account?"
              buttonText="Sign up"
              to="/signup"
            />
          </div>
        </div>
      </div>

      {/* Mini Footer */}
      <div className="text-center text-sm text-blue-600 py-4">
        © {new Date().getFullYear()} PayMate. All rights reserved.
      </div>
    </div>
  );
};
