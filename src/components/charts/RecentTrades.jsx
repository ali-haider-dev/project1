"use client";

import { motion } from "framer-motion";

export function RecentTrades({ trades, title = "Recent Trades" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
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
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        {title}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                Type
              </th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                Asset
              </th>
              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                Amount
              </th>
              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                Total
              </th>
              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <motion.tr
                key={trade.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      trade.type === "buy"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {trade.type}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {trade.asset}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-semibold text-gray-700 dark:text-gray-300">
                  {trade.amount}
                </td>
                <td className="py-4 px-4 text-right font-semibold text-gray-700 dark:text-gray-300">
                  ${trade.price.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right font-bold text-gray-900 dark:text-gray-100">
                  ${trade.total.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right text-sm text-gray-600 dark:text-gray-400">
                  {new Date(trade.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary footer */}
      <div className="mt-6 pt-4 border-t-2 border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          Total Trades: {trades.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-primary-gradient text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
        >
          View All Trades
        </motion.button>
      </div>
    </motion.div>
  );
}
