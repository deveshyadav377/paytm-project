<<<<<<< HEAD
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!username.includes("@") || !username.includes(".")) newErrors.username = "Enter a valid email.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://paytm-backend-p8ix.onrender.com/api/v1/user/signup",
        {
          username,
          firstName,
          lastName,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (e) {
      alert("Signup failed. Please try again.");
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

      {/* Signup Card */}
      <div className="flex justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-md">
          <Heading label={"Create your PayMate account"} />
          <SubHeading label={"Join us for seamless and secure money transfers."} />

          <div className="space-y-4 mt-6">
            <InputBox
              label="First Name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
            />
            <InputBox
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
            />
            <InputBox
              label="Email"
              placeholder="example@mail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            <InputBox
              label="Password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              error={errors.password}
            />
          </div>

          <div className="pt-6">
            <Button
              onClick={handleSignup}
              label="Sign Up"
              loading={isLoading}
              loadingLabel="Creating Account..."
            />
          </div>

          <div className="mt-4">
            <BottomWarning
              label="Already have an account?"
              buttonText="Sign in"
              to="/signin"
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
=======
import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/Subheading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}
>>>>>>> 6e6eb9b309d147b6a0a3faf103b04f0d875b971a
