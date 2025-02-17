import React, { useState } from "react";
import { Button } from "../ui/button";
import { updateUserRole, deleteUser } from "@/lib/admin/actions/users";
import { AllUsersParams } from "@/types";

const roles = ["USER", "ADMIN", "SUPERADMIN"]; // Available roles

const UserCard = ({
  id,
  fullName,
  universityId,
  email,
  role,
  createdAt,
}: AllUsersParams) => {
  const [selectedRole, setSelectedRole] = useState(role);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Role Update
  const handleRoleChange = async (e: any) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    setLoading(true);

    const response = await updateUserRole(id, newRole);
    if (response.success) {
      console.log(`✅ Role updated to ${newRole}`);
    }
    setLoading(false);
  };

  // ✅ Handle User Deletion
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${fullName}?`)) return;

    setLoading(true);
    const response = await deleteUser(id);
    if (response.success) {
      console.log(`✅ Deleted user: ${fullName}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border-b-gray-600 shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt=""
          />
          <div className="ml-2">
            <p className="text-lg font-semibold text-gray-800">{fullName}</p>
            <p className="text-sm font-semibold text-gray-600">
              Library ID: {universityId}
            </p>
          </div>
        </div>
        <select
          className="border p-1 rounded"
          value={selectedRole}
          onChange={handleRoleChange}
          disabled={loading}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">{email}</p>
        <p className="text-sm text-gray-700">
          {selectedRole !== "SUPERADMIN" &&
            selectedRole !== "ADMIN" &&
            `Joined on ${createdAt}`}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          className="text-sm font-semibold text-red-500"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
