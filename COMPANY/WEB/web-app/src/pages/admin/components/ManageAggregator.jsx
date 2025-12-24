import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../Dashboard";
import { updateProfile } from "../../../services/authservice";
import { getAggregators, register } from "../../../services/aggregatorservice";
import UserModal from "../layouts/modals";
function Aggregator() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(false);

  // Fetch Aggregators
  const fetchData = useCallback(async () => {
    try {
      const response = await getAggregators();
      if (response.success) {
        console.log("Fetched Aggregators:", response.aggregator.aggregators);
        setUsers(response.aggregator.aggregators || []);
      }
    } catch (error) {
      setError("Failed to load aggregator");
      console.error("Error fetching aggregators:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter by search
  const filteredUsers = users.filter((user) => {
    const searchQuery = query.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this aggregator?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#8CA566]">
          CleanWave Aggregators
        </h1>
        <div className="flex items-center gap-3">
          <input
            type="search"
            className="text-black px-3 py-2 border rounded-md bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
              setUrl(true);
            }}
            className="px-4 py-2 rounded-md bg-[#8CA566] text-white text-sm hover:bg-[#4C862D]"
          >
            + Add Aggregator
          </button>
        </div>
      </header>

      {/* TABLE */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 border-4 border-gray-200 border-t-[#8CA566] rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-2">Loading ...</p>
          </div>
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
                        setUrl(false);
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
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No matching aggregators found.
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
          title="Aggregator"
          onClose={() => {
            setShowModal(false);
            setEditingUser(null);
            fetchData();
          }}
          verify={true}
          reg={editingUser ? updateProfile : register}
        />
      )}
    </div>
  );
}

Aggregator.propTypes = {
  users: PropTypes.array,
  query: PropTypes.string,
  showModal: PropTypes.bool,
  editingUser: PropTypes.object,
  loading: PropTypes.bool,
};

export default Aggregator;
