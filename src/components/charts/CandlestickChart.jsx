"use client";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

// Custom tooltip component
const CandlestickTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-2 border-pink-500/30 dark:border-orange-500/30 rounded-xl p-4 shadow-2xl">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
          {data.date}
        </p>
        <div className="space-y-1 text-xs">
          <p className="text-green-600 dark:text-green-400 font-semibold">
            Open: ${data.open.toLocaleString()}
          </p>
          <p className="text-red-600 dark:text-red-400 font-semibold">
            Close: ${data.close.toLocaleString()}
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            High: ${data.high.toLocaleString()}
          </p>
          <p className="text-purple-600 dark:text-purple-400 font-semibold">
            Low: ${data.low.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function CandlestickChart({ data, title = "Candlestick Chart" }) {
  // Format data for candlestick representation
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    high: item.high,
    low: item.low,
    open: item.open,
    close: item.close,
    range: [item.low, item.high],
    body: [Math.min(item.open, item.close), Math.max(item.open, item.close)],
    isPositive: item.close >= item.open,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: "12px", fontWeight: "600" }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px", fontWeight: "600" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CandlestickTooltip />} />

          {/* Wicks (High-Low lines) */}
          <Bar dataKey="range" fill="transparent" barSize={2}>
            {chartData.map((entry, index) => (
              <Cell
                key={`wick-${index}`}
                stroke={entry.isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={2}
              />
            ))}
          </Bar>

          {/* Candle bodies */}
          <Bar dataKey="body" barSize={20}>
            {chartData.map((entry, index) => (
              <Cell
                key={`body-${index}`}
                fill={entry.isPositive ? "#10b981" : "#ef4444"}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm font-semibold">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Bullish</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Bearish</span>
        </div>
      </div>
    </motion.div>
  );
}
