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
        users."userProfileUrl"
      FROM
        posts
      JOIN
        users ON posts."userId" = users.id
      ORDER BY "createdAt" DESC;
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
        users."userProfileUrl"
      FROM
        posts
      JOIN
        users on posts."userId" = users.id
      WHERE
        posts.id = '${id}'
    `;
    const data = await sql.query<PostType[]>(query);
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts data.');
  }
}
