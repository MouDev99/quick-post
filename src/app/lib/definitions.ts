export type UserType = {
  id: number;
  username: string;
  email: string;
  hashedpassword: string;
  userProfileUrl: string | null
  joinedAt: Date
};

export type SessionUserType = {
  id?: string | undefined;
  name?: string | null | undefined,
  email?: string | null | undefined,
  image?: string | null | undefined
}

export type SignUpState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export type PostType = {
  id: string,
  imgUrl: string | null,
  content: string | null,
  createdAt: Date
  userId: number,
  username: string,
  email: string,
  userProfileUrl: string | null,
  numOfLikes: string,
  numOfCmnts: string,
  likedByUsers: any[];
  bookmarkedByUsers: any[]
};

export type PostState = {
  errors?: {
    content?: string[] | null;
    dbError?: string[]
  },
  success?: boolean
}

export type CommentType = {
  id: number,
  userid: number,
  content: string
  createdAt: Date
  username: string,
  userProfileUrl: string
}

export type CommentState = {
  errors?: {
    content?: string[] | null;
  },
  message?: string
  success?: boolean
}

export type UserProfileDetailsType = {
  id: number,
  username: string,
  profileUrl: string,
  joinedAt: Date,
  numOfPosts: string,
  numOfFollowers: string,
  numOfFollowing: string,
}
