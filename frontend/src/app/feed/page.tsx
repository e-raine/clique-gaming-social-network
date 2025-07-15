'use client'
import { FeedCard } from "@/components/feed-card/FeedCard"

const Feed = () => {
  return (
    <div className="gap-2 flex flex-col">
			<FeedCard
				type="grid-images"
				images={[
					"/images/mob1.jpg",
					"/images/mob2.jpg",
					"/images/mob3.jpg",
					"/images/mob4.jpg",
					// "/images/mob5.jpg",
				]}
				textContent="Survived the Ocean Monument, and here's proof!"
				author="Charles"
				avatarUrl="/images/charles-avatar.jpg"
				date={new Date()}
				game="Minecraft"
				postTitle="Ocean Raid Highlights"
				tags={["#minecraft", "#ocean", "#monument", "#survival", "#victory"]}
			/>

			<FeedCard
				type="text"
				textContent="Survived the Ocean Monument, and here's proof!"
				author="Charles"
				avatarUrl="/images/charles-avatar.jpg"
				date={new Date()}
				game="Minecraft"
				postTitle="Ocean Raid Highlights"
				tags={["#minecraft", "#story", "#adventure"]}
			/>

			<FeedCard
				type="single-image"
				images={["/images/mob1.jpg"]}
				textContent="Survived the Ocean Monument, and here's proof!"
				author="Charles"
				avatarUrl="/images/charles-avatar.jpg"
				date={new Date()}
				game="Minecraft"
				postTitle="Ocean Raid Highlights"
				tags={["#minecraft", "#screenshot", "#gaming", "#proud"]}
			/>
		</div>
  )
}

export default Feed;
