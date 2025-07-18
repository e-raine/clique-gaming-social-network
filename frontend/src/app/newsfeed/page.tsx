"use client";

import SidebarLeft from "@/components/newsfeed/SidebarLeft";
import SidebarRight from "@/components/newsfeed/SidebarRight";
import FeedTabs from "@/components/newsfeed/FeedTabs";
import PostCard from "@/components/newsfeed/PostCard";
import Header from "@/components/newsfeed/Header";

import Image from 'next/image'

import "@/components/newsfeed/newsfeed.css";

export default function Newsfeed() {
  return (
    <div className="newsfeed-container">
      <SidebarLeft author="username" avatarUrl="https://avatars.githubusercontent.com/u/176701797?v=4"/>
      <main className="newsfeed-main">

        <Header />

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