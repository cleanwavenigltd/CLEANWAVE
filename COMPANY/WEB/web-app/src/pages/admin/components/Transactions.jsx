import { sampleTransactions } from "./sampleUsers";
import { useMemo, useState } from "react";
import { MetricCard } from "../Dashboard";
import { formatCurrency } from "../Dashboard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Transactions() {
  const transactions = sampleTransactions();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const totals = useMemo(() => {
    const collected = transactions
      .filter((t) => t.type === "revenue")
      .reduce((s, t) => s + t.amount, 0);
    const spent = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return { collected, spent };
  }, [transactions]);

  const filtered = useMemo(() => {
    let result = transactions;
    if (filter !== "all") {
      result = result.filter((t) => t.type === filter);
    }
    return result.sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date) - new Date(a.date)
        : b.amount - a.amount
    );
  }, [transactions, filter, sortBy]);

  const pieData = [
    { name: "Collected", value: totals.collected },
    { name: "Spent", value: totals.spent },
  ];

  const COLORS = ["#4C862D", "#8CA566"];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Collected this month"
          value={formatCurrency(totals.collected)}
        />
        <MetricCard
          title="Spent this month"
          value={formatCurrency(totals.spent)}
        />
        <MetricCard
          title="Net"
          value={formatCurrency(totals.collected - totals.spent)}
          variant="subtle"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Transactions</h3>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:border-gray-400 transition"
              >
                <option value="all">All</option>
                <option value="revenue">Revenue</option>
                <option value="expense">Expenses</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:border-gray-400 transition"
              >
                <option value="date">Latest</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
          <ul className="divide-y">
            {filtered.slice(0, 8).map((t) => (
              <li
                key={t.id}
                className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded transition"
              >
                <div>
                  <div className="font-medium text-gray-900">{t.title}</div>
                  <div className="text-xs text-gray-500">{t.date}</div>
                </div>
                <div
                  className={`font-semibold ${
                    t.type === "revenue" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "revenue" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly breakdown</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={6}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Collected:</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(totals.collected)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Spent:</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(totals.spent)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transactions;
