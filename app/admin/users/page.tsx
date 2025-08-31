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
    <div className="max-w-7xl min-h-screen p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">All Users</h2>
      <section className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="hidden md:block">
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
        </div>
        <div className="md:hidden">
          {users.map((user, idx) => (
            <div key={idx} className="bg-gray-50 p-4 mb-4 rounded the-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{user.name}</span>
                <span className="text-gray-500">{user.role}</span>
              </div>
              <div className="text-sm mb-2">{user.email}</div>
              <div className="flex justify-end gap-2">
                <button className="text-blue-600 hover:underline text-sm">View</button>
                <button className="text-red-600 hover:underline text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}