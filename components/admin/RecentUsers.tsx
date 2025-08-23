"use client";

export default function RecentUsers() {
  const users = [
    { name: "Michael Scott", email: "michael@dundermifflin.com" },
    { name: "Pam Beesly", email: "pam@dundermifflin.com" },
    { name: "Jim Halpert", email: "jim@dundermifflin.com" },
  ];

  return (
    <section className="bg-white rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
      <ul className="space-y-3">
        {users.map((user, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between border-b pb-2 last:border-none"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">New</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
