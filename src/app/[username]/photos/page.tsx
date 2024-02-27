import { fetchUserPhotosByUsername } from "@/app/lib/data";
import PhotosMasonry from "@/app/ui/photos-masonry";

export default async function Page({params}: {params: {username: string}}) {
  const username = params.username;
  const photos = await fetchUserPhotosByUsername(username);

  return (
    <div className="px-1 py-2">
      <PhotosMasonry photos={photos} />
    </div>
  )
}
