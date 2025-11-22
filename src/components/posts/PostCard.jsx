"use client";

import { motion } from "framer-motion";

export function PostCard({ post }) {
  // Format timestamp to relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        postDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-pink-500/20 transition-all duration-300"
    >
      {/* User Info Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-orange-500 p-0.5">
          <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-gray-900 dark:text-gray-100 hover:text-pink-600 dark:hover:text-orange-500 transition-colors cursor-pointer">
            {post.user.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            @{post.user.username} · {getRelativeTime(post.timestamp)}
          </p>
        </div>

        {/* More Options Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </motion.button>
      </div>

      {/* Post Description */}
      <div className="mb-4">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
          {post.description}
        </p>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors group"
        >
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-sm font-semibold">{post.likes}</span>
        </motion.button>

        {/* Comment Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
        >
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-sm font-semibold">{post.comments}</span>
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
        >
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span className="text-sm font-semibold">{post.shares}</span>
        </motion.button>

        {/* Bookmark Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-auto text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
        >
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
