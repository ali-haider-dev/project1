"use client";

import { motion } from "framer-motion";

export function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Portfolio Value",
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-pink-500 to-orange-500",
    },
    {
      title: "Daily Change",
      value: `$${stats.dailyChange.toLocaleString()}`,
      subtitle: `${stats.dailyChangePercent >= 0 ? "+" : ""}${
        stats.dailyChangePercent
      }%`,
      isPositive: stats.dailyChangePercent >= 0,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      gradient:
        stats.dailyChangePercent >= 0
          ? "from-green-500 to-emerald-500"
          : "from-red-500 to-rose-500",
    },
    {
      title: "Total Profit",
      value: `$${stats.totalProfit.toLocaleString()}`,
      subtitle: `${stats.totalProfitPercent >= 0 ? "+" : ""}${
        stats.totalProfitPercent
      }%`,
      isPositive: stats.totalProfitPercent >= 0,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-pink-500/20 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white`}
            >
              {card.icon}
            </div>
            {card.subtitle && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  card.isPositive
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                }`}
              >
                {card.subtitle}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {card.title}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {card.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
