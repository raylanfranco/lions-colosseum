"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  banned: boolean;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    if (session?.user.role.toLowerCase() !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBanToggle = async (userId: string, banned: boolean) => {
    const endpoint = banned ? "unban" : "ban";
    const res = await fetch(`/api/admin/users/${userId}/${endpoint}`, {
      method: "PATCH",
    });

    if (res.ok) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, banned: !banned } : user
        )
      );
    }
  };

  const handleDelete = async (userId: string) => {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border border-white/10 text-sm">
        <thead className="bg-stone-800">
          <tr>
            <th className="py-2 px-4 border-b border-white/10 text-left">
              Name
            </th>
            <th className="py-2 px-4 border-b border-white/10 text-left">
              Email
            </th>
            <th className="py-2 px-4 border-b border-white/10 text-left">
              Phone
            </th>
            <th className="py-2 px-4 border-b border-white/10 text-left">
              Role
            </th>
            <th className="py-2 px-4 border-b border-white/10 text-left">
              Status
            </th>
            <th className="py-2 px-4 border-b border-white/10 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/10">
              <td className="py-2 px-4">{user.fullName}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.phoneNumber}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.banned ? "Banned" : "Active"}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  className="bg-stone-700 hover:bg-stone-600 px-2 py-1 text-xs rounded"
                  onClick={() => alert("Edit user functionality coming soon")}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-500 px-2 py-1 text-xs rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-600 hover:bg-yellow-500 px-2 py-1 text-xs rounded"
                  onClick={() => handleBanToggle(user.id, user.banned)}
                >
                  {user.banned ? "Unban" : "Ban"}
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-500 px-2 py-1 text-xs rounded"
                  onClick={() =>
                    alert("Password reset functionality coming soon")
                  }
                >
                  Reset PW
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
