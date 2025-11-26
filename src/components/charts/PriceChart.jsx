"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-2 border-pink-500/30 dark:border-orange-500/30 rounded-xl p-4 shadow-2xl">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
          {payload[0].payload.date}
        </p>
        <p className="text-sm text-pink-600 dark:text-orange-500 font-semibold">
          Price: ${payload[0].value.toLocaleString()}
        </p>
        {payload[1] && (
          <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
            Volume: ${payload[1].value.toFixed(2)}B
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function PriceChart({ data, title = "Price History" }) {
  // Format data for the chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: item.price,
    volume: item.volume / 1000000000, // Convert to billions
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-primary/20 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        </div>
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f56040" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f56040" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: "12px", fontWeight: "600" }}
          />
          <YAxis
            yAxisId="left"
            stroke="#f56040"
            style={{ fontSize: "12px", fontWeight: "600" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a855f7"
            style={{ fontSize: "12px", fontWeight: "600" }}
            tickFormatter={(value) => `${value.toFixed(1)}B`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "14px", fontWeight: "600" }}
            iconType="circle"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke="#f56040"
            strokeWidth={3}
            fill="url(#colorPrice)"
            name="Price (USD)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="volume"
            stroke="#a855f7"
            strokeWidth={2}
            fill="url(#colorVolume)"
            name="Volume"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
