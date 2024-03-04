'use client';

import { useState } from "react";
import TabNavigation from "@/app/ui/tab-navigation";
import ForYou from "@/app/ui/for-you";
import Following from "@/app/ui/following";
import { PostType } from "@/app/lib/definitions";
import CreatePost from "@/app/ui/create-post";

export default function Home(
  {forYouPosts, followingPosts}:
  {forYouPosts: PostType[], followingPosts: PostType[]}
) {
  const [activeTab, setActiveTab] = useState('ForYou');

  return (
    <div>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
      <CreatePost />
      {activeTab === 'ForYou' && <ForYou posts={forYouPosts} />}
      {activeTab === 'Following' && <Following posts={followingPosts} />}
    </div>
  )
}
