import React, { useContext } from "react";
import { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import {
	MoreVertical,
	Edit,
	// Flag,
	// Share,
	// Bookmark,
	// UserMinus,
} from "lucide-react";
import { FeedCardContent } from "./FeedCardContent";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	// DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import EditPost from "./post-actions/EditPost";
import { TagList } from "../ui/tag-list";
import { PostGlobalContext } from "./PostGlobalContext";

//This file contains the Card header and Content

// // Extracted card content for reuse, now as a component
// interface FeedCardInnerProps {
// 	id: number;
// 	author: string;
// 	avatarUrl?: string;
// 	tags?: string[];
// 	date: Date;
// 	game: string;
// 	postTitle: string;
// 	type: "single-image" | "grid-images" | "text";
// 	images: string[];
// 	textContent: string;
// }

const FeedCardInner = React.memo(() => {
	//Use context to prevent prop drilling and unnes
	const context = useContext(PostGlobalContext);
	if (!context) {
		throw new Error("FeedCardInner must be inside PostGlobalContext.Provider!");
	}

	//Destructure context for use
	const { author, avatarUrl, tags, date, game, postTitle } = context;

	return (
		<>
			<CardHeader className="px-6 py-4">
				<div className="flex justify-between items-start">
					{/* Left Section - Author Info */}
					<div className="flex text-left gap-3 items-center">
						<Avatar className="size-15">
							<AvatarImage src={avatarUrl || undefined} alt={author} />
							<AvatarFallback>
								{author?.[0]?.toUpperCase() || "?"}
							</AvatarFallback>
						</Avatar>
						<div>
							<h4 className="font-medium text-sm">{author}</h4>
							<Separator />
							<p className="text-sm text-muted-foreground">
								{date.toLocaleDateString()}
							</p>
							<p className="text-sm text-muted-foreground leading-3">{game}</p>
						</div>
					</div>

					{/* Right Section - Actions */}
					<div className="right-section flex gap-2">
						<Button variant="default">Follow</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" aria-label="More options">
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<EditPost>
									<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
										<Edit className="mr-2 h-4 w-4" />
										Edit Post
									</DropdownMenuItem>
								</EditPost>
								{/* <DropdownMenuItem>
										<Share className="mr-2 h-4 w-4" />
										Share Post
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bookmark className="mr-2 h-4 w-4" />
										Save Post
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<UserMinus className="mr-2 h-4 w-4" />
										Unfollow {author}
									</DropdownMenuItem>
									<DropdownMenuItem className="text-red-600">
										<Flag className="mr-2 h-4 w-4" />
										Report Post
									</DropdownMenuItem> */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Post Title */}
				<CardTitle className="mt-3 text-lg font-semibold text-left">
					{postTitle}
				</CardTitle>

				{/* Tags */}
				{tags && tags.length > 0 && (
					<div className="mt-2">
						<TagList
							tags={tags}
							variant="default"
							size="md"
							maxTags={5}
							onTagClick={(tag) => {
								// TODO: Implement tag click handler for filtering/navigation
								console.log(`Clicked tag: ${tag}`);
							}}
						/>
					</div>
				)}
			</CardHeader>
			{/* Card Content */}
			<CardContent>
				<FeedCardContent />
			</CardContent>
		</>
	);
});

FeedCardInner.displayName = "FeedCardInner";

export default FeedCardInner;
