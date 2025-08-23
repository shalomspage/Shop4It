"use client";

import React from "react";

const users = [
  { name: "Michael Scott", email: "michael@dundermifflin.com", role: "Admin" },
  { name: "Pam Beesly", email: "pam@dundermifflin.com", role: "User" },
  { name: "Jim Halpert", email: "jim@dundermifflin.com", role: "User" },
  { name: "Dwight Schrute", email: "dwight@dundermifflin.com", role: "Manager" },
  { name: "Stanley Hudson", email: "stanley@dundermifflin.com", role: "User" },
];

export default function UsersPage() {
  return (
    <div className="max-w-7xl min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>

      <section className="bg-white rounded-lg shadow p-6">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="text-right">
                  <button className="text-blue-600 hover:underline text-sm">View</button>
                  <button className="ml-3 text-red-600 hover:underline text-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
