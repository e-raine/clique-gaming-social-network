import {
	Card,
} from "@/components/ui/card";


import type { FeedCardProps } from "./FeedCard.types";
import { useState } from "react";

import { FeedCardFooter } from "./FeedCardFooter";
import FeedCardInner from "./FeedCardInner";

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

  // No need for commentDialogOpen state, handled by DialogTrigger in Commenting

  return (
	<Card className="w-full min-w-[300px] sm:min-w-md md:min-w-lg gap-2">
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
