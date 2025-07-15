"use client";
import { FeedCard, FeedCardProps } from "@/components/feed-card/FeedCard";

const Feed = () => {
    const FeedCardList: FeedCardProps[] = [
        {	
			id: 1233,
            type: "grid-images",
            images: [
                "/images/mob1.jpg",
                "/images/mob2.jpg",
                "/images/mob3.jpg",
                "/images/mob4.jpg",
                // "/images/mob5.jpg",
            ],
            textContent: "Survived the Ocean Monument, and here's proof!",
            author: "Charles",
            avatarUrl: "/images/charles-avatar.jpg",
            date: new Date(),
            game: "Minecraft",
            postTitle: "Ocean Raid Highlights"
        },
        {	
			id: 2131232,
            type: "text",
            textContent: "Survived the Ocean Monument, and here's proof!",
            author: "Charles",
            avatarUrl: "/images/charles-avatar.jpg",
            date: new Date(),
            game: "Minecraft",
            postTitle: "Ocean Raid Highlights"
        },
        {
			id: 32113212,
            type: "single-image",
            images: ["/images/mob1.jpg"],
            textContent: "Survived the Ocean Monument, and here's proof!",
            author: "Charles",
            avatarUrl: "/images/charles-avatar.jpg",
            date: new Date(),
            game: "Minecraft",
            postTitle: "Ocean Raid Highlights"
        }
    ];
    
    return (
        <div className="gap-2 flex flex-col">
            {FeedCardList.map((feedCard, index) => (
                <FeedCard
                    key={index}
                    {...feedCard}
                />
            ))}
			
		</div>
    );
};

export default Feed;
