'use client';

import Header from "./user-profile-header";
import UserDetails from "./user-details";
import ProfileNav from "./profile-nav";
import { UserProfileDetailsType } from "@/app/lib/definitions";

export default function UserProfilePage(
  {userDetails}:
  {userDetails: UserProfileDetailsType}
) {
  const {username, numOfPosts} = userDetails;

  return (
    <div>
      <Header
        username={username}
        numOfPosts={numOfPosts}
      />
      <UserDetails
        userDetails={userDetails}
      />
      <ProfileNav
        username={username}
      />
    </div>
  )
}
