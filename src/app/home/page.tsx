'use client';
import { useState } from "react";
import TabNavigation from "@/app/ui/tab-navigation/tab-navigation";
import CreatePost from "@/app/ui/create-post/create-post";
import ForYou from "@/app/ui/for-you/for-you";
import Following from "@/app/ui/following/following";

export default function Home() {
  const [activeTab, setActiveTab] = useState('ForYou');

  return (
    <div>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
      <CreatePost />
      {activeTab === 'ForYou' && <ForYou />}
      {activeTab === 'Following' && <Following />}
    </div>
  )
}
