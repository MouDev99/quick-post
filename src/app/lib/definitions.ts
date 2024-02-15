export type UserType = {
  id: number;
  username: string;
  email: string;
  hashedpassword: string;
  userProfileUrl: string | null
};

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
  likedByUsers: any[];
  bookmarkedByUsers: any[]
};

export type PostState = {
  errors?: {
    content?: string[] | null;
  },
  success?: boolean
}
