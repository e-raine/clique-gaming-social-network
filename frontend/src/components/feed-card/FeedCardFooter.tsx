
import React from "react";
import { CardFooter } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import Commenting from "./Commenting";


interface FeedCardFooterProps {
	likeCount: number;
	liked: boolean;
	handleLike: () => void;
	commentCount: number;
	commentButtonDisabled: boolean;
	cardInnerContent: React.ReactNode;
	author: string;
}

export const FeedCardFooter = React.memo<FeedCardFooterProps>(({
	likeCount,
	liked,
	handleLike,
	commentCount,
	commentButtonDisabled,
	cardInnerContent,
	author,
}) => {
	return (
		<CardFooter className="flex justify-between items-center px-6 py-2 text-sm text-muted-foreground">
			<div className="flex items-center gap-4 ">
				{/* Like Button */}
				<button
					className="flex items-center gap-1 hover:text-primary transition"
					onClick={handleLike}
					aria-label={liked ? "Unlike" : "Like"}
				>
					{liked ? (
						<Heart className="h-6 w-6 fill-red-500 text-red-500" />
					) : (
						<Heart className="h-6 w-6" />
					)}
					<span>{likeCount}</span>
				</button>
				{/* Comment Button */}
				{/* <Commenting
					trigger={
						<button
							className="flex items-center gap-1 hover:text-primary transition"
							aria-label="Comment"
							disabled={commentButtonDisabled}
						>
							<MessageCircle className="h-6 w-6" />
							<span>{commentCount}</span>
						</button>
					}
					cardInner={cardInnerContent}
					cardFooter={
						<div className="flex items-center gap-4 px-6 py-2">
							<button
								className="flex items-center gap-1 hover:text-primary transition"
								onClick={handleLike}
								aria-label={liked ? "Unlike" : "Like"}
							>
								{liked ? (
									<Heart className="h-6 w-6 fill-red-500 text-red-500" />
								) : (
									<Heart className="h-6 w-6" />
								)}
								<span>{likeCount}</span>
							</button>
						</div>
					}
					author={author}
					likeCount={likeCount}
					liked={liked}
					onLike={handleLike}
				/> */}
			</div>
		</CardFooter>
	);
});

FeedCardFooter.displayName = 'FeedCardFooter'