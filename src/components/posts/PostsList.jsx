"use client";

import { motion } from "framer-motion";
import { PostCard } from "./PostCard";

export function PostsList({ posts, title = "Recent Posts" }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest trading insights and market analysis
        </p>
      </motion.div>

      {/* Posts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </motion.div>

      {/* Load More Button */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-instagram-gradient text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Load More Posts
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
