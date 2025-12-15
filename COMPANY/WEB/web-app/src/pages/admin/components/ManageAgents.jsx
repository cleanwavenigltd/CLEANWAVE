import { useState, useEffect, useCallback } from "react";
import { formatCurrency } from "../Dashboard";
import {
  getAgents,
  registerAgent,
  deleteAgent,
} from "../../../services/agentservice";
import UserModal from "../layouts/modals";
import { updateProfile } from "../../../services/authservice";

const LOADING_STATE = "loading";
const ERROR_STATE = "error";
const SUCCESS_STATE = "success";

function Agents() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAgents();
      if (response && response.success) {
        console.log("AdminagentPage::", response);
        setUsers(response?.allAgents?.agents || []);
      }
    } catch (err) {
      console.error("Failed to load agents:", err);
      setError("Failed to load agents. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.includes(q)
    );
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    try {
      await deleteAgent(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete agent.");
    }
  };

  // const handleModalClose = () => {
  //   setShowModal(false);
  //   setEditingUser(null);
  // };

  // const handleAddAgent = () => {
  //   setEditingUser(null);
  //   setShowModal(true);
  // };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#8CA566]">CleanWave Agents</h1>
        <div className="flex items-center gap-3">
          <input
            type="search"
            className="text-black px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8CA566] focus:border-transparent"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Refresh button */}
          <button
            onClick={loadAgents}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-[#8CA566] border border-gray-200 text-sm hover:bg-[#4C862D] transition-colors"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          {/* <button
            onClick={handleAddAgent}
            className="px-4 py-2 rounded-md bg-[#8CA566] text-white text-sm font-medium hover:bg-[#4C862D] transition"
          >
            + Add Agent
          </button> */}
        </div>
      </header>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading agents...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : (
          <table className="text-black w-full text-sm">
            <thead className="text-black bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">
                  Phone
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">
                  Wallet
                </th>
                <th className="text-center px-6 py-3 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{u.name || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{u.phone || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{u.email || "—"}</td>
                  <td className="px-6 py-4 font-medium">
                    {formatCurrency(u.balance || 0)}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingUser(u);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-3 py-1 text-sm rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <UserModal
          user={editingUser}
          title="Agent"
          onClose={() => {
            setShowModal(false);
            loadAgents();
          }}
          setUsers={setUsers}
          reg={updateProfile}
          verify={true}
        />
      )}
    </div>
  );
}

export default Agents;
