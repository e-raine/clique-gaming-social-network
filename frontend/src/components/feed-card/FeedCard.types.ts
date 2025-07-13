/**
 * Type definitions for the FeedCard component, including feed types and props.
 * Provides structure for feed card data such as images, text, author, and metadata.
 */


export type FeedType = "single-image" | "grid-images" | "text";

export interface FeedCardProps {
  type: string;
  images?: string[];
  textContent?: string;
  author: string;
  avatarUrl: string;
  date: Date;
  game: string;
  postTitle: string;
  likeCount?: number;
  commentCount?: number;
  onLike?: () => void;
  onComment?: () => void;
}