'use server';

import { sql } from '@vercel/postgres';
import { PostType } from './definitions';

export async function fetchPosts() {

  try {
    const query = `
      SELECT
        posts.*,
        users.email,
        users.username,
        users."userProfileUrl",
        ARRAY_AGG(DISTINCT likes.userId) AS "likedByUsers",
        ARRAY_AGG(DISTINCT bookmarks.userId) AS "bookmarkedByUsers",
        COUNT(DISTINCT likes.userId) AS "numOfLikes",
        COUNT(DISTINCT comments.id) AS "numOfCmnts"
      FROM
        posts
      JOIN
        users ON posts."userId" = users.id
      LEFT JOIN
        likes ON posts.id = likes.postId
      LEFT JOIN
        comments ON posts.id = comments.postid
      LEFT JOIN (
        SELECT DISTINCT postId, userId
        FROM bookmarks
      ) AS bookmarks ON posts.id = bookmarks.postId
      GROUP BY
        posts.id, users.id
      ORDER BY
        posts."createdAt" DESC;
    `;
    const data = await sql.query<PostType[]>(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts data.');
  }
}

export const fetchPostById = async (id: string) => {

  try {
    const query = `
      SELECT
        posts.*,
        users.email,
        users.username,
        users."userProfileUrl",
        ARRAY_AGG(likes.userId) AS "likedByUsers",
        ARRAY_AGG(bookmarks.userId) AS "bookmarkedByUsers",
        COUNT(DISTINCT likes.userId) AS "numOfLikes",
        COUNT(DISTINCT comments.id) AS "numOfCmnts"
      FROM
        posts
      JOIN
        users on posts."userId" = users.id
      LEFT JOIN
        likes ON posts.id = likes.postId
      LEFT JOIN
        comments ON posts.id = comments.postid
      LEFT JOIN (
        SELECT DISTINCT postId, userId
        FROM bookmarks
      ) AS bookmarks ON posts.id = bookmarks.postId
      WHERE
        posts.id = '${id}'
      GROUP BY
        posts.id, users.id
    `;
    const data = await sql.query<PostType[]>(query);
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts data.');
  }
}

export async function fetchPostCommentsById(postId: string) {

  try {
    const query = `
    SELECT
      comments.content,
      comments."createdAt",
      users.username,
      users."userProfileUrl"
    FROM
      comments
    JOIN
      users ON comments.userid = users.id
    WHERE
      postid = '${postId}';
    `;
    const data = await sql.query(query);
    return data.rows
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments data.');
  }
}

export async function fetchUsersToFollow(userId: string | undefined) {

  if (!userId) [];

  try {
    const query = `
      SELECT
        id, username, "userProfileUrl", "createdAt"
      FROM
        users
      WHERE id NOT IN (
        SELECT users.id
        FROM followers
        JOIN
          users ON followers.user_id = users.id
        WHERE
          follower_id = ${userId}
     ) AND id != ${userId}`;
    const data = await sql.query(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users data.');
  }
}

export async function fetchFollowedUsersPosts(userId: string | undefined) {

  if (!userId) return [];

  try {
    const query = `
      SELECT
        posts.*,
        users.email,
        users.username,
        users."userProfileUrl",
        ARRAY_AGG(likes.userId) AS "likedByUsers",
        ARRAY_AGG(bookmarks.userId) AS "bookmarkedByUsers",
        COUNT(DISTINCT likes.userId) AS "numOfLikes",
        COUNT(DISTINCT comments.id) AS "numOfCmnts"
      FROM
        posts
      JOIN
        users on posts."userId" = users.id
      LEFT JOIN
        likes ON posts.id = likes.postId
      LEFT JOIN
        comments ON posts.id = comments.postid
      LEFT JOIN (
        SELECT DISTINCT postId, userId
        FROM bookmarks
      ) AS bookmarks ON posts.id = bookmarks.postId
      WHERE posts."userId" IN (
        SELECT user_id FROM followers
        WHERE follower_id = ${userId}
      )
      GROUP BY
        posts.id, users.id
      ORDER BY
        posts."createdAt" DESC;
      `;
    const data = await sql.query(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed to fetch followed users' posts.");
  }
}

export async function fetchBookmarkedPosts(userId: string | undefined) {

  if (!userId) return [];

  try {
    const query = `
      SELECT
        posts.*,
        users.email,
        users.username,
        users."userProfileUrl",
        ARRAY_AGG(likes.userId) AS "likedByUsers",
        ARRAY_AGG(bookmarks.userId) AS "bookmarkedByUsers",
        COUNT(DISTINCT likes.userId) AS "numOfLikes",
        COUNT(DISTINCT comments.id) AS "numOfCmnts"
     FROM
       posts
     JOIN
       users on posts."userId" = users.id
     LEFT JOIN
       likes ON posts.id = likes.postId
     LEFT JOIN
       comments ON posts.id = comments.postid
     LEFT JOIN (
       SELECT DISTINCT postId, userId
       FROM bookmarks
     ) AS bookmarks ON posts.id = bookmarks.postId

     WHERE
       bookmarks.userid = ${userId}
     GROUP BY
       posts.id, users.id
    `;
    const data = await sql.query(query);
    return data.rows;
  } catch(error) {
    console.error('Database Error:', error);
    throw new Error("Failed to fetch bookmarked posts.");
  }
}
