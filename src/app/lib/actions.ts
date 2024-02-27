'use server';

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from "zod";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import {CommentState, PostState, SignUpState } from './definitions';
import { revalidatePath } from 'next/cache';
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

export async function signUp(prevState: SignUpState, formData: FormData): Promise<any> {

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

export async function createPostAction(
  prevState: PostState, formData: FormData
): Promise<PostState> {

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

  revalidatePath('/home');

  return {success: true};
}

export async function likeOrDislikePost(
  action: "like" | "dislike",
  userId: number | undefined,
  postId: string
) {

  const likeQuery = `
    INSERT INTO likes (userId, postId)
    VAlUES (${userId}, '${postId}')
  `;
  const dislikeQuery = `
    DELETE FROM likes
    WHERE userId = ${userId} AND postId = '${postId}'
  `;

  let query;
  if (action === "like") query = likeQuery;
  else if (action === "dislike") query = dislikeQuery;

  if (!query) return;

  try {
    await sql.query(query);
  } catch(error) {
    console.error(error)
  }

  revalidatePath("/[username]", "page");

  return {success: true}
}

export async function addOrRemoveFromBookmarks(
  action: "add" | "remove",
  userId: number | undefined,
  postId: string
) {
  const addQuery = `
    INSERT INTO bookmarks (userId, postId)
    VAlUES (${userId}, '${postId}')
  `;
  const removeQuery = `
    DELETE FROM bookmarks
    WHERE userId = ${userId} AND postId = '${postId}'
  `;

  let query;
  if (action === "add") query = addQuery;
  else if (action === "remove") query = removeQuery;

  if (!query) return;

  try {
    await sql.query(query);
    return {success: true}
  } catch(error) {
    console.error(error)
  }

}

const CommentSchema = z.object({
  content: z.string()
    .min(5, { message: 'comment must be at least 5 chars long.' })
    .max(300, { message: 'comment must be at most 300 chars long.' }),
});

export async function CreateCommentAction(
  postId: string,
  userId: string | undefined,
  prevState: CommentState,
  formData: FormData
): Promise<CommentState> {

  if (!postId || !userId) {
    return {message: 'Something went Wrong!'}
  }

  const validatedFields = CommentSchema.safeParse({
    content: formData.get("content")?.toString().trim(),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { content } = validatedFields.data;
  const userIdInteger = parseInt(userId);

  try {
    await sql`
      INSERT INTO comments (userid, postid, content)
      VALUES (${userIdInteger}, ${postId}, ${content})
    `;
  } catch (error) {
    console.error(error)
    return {
      message: 'Error: Failed to comment.'
    };
  }

  revalidatePath('/posts/[postId]');

  return {success: true}
}

export async function followOrUnfollowUser(
  action: "follow" | "unfollow",
  followerId: number | undefined,
  userId: number
) {
  const followQuery = `
    INSERT INTO followers (user_id, follower_id)
    VALUES (${userId}, ${followerId})
  `;
  const unfollowQuery = `
    DELETE FROM followers
    WHERE user_id = ${userId} AND follower_id = ${followerId}
  `;

  let query;
  if (action === 'follow') query = followQuery;
  else if (action === 'unfollow') query = unfollowQuery;

  if (!query) return;

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/[username]", "page");

  return {success: true}
}

export async function ClearAllBookmarksAction(userId: number) {
  try {
    await sql`
      DELETE FROM bookmarks
      WHERE userid = ${userId}
    `;

  } catch (error) {
    console.error(error);
    return
  }

  revalidatePath("/bookmarks")
  return {success: true}
}
