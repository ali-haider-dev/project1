"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout, selectUser, selectIsAuthenticated } from "@/store/authSlice";
import { removeAuthCookie } from "@/lib/api";
import { Navbar } from "@/components/Navbar";

export default function DashboardPage() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    removeAuthCookie();
    dispatch(logout());
    router.push("/auth");
  };

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
      <div className="min-h-screen bg-instagram-gradient p-8">
        <div className="max-w-7xl mx-auto">
          <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 mb-8 shadow-2xl"
            >
              <div className="flex items-center gap-6 flex-wrap">
                <div className="w-20 h-20 rounded-full bg-instagram-gradient flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    Welcome back, {user.name}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    You&apos;re successfully logged in
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-pink-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-instagram-gradient flex items-center justify-center text-white mb-6">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Profile
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-pink-500/5 dark:bg-orange-500/10 rounded-lg">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Name:
                    </span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {user.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-500/5 dark:bg-orange-500/10 rounded-lg">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Email:
                    </span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-500/5 dark:bg-orange-500/10 rounded-lg">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Role:
                    </span>
                    <span className="px-3 py-1 bg-instagram-gradient text-white rounded-full text-sm font-semibold capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Security Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-pink-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-instagram-gradient flex items-center justify-center text-white mb-6">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  Your session is secured with JWT authentication and will
                  automatically expire after 3 hours.
                </p>
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 dark:text-green-400 font-semibold text-sm">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Authenticated
                </div>
              </motion.div>

              {/* Quick Actions Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-pink-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-instagram-gradient flex items-center justify-center text-white mb-6">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3.5 bg-pink-500/10 dark:bg-orange-500/10 border-2 border-pink-500/20 dark:border-orange-500/20 rounded-xl text-pink-600 dark:text-orange-500 font-semibold text-left hover:bg-pink-500/20 dark:hover:bg-orange-500/20 hover:border-pink-500 dark:hover:border-orange-500 transition-all duration-300"
                  >
                    Update Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3.5 bg-pink-500/10 dark:bg-orange-500/10 border-2 border-pink-500/20 dark:border-orange-500/20 rounded-xl text-pink-600 dark:text-orange-500 font-semibold text-left hover:bg-pink-500/20 dark:hover:bg-orange-500/20 hover:border-pink-500 dark:hover:border-orange-500 transition-all duration-300"
                  >
                    Change Password
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3.5 bg-pink-500/10 dark:bg-orange-500/10 border-2 border-pink-500/20 dark:border-orange-500/20 rounded-xl text-pink-600 dark:text-orange-500 font-semibold text-left hover:bg-pink-500/20 dark:hover:bg-orange-500/20 hover:border-pink-500 dark:hover:border-orange-500 transition-all duration-300"
                  >
                    View Settings
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.main>
        </div>
      </div>
    </>
  );
}
