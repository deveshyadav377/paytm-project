import React, { useState } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Key } from "lucide-react";

export const ProfileCard = ({ title, data, onFieldUpdate }) => {
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState(data);
  const token = localStorage.getItem("token");

  const handleEdit = (field) => setEditingField(field);

  const handleCancel = () => {
    setFormData(data);
    setEditingField(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [editingField]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = { [editingField]: formData[editingField] };

      await axios.put(
        "https://paytm-backend-p8ix.onrender.com/api/v1/user/profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onFieldUpdate(editingField, formData[editingField]);
      setEditingField(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update field");
    }
  };

  // Map fields to icons
  const iconMap = {
    name: <User className="w-4 h-4 text-blue-500" />,
    email: <Mail className="w-4 h-4 text-blue-500" />,
    phone: <Phone className="w-4 h-4 text-blue-500" />,
    address: <MapPin className="w-4 h-4 text-blue-500" />,
    password: <Key className="w-4 h-4 text-blue-500" />,
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 space-y-3 border border-gray-100 hover:shadow-lg transition-all duration-300 w-full">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{title}</h2>

      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-2.5">
              {/* Field Icon */}
              {iconMap[key.toLowerCase()] || (
                <User className="w-4 h-4 text-gray-400" />
              )}
              <div>
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
                {editingField === key ? (
                  <input
                    className="mt-0.5 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-64 text-sm transition"
                    value={formData[key]}
                    onChange={handleChange}
                    autoFocus
                  />
                ) : (
                  <div className="text-gray-800 text-sm mt-0.5">
                    {value || <span className="italic text-gray-400">Not set</span>}
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs">
              {editingField === key ? (
                <div className="space-x-1.5">
                  <button
                    onClick={handleSave}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(key)}
                  className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
