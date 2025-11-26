"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
import { selectUser, selectIsAuthenticated } from "@/store/authSlice";
import { Navbar } from "@/components/Navbar";
import { PriceChart } from "@/components/charts/PriceChart";
import { CandlestickChart } from "@/components/charts/CandlestickChart";
import { PortfolioChart } from "@/components/charts/PortfolioChart";
import { StatsCards } from "@/components/charts/StatsCards";
import { RecentTrades } from "@/components/charts/RecentTrades";
import tradingData from "@/data/tradingData.json";

export default function DashboardPage() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dark-gradient p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 mb-8 shadow-2xl"
            >
              <div className="flex items-center gap-6 flex-wrap">
                <div className="w-20 h-20 rounded-full bg-primary-gradient flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    Welcome back, {user.name}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track your trading portfolio and performance
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <StatsCards stats={tradingData.portfolioStats} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <PriceChart
                data={tradingData.priceHistory}
                title="Price & Volume History"
              />
              <CandlestickChart
                data={tradingData.priceHistory}
                title="OHLC Chart"
              />
            </div>

            {/* Portfolio and Recent Trades */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <PortfolioChart
                assets={tradingData.assets}
                title="Portfolio Distribution"
              />
              <RecentTrades
                trades={tradingData.recentTrades}
                title="Recent Trades"
              />
            </div>
          </motion.main>
        </div>
      </div>
    </>
  );
}
