# Posts Section Documentation

## Overview

The posts section displays a social media-style feed with user posts. It's designed to be dynamic and easily integrated with API data.

## Components

### 1. **PostCard** - Individual Post Component

Displays a single post with:

- User avatar with Instagram-style gradient border
- User name and username
- Relative timestamp (e.g., "2h ago", "3d ago")
- Post description/content
- Engagement buttons (like, comment, share, bookmark)
- Engagement counts

### 2. **PostsList** - Posts Feed Container

- Displays multiple posts in a vertical feed
- Staggered animation on load
- "Load More" button for pagination
- Section header with icon

## Data Structure

Posts data is stored in `src/data/postsData.json`:

```json
{
  "posts": [
    {
      "id": 1,
      "user": {
        "name": "Sarah Johnson",
        "username": "sarahjohnson",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      },
      "timestamp": "2025-01-22T14:30:00",
      "description": "Your post content here...",
      "likes": 234,
      "comments": 45,
      "shares": 12
    }
  ]
}
```

## How to Use

### Display Posts

The posts are already integrated into the dashboard:

```javascript
import { PostsList } from "@/components/posts/PostsList";
import postsData from "@/data/postsData.json";

<PostsList posts={postsData.posts} title="Community Feed" />;
```

### Add New Posts

Simply add a new post object to the `posts` array in `postsData.json`:

```json
{
  "id": 3,
  "user": {
    "name": "Your Name",
    "username": "yourusername",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=YourName"
  },
  "timestamp": "2025-01-22T16:00:00",
  "description": "Your post content here! You can use hashtags #crypto #trading",
  "likes": 0,
  "comments": 0,
  "shares": 0
}
```

## Avatar Generation

The posts use [DiceBear Avatars](https://dicebear.com/) for user avatars. You can customize them:

```
https://api.dicebear.com/7.x/avataaars/svg?seed=USERNAME
```

Other avatar styles available:

- `avataaars` - Cartoon avatars
- `bottts` - Robot avatars
- `identicon` - Geometric patterns
- `initials` - Letter-based avatars

## Integration with API

To connect to a real API:

### 1. Create an API service (`src/lib/postsApi.js`):

```javascript
export async function fetchPosts(page = 1, limit = 10) {
  const response = await fetch(
    `YOUR_API_ENDPOINT/posts?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

export async function likePost(postId) {
  const response = await fetch(`YOUR_API_ENDPOINT/posts/${postId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export async function addComment(postId, comment) {
  const response = await fetch(`YOUR_API_ENDPOINT/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  return response.json();
}
```

### 2. Update the dashboard to use the API:

```javascript
import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/postsApi";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading posts...</div>;

  return <PostsList posts={posts} title="Community Feed" />;
}
```

### 3. Add Interaction Handlers:

Update `PostCard.jsx` to handle interactions:

```javascript
export function PostCard({ post, onLike, onComment, onShare }) {
  const handleLike = () => {
    onLike(post.id);
  };

  // Update the like button:
  <motion.button
    onClick={handleLike}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2..."
  >
    {/* ... */}
  </motion.button>;
}
```

## Timestamp Formatting

The `getRelativeTime` function automatically formats timestamps:

- Less than 1 minute: "Just now"
- Less than 1 hour: "5m ago"
- Less than 1 day: "3h ago"
- Less than 1 week: "2d ago"
- Older: "Jan 15" or "Jan 15, 2024"

## Styling

Posts use the Instagram-inspired theme:

- Avatar border: Pink to orange gradient
- Like button: Pink hover
- Comment button: Blue hover
- Share button: Green hover
- Bookmark button: Orange hover

## Features

- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Smooth animations
- ✅ Relative timestamps
- ✅ Engagement tracking
- ✅ Instagram-style avatars
- ✅ Easy API integration
- ✅ Infinite scroll ready

## Future Enhancements

You can easily add:

1. **Image/Video support** - Add `media` field to post data
2. **Infinite scroll** - Use Intersection Observer API
3. **Real-time updates** - Use WebSockets or polling
4. **Post creation** - Add a "Create Post" form
5. **User profiles** - Link to user profile pages
6. **Hashtag support** - Parse and link hashtags
7. **Mentions** - Parse and link @mentions

## Example: Adding Images to Posts

Update the data structure:

```json
{
  "id": 4,
  "user": {...},
  "timestamp": "2025-01-22T16:00:00",
  "description": "Check out this amazing chart!",
  "media": {
    "type": "image",
    "url": "/images/chart.png"
  },
  "likes": 150,
  "comments": 30,
  "shares": 8
}
```

Update `PostCard.jsx`:

```javascript
{
  /* After description, before engagement stats */
}
{
  post.media && post.media.type === "image" && (
    <div className="mb-4 rounded-xl overflow-hidden">
      <img src={post.media.url} alt="Post media" className="w-full h-auto" />
    </div>
  );
}
```

## Support

For questions or issues:

- Check the component files in `src/components/posts/`
- Review the data structure in `src/data/postsData.json`
- Refer to the dashboard implementation in `src/app/dashboard/page.jsx`
