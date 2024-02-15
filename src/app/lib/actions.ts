'use server';

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from "zod";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import {PostState, SignUpState } from './definitions';
// ...

const FormSchema = z.object({
  id: z.number(),
  username: z.string().min(5, {message: 'Username must be 5+ characters.'}),
  email: z.string().email({
    message: 'Please type a valid email',
  }),
  password: z.string().min(6, {message: 'Password must be 6+ characters.'}),
  confirmPassword: z.string(),
  userProfileUrl: z.string().nullable()
});

const SignUpUser = FormSchema.omit({id: true, confirmPassword: true});

export async function signUp(prevState: SignUpState, formData: FormData) {

  const validatedFields = SignUpUser.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    userProfileUrl: formData.get('userProfileUrl')
  });

  const state = {errors: {}, message: ''};

  if (!validatedFields.success) {
    state.errors = validatedFields.error.flatten().fieldErrors;
    state.message = 'Missing Fields. Failed to Sign Up.';
  }

  const passwordsMatch =
    String(formData.get('password')) === String(formData.get('confirmPassword'));
  if (!passwordsMatch) {
    state.errors = {
      ...state.errors,
      confirmPassword: ["Passwords don't match."],
    }
    state.message = 'Missing Fields. Failed to Sign Up.';
  }

  if (!passwordsMatch || !validatedFields.success) return state;

  const {username, email, password, userProfileUrl} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
    INSERT INTO users (username, email, hashedpassword, "userProfileUrl")
    VALUES (${username}, ${email}, ${hashedPassword}, ${userProfileUrl})
    `
  } catch (error) {
    console.error(error)
    return {
      message: 'Database Error: Failed to sign up.',
      errors: {}
    };
  }

  // sign in the user after account creation
  await signIn("credentials", {username, password, redirect: false})
  // then redirect them to '/home';
  redirect('/home');

  return {};
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const PostSchema = z.object({
  userId: z.number(),
  content: z.string()
    .min(1, { message: 'text must be at least 1 char long.' })
    .max(300, { message: 'text must be at most 300 chars long.' }),
  imgUrl: z.string().nullable(),
});

export async function createPostAction(prevState: PostState, formData: FormData) {

  const validatedFields = PostSchema.safeParse({
    userId: parseInt(formData.get('userId')?.toString() ?? '0'),
    content: formData.get("content"),
    imgUrl: formData.get("imgUrl"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const {userId, content, imgUrl} = validatedFields.data;
  try {
    await sql`
    INSERT INTO posts ("userId", content, "imgUrl")
    VALUES (${userId}, ${content}, ${imgUrl})
    `
  } catch (error) {
    console.error(error)
    return {
      errors: {
        dbError: ['Database Error: Failed to post.']
      },
    };
  }

  return {success: true};
}

export async function likeOrDislikePost(
  action: string,
  userId: number | undefined,
  postId: string
) {

  if (action === 'like') {
    try {
      await sql`
        INSERT INTO likes (userId, postId)
        VAlUES(${userId}, ${postId})
      `;
      return {success: true}
    } catch(error) {
      console.error(error)
    }
  } else if (action === 'dislike') {
    try {
      await sql`
        DELETE FROM likes
        WHERE userId=${userId} AND postId=${postId}
      `;
      return {success: true}
    } catch(error) {
      console.error(error)
    }
  }
}

export async function addOrRemoveFromBookmarks(
  action: string,
  userId: number | undefined,
  postId: string
) {

  if (action === 'add') {
    try {
      await sql`
        INSERT INTO bookmarks (userId, postId)
        VAlUES(${userId}, ${postId})
      `;
      return {success: true}
    } catch(error) {
      console.error(error)
    }
  } else if (action === 'remove') {
    try {
      await sql`
        DELETE FROM bookmarks
        WHERE userId=${userId} AND postId=${postId}
      `;
      return {success: true}
    } catch(error) {
      console.error(error)
    }
  }
}
