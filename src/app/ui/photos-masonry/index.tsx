'use client';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Image from "next/image";
import Link from "next/link";

export default function PhotosMasonry(
  {photos}:
  {photos: {postId: string, imgUrl: string}[]}
) {

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 450: 2}}
    >
      <Masonry gutter="4px">
        {photos.map(photo => {
          return (
            <Link
              key={photo.imgUrl}
              href={`/post/${photo.postId}`}
            >
              <Image
                width={245}
                height={45}
                src={photo.imgUrl}
                className="w-full h-fit rounded-md"
                alt="photo"
              />
            </Link>
          )
        })}
      </Masonry>
    </ResponsiveMasonry>
  )
}
