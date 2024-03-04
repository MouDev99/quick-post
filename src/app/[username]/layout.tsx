import { auth } from "@/auth";
import { fetchUserProfileDetails } from "../lib/data";
import UserProfilePage from "../ui/user-profile-page";

export default async function Layout({
  children, params,
}: Readonly<{
  children: React.ReactNode;
  params: {username: string}
}>) {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  const username = params.username;

  const userDetails =
    await fetchUserProfileDetails(username, sessionUserId);

  if (!userDetails) return null;

  return (
    <div>
      <UserProfilePage
        userDetails={userDetails}
      />
      {children}
    </div>
  )
}
