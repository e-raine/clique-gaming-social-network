import React from "react";
import { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { FeedCardContent } from "./FeedCardContent";

//This file contains the Card header and Content

// Extracted card content for reuse, now as a component
interface FeedCardInnerProps {
	author: string;
	avatarUrl?: string;
	date: Date;
	game: string;
	postTitle: string;
	type: "single-image" | "grid-images" | "text";
	images: string[];
	textContent: string;
}

const FeedCardInner =  React.memo<FeedCardInnerProps>(({
	author,
	avatarUrl,
	date,
	game,
	postTitle,
	type,
	images,
	textContent,
}) => (
	<>
		<CardHeader className="flex justify-between items-start px-6 py-2">
			{/* Left Section */}
				<div className="flex text-left gap-3 items-center">
					<Avatar className="size-15">
						<AvatarImage src={avatarUrl || undefined} alt={author} />

						{/* If undefined it will show a character based on the username */}
						<AvatarFallback>{author?.[0]?.toUpperCase() || "?"}</AvatarFallback>
					</Avatar>
					<div>
						<h4 className="font-medium text-sm">{author}</h4>
						<Separator />
						<p className="text-sm text-muted-foreground ">
							{date.toLocaleDateString()}
						</p>
						<p className="text-sm text-muted-foreground leading-3">{game}</p>
					</div>
				</div>
				<CardTitle className="mt-3">{postTitle}</CardTitle>
			
			{/* Right Section */}
			<div className="right-section flex gap-2">
				<Button variant="default">Follow</Button>
				<Button variant="ghost" size="icon" aria-label="More options">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</div>
		</CardHeader>
		{/* Card Content */}
		<CardContent>
			<FeedCardContent type={type} images={images} textContent={textContent} />
		</CardContent>
	</>
));

FeedCardInner.displayName = 'FeedCardInner';

export default FeedCardInner;
