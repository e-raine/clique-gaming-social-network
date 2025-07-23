"use client";

import SidebarLeft from "@/components/newsfeed/SidebarLeft";
import Header from "@/components/newsfeed/Header";
import MainFeed from "@/components/newsfeed/MainFeed";

import Image from 'next/image'

import "@/components/newsfeed/newsfeed.css";

export default function Newsfeed() {
  return (
    <div className="newsfeed-container">
      <SidebarLeft author="username" avatarUrl="https://avatars.githubusercontent.com/u/176701797?v=4"/>
      <main className="newsfeed-main">

        <Header />
        <MainFeed />
      </main>
      
    </div>
  );
}