import SidebarLeft from "@/components/newsfeed/SidebarLeft";
import SidebarRight from "@/components/newsfeed/SidebarRight";
import FeedTabs from "@/components/newsfeed/FeedTabs";
import PostCard from "@/components/newsfeed/PostCard";

import Image from 'next/image'

import "@/components/newsfeed/newsfeed.css";

export default function Newsfeed() {
  return (
    <div className="newsfeed-container">
      <SidebarLeft />
      <main className="newsfeed-main">
        <div className="newsfeed-header">
          <Image src="/logo.png" className="logo-icon" alt="" width={400}
						height={400}/>
          <input className="search-input" placeholder="Search here..." />
          <button className="search-btn">🔍</button>
        </div>
        <FeedTabs />
        <div className="posts-container">
          <PostCard />
          <PostCard />
        </div>
      </main>
      <SidebarRight />
    </div>
  );
}