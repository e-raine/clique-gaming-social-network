import { Card } from "@/components/ui/card";

import { useState } from "react";

import { FeedCardFooter } from "./FeedCardFooter";
import FeedCardInner from "./FeedCardInner";

// This is the main file for the FeedCard

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



export function FeedCard({
	type,
	images = [],
	textContent = "",
	author,
	avatarUrl,
	date,
	game,
	postTitle,
	likeCount: initialLikeCount = 10,
}: FeedCardProps) {
	//Liking Posts
	const [likeCount, setLikeCount] = useState(initialLikeCount);
	const [liked, setLiked] = useState(false);
	const handleLike = () => {
		if (liked) {
			setLikeCount(likeCount - 1);
		} else {
			setLikeCount(likeCount + 1);
		}
		setLiked(!liked);
	};

	//Commenting
	const commentCount = 0; // TODO: Replace with real comment count if available

	return (
		<Card className="w-full min-w-[300px] sm:min-w-[500px] md:min-w-[600px]">
			<FeedCardInner
				author={author}
				avatarUrl={avatarUrl}
				date={date}
				game={game}
				postTitle={postTitle}
				type={type as "single-image" | "grid-images" | "text"}
				images={images}
				textContent={textContent}
			/>

			<FeedCardFooter
				likeCount={likeCount}
				liked={liked}
				handleLike={handleLike}
				commentCount={commentCount}
				onCommentClick={() => {}}
				commentButtonDisabled={false}
				author={author}
				avatarUrl={avatarUrl}
				date={date instanceof Date ? date.toISOString() : date}
				game={game}
				postTitle={postTitle}
				type={type}
				images={images}
				textContent={textContent}
			/>
		</Card>
	);
}
