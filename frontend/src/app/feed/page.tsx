"use client";
import { FeedCard, FeedCardProps } from "@/components/feed-card/FeedCard";
import CreatePost from "@/components/feed-card/post-actions/CreatePost";

const Feed = () => {
	const FeedList: FeedCardProps[] = [
		{
			id: 1,
			type: "grid-images",
			images: [
				"/images/mob1.jpg",
				"/images/mob2.jpg",
				"/images/mob3.jpg",
				"/images/mob4.jpg",
			],
			textContent:
				"Just conquered the Ocean Monument! Look at all this loot and the epic battle screenshots!",
			author: "Charles",
			avatarUrl: "/images/charles-avatar.jpg",
			date: new Date(),
			game: "Minecraft",
			postTitle: "Ocean Monument Victory",
			tags: ["#minecraft", "#ocean", "#monument", "#survival", "#victory"],
		},
		{
			id: 2,
			type: "text",
			textContent:
				"After 3 hours of grinding, I finally hit level 50! The grind was real but totally worth it. Now time to tackle some endgame content with the squad!",
			author: "Sarah",
			avatarUrl: "/images/sarah-avatar.jpg",
			date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
			game: "Elden Ring",
			postTitle: "Level 50 Achievement Unlocked!",
			tags: ["#eldenring", "#level50", "#grinding", "#achievement", "#endgame"],
		},
		{
			id: 3,
			type: "single-image",
			images: ["/images/valorant-ace.jpg"],
			textContent:
				"CLUTCH ACE in ranked! 1v5 situation and somehow pulled it off. My hands are still shaking 😅",
			author: "Mike",
			avatarUrl: "/images/mike-avatar.jpg",
			date: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
			game: "Valorant",
			postTitle: "Insane 1v5 Clutch Ace",
			tags: ["#valorant", "#ace", "#clutch", "#ranked", "#1v5"],
		},
	];

	return (
		<div className="gap-2 flex flex-col items-center">

			{/* Map through the posts */}
			{FeedList.map((post, index) => 
					<FeedCard key={index} {...post} />)
				}

			<CreatePost/>
		</div>
	);
};

export default Feed;
