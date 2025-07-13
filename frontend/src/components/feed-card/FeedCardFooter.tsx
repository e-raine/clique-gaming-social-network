import React from "react";
import { CardFooter } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import Commenting from "./Commenting";
import FeedCardInner from "./FeedCardInner";


interface FeedCardFooterProps {
	likeCount: number;
	liked: boolean;
	handleLike: () => void;
	commentCount: number;
	onCommentClick: () => void;
	commentButtonDisabled: boolean;
	author: string;
	avatarUrl: string;
	date: string;
	game: string;
	postTitle: string;
	type: string;
	images: string[];
	textContent: string;
}

export const FeedCardFooter: React.FC<FeedCardFooterProps> = ({
	likeCount,
	liked,
	handleLike,
	commentCount,
	onCommentClick,
	commentButtonDisabled,
	author,
	avatarUrl,
	date,
	game,
	postTitle,
	type,
	images,
	textContent,
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
						<Heart className="h-6 w-6 fill-red-500 " />
					) : (
						<Heart className="h-6 w-6" />
					)}
					<span>{likeCount}</span>
				</button>
				{/* Comment Button */}
				<Commenting
					trigger={
						<button
							className="flex items-center gap-1 hover:text-primary transition"
							onClick={onCommentClick}
							aria-label="Comment"
							disabled={commentButtonDisabled}
							type="button"
						>
							<MessageCircle className="h-6 w-6" />
							<span>{commentCount}</span>
						</button>
					}
					cardInner={
						<FeedCardInner
							author={author}
							avatarUrl={avatarUrl}
							date={typeof date === "string" ? new Date(date) : date}
							game={game}
							postTitle={postTitle}
							type={type as "single-image" | "grid-images" | "text"}
							images={images}
							textContent={textContent}
						/>
					}
					cardFooter={
						<CardFooter className="flex  items-center px-6 py-2 text-sm text-muted-foreground">
							<div className="flex items-center gap-4">
								<button
									className="flex items-center gap-1 hover:text-primary transition"
									aria-label={liked ? "Unlike" : "Like"}
									onClick={handleLike}
									type="button"
								>
									{liked ? (
										<Heart className="h-5 w-5 fill-red-500 " />
									) : (
										<Heart className="h-5 w-5" />
									)}
									<span>{likeCount}</span>
								</button>
								<button
									className="flex items-center gap-1 hover:text-primary transition"
									aria-label="Comment"
									disabled
									type="button"
								>
									<MessageCircle className="h-5 w-5" />
									<span>{commentCount}</span>
								</button>
							</div>
						</CardFooter>
					}
					author={author}
					likeCount={likeCount}
					liked={liked}
					onLike={handleLike}
				/>
			</div>
		</CardFooter>
	);
};
