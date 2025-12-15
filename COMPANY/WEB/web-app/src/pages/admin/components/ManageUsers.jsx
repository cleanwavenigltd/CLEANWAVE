import { useState, useEffect, useCallback } from "react";
import { formatCurrency } from "../Dashboard";
import { getAllUsers } from "../../../services/adminService";
import { register, updateProfile } from "../../../services/authservice";
import UserModal from "../layouts/modals";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users from the server
  const fetchUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      if (response && response.success) {
        console.log("THis is users::", response);
        setUsers(response.allUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search query
  const filteredUsers = users.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  // Handle user deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#8CA566]">CleanWave Users</h1>
        <div className="flex items-center gap-3">
          <input
            type="search"
            className="text-black px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8CA566] focus:border-transparent"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-[#8CA566] border border-gray-200 text-sm hover:bg-[#4C862D] transition-colors"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          {/* <button
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
            className="px-4 py-2 rounded-md bg-[#8CA566] text-white text-sm hover:bg-[#4C862D]"
          >
            + Add User
          </button> */}
        </div>
      </header>

      {/* User Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="text-black w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Phone</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-left px-6 py-3">Wallet</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.phone}</td>
                  <td className="px-6 py-3 text-gray-500">{user.email}</td>
                  <td className="px-6 py-3 font-medium">
                    {formatCurrency(user.balance || 0)}
                  </td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setShowModal(true);
                      }}
                      className="text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-sm px-3 py-1 rounded-md border border-gray-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                  {/* </td> */}
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No matching users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <UserModal
          user={editingUser}
          title="User Details"
          onClose={() => {
            setShowModal(false);
            fetchUsers();
          }}
          setUsers={setUsers}
          reg={updateProfile}
          verify={true}
  
        />
      )}
    </div>
  );
}

export default UsersPage;
