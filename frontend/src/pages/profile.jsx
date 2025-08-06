import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProfileCard } from "./ProfileCard";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    };

    fetchUser();
  }, []);

  const handleFieldUpdate = (field, newValue) => {
    setUser((prev) => ({ ...prev, [field]: newValue }));
  };

  if (!user) return <div>Loading...</div>;

  const personalData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.username,
    dob: user.dob || "",
    country: user.country || "",
  };

  const preferenceData = {
    language: user.language || "",
    currency: user.currency || "",
    timezone: user.timezone || "",
    autoLogout: user.autoLogout || "",
  };

  return (
    <div className="space-y-6 p-4">
      <ProfileCard title="Personal Info" data={personalData} onFieldUpdate={handleFieldUpdate} />
      <ProfileCard title="Preferences" data={preferenceData} onFieldUpdate={handleFieldUpdate} />
    </div>
  );
};
