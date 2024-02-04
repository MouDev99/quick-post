
import PostCard from "../post-card/post-card";

const posts = [
  {
    id: 'W-iT4BSs7LUOI435r-7giOQy+Mpi0A3DCZEPkJe7WR0',
    content: `February will be filled with love
      February will be filled with peace
      February will be filled with healing
      February will be filled with progress
      February will be filled with blessings
      February will be filled with happiness
      February will be filled with opportunity
      `,
    imgUrl: null,
    user: {
      id: 1,
      username: 'Demo-User',
      profileImgUrl: null
    },
    comments: [

    ],
    numOfShares: 21,
    numOfLikes: 34,
    createdAt: new Date()
  },
  {
    id: 'W-iT4BSs7LUOI435r-7giOQy+Mpi0A3DCZEPkJe7WR0',
    content: `February will be filled with love
      February will be filled with peace
      February will be filled with healing
      February will be filled with progress
      February will be filled with blessings
      February will be filled with happiness
      February will be filled with opportunity`,
    imgUrl: null,
    user: {
      id: 1,
      username: 'Demo-User',
      profileImgUrl: null
    },
    comments: [

    ],
    numOfShares: 21,
    numOfLikes: 34,
    createdAt: new Date()
  },
  {
    id: 'W-iT4BSs7LUOI435r-7giOQy+Mpi0A3DCZEPkJe7WR0',
    content: `February will be filled with love
      February will be filled with peace
      February will be filled with healing
      February will be filled with progress
      February will be filled with blessings
      February will be filled with happiness
      February will be filled with opportunity`,
    imgUrl: null,
    user: {
      id: 1,
      username: 'Demo-User',
      profileImgUrl: null
    },
    comments: [

    ],
    numOfShares: 21,
    numOfLikes: 34,
    createdAt: new Date()
  },
  {
    id: 'W-iT4BSs7LUOI435r-7giOQy+Mpi0A3DCZEPkJe7WR0',
    content: `February will be filled with love
      February will be filled with peace
      February will be filled with healing
      February will be filled with progress
      February will be filled with blessings
      February will be filled with happiness
      February will be filled with opportunity`,
    imgUrl: null,
    user: {
      id: 1,
      username: 'Demo-User',
      profileImgUrl: null
    },
    comments: [

    ],
    numOfShares: 21,
    numOfLikes: 34,
    createdAt: new Date()
  },
  {
    id: 'W-iT4BSs7LUOI435r-7giOQy+Mpi0A3DCZEPkJe7WR0',
    content: `February will be filled with love
      February will be filled with peace
      February will be filled with healing
      February will be filled with progress
      February will be filled with blessings
      February will be filled with happiness
      February will be filled with opportunity`,
    imgUrl: null,
    user: {
      id: 1,
      username: 'Demo-User',
      profileImgUrl: null
    },
    comments: [

    ],
    numOfShares: 21,
    numOfLikes: 34,
    createdAt: new Date()
  },
  {
    id: 'W-iT4BSs7LUOI435r-7giOQy+Mpi0A3DCZEPkJe7WR0',
    content: `February will be filled with love
      February will be filled with peace
      February will be filled with healing
      February will be filled with progress
      February will be filled with blessings
      February will be filled with happiness
      February will be filled with opportunity`,
    imgUrl: null,
    user: {
      id: 1,
      username: 'Demo-User',
      profileImgUrl: null
    },
    comments: [

    ],
    numOfShares: 21,
    numOfLikes: 34,
    createdAt: new Date()
  },
  {
    id: 'W-iT4BSs7LUOI435r-7giOQy+Mpi0A3DCZEPkJe7WR0',
    content: `February will be filled with love
      February will be filled with peace
      February will be filled with healing
      February will be filled with progress
      February will be filled with blessings
      February will be filled with happiness
      February will be filled with opportunity`,
    imgUrl: null,
    user: {
      id: 1,
      username: 'Demo-User',
      profileImgUrl: null
    },
    comments: [

    ],
    numOfShares: 21,
    numOfLikes: 34,
    createdAt: new Date()
  }
]

export default function ForYou() {

  return (
    <div className="h-fit mt-4">
      {posts.map((post, i) => <PostCard key={i} idx={i} post={post} /> )}
    </div>
  )
}
