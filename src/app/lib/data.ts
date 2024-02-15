'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { PostType } from './definitions';

export async function fetchPosts() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const query = `
      SELECT
        posts.*,
        users.email,
        users.username,
        users."userProfileUrl",
        ARRAY_AGG(DISTINCT likes.userId) AS "likedByUsers",
        ARRAY_AGG(DISTINCT bookmarks.userId) AS "bookmarkedByUsers",
        COUNT(likes.userId) AS "numOfLikes"
      FROM
        posts
      JOIN
        users ON posts."userId" = users.id
      LEFT JOIN
        likes ON posts.id = likes.postId
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
  noStore();
  try {
    const query = `
      SELECT
        posts.*,
        users.email,
        users.username,
        users."userProfileUrl",
        ARRAY_AGG(likes.userId) AS "likedByUsers",
        ARRAY_AGG(bookmarks.userId) AS "bookmarkedByUsers",
        COUNT(likes.userId) AS "numOfLikes"
      FROM
        posts
      JOIN
        users on posts."userId" = users.id
      LEFT JOIN
        likes ON posts.id = likes.postId
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
