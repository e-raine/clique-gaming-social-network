"use client";
import { FeedCard, FeedCardProps } from "@/components/feed-card/FeedCard";
import AddPost from "@/components/feed-card/post-actions/AddPost";
import { useMemo } from "react";

const Feed = () => {
    const FeedCardList: FeedCardProps[] = useMemo(() => [
        {	
            id: 1001,
            type: "grid-images",
            images: [
                "/images/apex1.jpg",
                "/images/apex2.jpg",
                "/images/apex3.jpg",
                "/images/apex4.jpg",
            ],
            textContent: "Finally hit Diamond rank! The grind was real but totally worth it.",
            author: "Sarah",
            avatarUrl: "/images/sarah-avatar.jpg",
            date: new Date(),
            game: "Apex Legends",
            postTitle: "Diamond Rank Achievement",
            tags: ["ranked", "diamond", "achievement", "grind"]
        },
        {	
            id: 1002,
            type: "text",
            textContent: "Looking for a duo partner for ranked games. Must have good communication and be at least Platinum level.",
            author: "Mike",
            avatarUrl: "/images/mike-avatar.jpg",
            date: new Date(),
            game: "Valorant",
            postTitle: "LFG Ranked Partner",
            tags: ["lfg", "duo", "ranked", "platinum"]
        },
        {
            id: 1003,
            type: "single-image",
            images: ["/images/bossfight.jpg"],
            textContent: "After 50+ attempts, finally defeated this boss! The satisfaction is unreal.",
            author: "Alex",
            avatarUrl: "/images/alex-avatar.jpg",
            date: new Date(),
            game: "Elden Ring",
            postTitle: "Boss Victory",
            tags: ["boss", "victory", "challenge", "souls-like"]
        }
    ], []);
    
    return (
        <div className="space-y-4">
            <AddPost />
            
            {/* Feed Posts */}
            <div className="gap-2 flex flex-col">
                {FeedCardList.map((feedCard) => (
                    <FeedCard
                        key={feedCard.id}
                        {...feedCard}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;
