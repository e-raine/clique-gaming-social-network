
import React, { useContext } from "react";
import { CardFooter } from "../ui/card";
import { Heart, /*MessageCircle */} from "lucide-react";
// import Commenting from "./Commenting";
import { PostGlobalContext } from "./PostGlobalContext";


export const FeedCardFooter = React.memo(() => {
	const context = useContext(PostGlobalContext);
	if (!context){
		throw new Error("FeedCardFooter must be inside PostGlobalContext.Provider!");
	}

	const {likeCount, onLike, liked} = context;

	return (
		<CardFooter className="flex justify-between items-center px-6 py-2 text-sm text-muted-foreground">
			<div className="flex items-center gap-4 ">
				{/* Like Button */}
				<button
					className="flex items-center gap-1 hover:text-primary transition"
					onClick={onLike}
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
						<onLike
							className="flex items-center gap-1 hover:text-primary transition"
							aria-label="Comment"
							disabled={commentButtonDisabled}
						>
							<MessageCircle className="h-6 w-6" />
							<span>{commentCount}</span>
						</onLike>
					}
					cardInner={cardInnerContent}
					cardFooter={
						<div className="flex items-center gap-4 px-6 py-2">
							<button
								className="flex items-center gap-1 hover:text-primary transition"
								onClick={onLike}
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