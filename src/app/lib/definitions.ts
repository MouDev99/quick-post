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
