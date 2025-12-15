import { useState, useEffect, useCallback } from "react";
import { formatCurrency } from "../Dashboard";
import { getWasteBanks, registerWaste } from "../../../services/wasteservice";
import UserModal from "../layouts/modals";
import { updateProfile } from "../../../services/authservice";

function WasteBank() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetchData is extracted and memoized so it can be called from other places (refresh button, modal close, etc.)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const resp = await getWasteBanks();
      if (resp && resp.success) {
        setUsers(resp.data.allWasteBanks.allWasteBanks);
      }
    } catch (err) {
      setError("Failed to load waste banks");
      console.error("Error fetching WasteBanks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this waste bank?")) {
      // If you have an API for delete, call it then refetch. For now we update local state and optionally refetch.
      setUsers((prev) => prev.filter((u) => u.id !== id));
      // Optionally: refetch from server to ensure sync
      // fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#8CA566]">Waste Banks</h1>
          <p className="text-sm text-gray-500 mt-1"></p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="search"
            className="text-black px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8CA566] focus:border-transparent"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* <button
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
            className="px-4 py-2 rounded-lg bg-[#8CA566] text-white font-medium text-sm hover:bg-[#4C862D] transition-colors"
          >
            + Add Waste Bank
          </button> */}

          {/* Refresh button */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-[#8CA566] border border-gray-200 text-sm hover:bg-[#4C862D] transition-colors"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 border-4 border-gray-200 border-t-[#8CA566] rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-2">Loading waste banks...</p>
          </div>
        ) : (
          <table className="text-black w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Phone
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Wallet
                </th>
                <th className="text-center px-6 py-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {u.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{u.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4 font-semibold ">
                    {formatCurrency(u.balance || 0)}
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingUser(u);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 text-sm font-medium text-black border border-gray-200  hover:bg-[#8CA566] hover:text-white transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
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
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No waste banks found.
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
          title="Waste Bank"
          // On modal close we hide and refresh list to ensure changes are reflected.
          onClose={() => {
            setShowModal(false);
            // small timeout optional to wait any async saves inside modal; remove if not needed
            fetchData();
          }}
          setUsers={setUsers}
          reg={updateProfile}
          verify={true}
        />
      )}
    </div>
  );
}

export default WasteBank;
