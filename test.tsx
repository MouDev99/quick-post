import React from "react";


function Home() {
  const [activeTab, setActiveTab] = React.useState('ForYou');

  return (
    <div>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <CreatePost />
      {activeTab === 'ForYou' && <ForYou />}
      {activeTab === 'Following' && <Following />}
    </div>
  )
}

function TabNavigation ({activeTab, setActiveTab}) {

  return (
    <div>
      <div onClick={() => setActiveTab('ForYou')} className={activeTab === 'ForYou' ? 'bg-blue-300' : ''}>
        For you
      </div>
      <div onClick={() => setActiveTab('Following')} className={activeTab === 'Following' ? 'bg-blue-300' : ''}>
        Following
      </div>
    </div>
  )
}

function CreatePost() {

  return (
    <div>
      Create post
    </div>
  )
}

function ForYou() {

  return (
    <div>
      ForYou
    </div>
  )
}

function Following() {

  return (
    <div>
      Following
    </div>
  )
}
