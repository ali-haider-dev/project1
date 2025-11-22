"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

// Custom tooltip component
const PortfolioTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-2 border-pink-500/30 dark:border-orange-500/30 rounded-xl p-4 shadow-2xl">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
          {data.payload.fullName} ({data.name})
        </p>
        <p className="text-sm text-pink-600 dark:text-orange-500 font-semibold">
          Value: ${data.value.toLocaleString()}
        </p>
        <p
          className={`text-sm font-semibold ${
            data.payload.change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          Change: {data.payload.change >= 0 ? "+" : ""}
          {data.payload.change}%
        </p>
      </div>
    );
  }
  return null;
};

export function PortfolioChart({ assets, title = "Portfolio Distribution" }) {
  // Format data for pie chart
  const chartData = assets.map((asset) => ({
    name: asset.symbol,
    value: asset.value,
    fullName: asset.name,
    change: asset.change,
  }));

  // Instagram-inspired colors
  const COLORS = [
    "#f56040",
    "#f77737",
    "#f9913d",
    "#fbb040",
    "#a855f7",
    "#ec4899",
  ];

  // Custom label
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-pink-500/20 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-instagram-gradient flex items-center justify-center">
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
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
        </div>
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<PortfolioTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: "14px", fontWeight: "600" }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Asset breakdown */}
      <div className="mt-6 space-y-3">
        {assets.map((asset, index) => (
          <div
            key={asset.symbol}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  {asset.symbol}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {asset.amount} units
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900 dark:text-gray-100">
                ${asset.value.toLocaleString()}
              </p>
              <p
                className={`text-xs font-semibold ${
                  asset.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {asset.change >= 0 ? "+" : ""}
                {asset.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
