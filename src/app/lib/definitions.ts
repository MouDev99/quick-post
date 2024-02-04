export type User = {
  id: number;
  username: string;
  email: string;
  hashedpassword: string;
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
  content: string,
  imgUrl: string | null,
  user: {
    id: number,
    username: string,
    profileImgUrl: string | null
  },
  comments: Object[],
  numOfShares: number,
  numOfLikes: number,
  createdAt: Date
}
