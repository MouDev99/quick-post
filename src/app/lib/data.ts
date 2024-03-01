'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchPosts() {
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
    const data = await sql.query(query);
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
    const data = await sql.query(query);
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
        postid = '${postId}'
      ORDER BY
        comments."createdAt" DESC;
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
        id, username, "userProfileUrl", "joinedAt"
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
  noStore();

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
  noStore();

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

export async function fetchUserProfileDetails(username: string) {

  try {
    const numOfPostsPromise = sql`
      SELECT COUNT(posts.id)
      FROM posts
      JOIN users on posts."userId" = users.id
      WHERE users.username = ${username}`;

    const numOfFollowersPromise = sql`
      SELECT COUNT(followers.user_id) as "numOfFollowers"
      FROM followers
      JOIN users ON followers.user_id = users.id
      WHERE users.username = ${username};
    `;

    const numOfFollowingPromise = sql`
      SELECT COUNT(followers.follower_id) as "numOfFollowing"
      FROM followers
      JOIN users ON followers.follower_id = users.id
      WHERE users.username = ${username};
    `;

    const userInfoPromise = sql`
      SELECT id, username, "userProfileUrl", "joinedAt"
      FROM users
      WHERE username = ${username};
    `;

    const data = await Promise.all([
      numOfPostsPromise,
      numOfFollowersPromise,
      numOfFollowingPromise,
      userInfoPromise
    ]);

    const numOfPosts = data[0].rows[0].count;
    const numOfFollowers = data[1].rows[0].numOfFollowers;
    const numOfFollowing = data[2].rows[0].numOfFollowing;
    const userInfo = data[3].rows[0];
    return {
      numOfPosts,
      numOfFollowers,
      numOfFollowing,
      id: userInfo.id,
      username: userInfo.username,
      profileUrl: userInfo.userProfileUrl,
      joinedAt: userInfo.joinedAt
    }
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchUserPostsByUsername(username: string) {

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
       users.username = '${username}'
     GROUP BY
       posts.id, users.id
    `;
    const data = await sql.query(query);
    return data.rows;
  } catch(error) {
    console.error('Database Error:', error);
  }
  return [];
}

export async function fetchUserCommentsByUsername(username: string) {

  try {
    const query = `
      SELECT
        comments.content,
        comments.postid,
        comments."createdAt"
      FROM comments
      JOIN users  ON comments.userid = users.id
      JOIN posts ON comments.postid = posts.id
      WHERE users.username = '${username}';
    `;
    const data = await sql.query(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
  }
  return []
}

export async function fetchUserPhotosByUsername(username: string) {

  try {
    const query = `
      SELECT
        posts.id as "postId",
        posts."imgUrl"
      FROM posts
      JOIN users ON posts."userId" = users.id
      WHERE
        users.username = '${username}'
        AND posts."imgUrl" IS NOT NULl
    `;
    const data = await sql.query(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
  }
  return []
}

export async function fetchLikedPostsByUsername(username: string) {

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
      LEFT JOIN
          likes ON posts.id = likes.postid
      LEFT JOIN
          comments ON posts.id = comments.postid
      LEFT JOIN
          bookmarks ON posts.id = bookmarks.postId
      JOIN
          users ON posts."userId" = users.id
      JOIN
          likes AS userLikes ON posts.id = userLikes.postid
      JOIN
          users AS likedByUser ON userLikes.userid = likedByUser.id AND likedByUser.username = '${username}'
      GROUP BY
          users.id, posts.id
      ORDER BY
          posts."createdAt" DESC;
    `;
    const data = await sql.query(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error)
  }
  return []
}

export async function fetchFilteredUsers(searchQuery: string | undefined) {
  if (!searchQuery) return []

  try {
    const query = `
      SELECT * FROM users
      WHERE
        username ILIKE '%${searchQuery}%';
    `;
    const data = await sql.query(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error)
  }
  return []
}

export async function fetchFilteredPosts(searchQuery: string | undefined) {
  if (!searchQuery) return []

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
      FROM posts
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
        posts.content ILIKE '%${searchQuery}%'
      GROUP BY
        posts.id, users.id;
    `;
    const data = await sql.query(query);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error)
  }
  return []
}
