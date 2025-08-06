import React, { useState } from "react";
import axios from "axios";

export const ProfileCard = ({ title, data, onFieldUpdate }) => {
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState(data);
  const token = localStorage.getItem("token"); // assuming you store token like this

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

      const response = await axios.put(
        "http://localhost:3000/api/v1/user/profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally update parent state
      onFieldUpdate(editingField, formData[editingField]);

      setEditingField(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update field");
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
              {editingField === key ? (
                <input
                  className="border mt-1 p-1 rounded w-64"
                  value={formData[key]}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-md font-medium mt-1">{value || "Not set"}</div>
              )}
            </div>
            <div className="text-sm mt-1">
              {editingField === key ? (
                <div className="space-x-2">
                  <button onClick={handleSave} className="text-blue-600 hover:underline">Save</button>
                  <button onClick={handleCancel} className="text-gray-500 hover:underline">Cancel</button>
                </div>
              ) : (
                <button onClick={() => handleEdit(key)} className="text-blue-600 hover:underline">Edit</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
