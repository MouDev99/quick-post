import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { UserType } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';


export async function getUser(username: string): Promise<UserType | undefined> {
  try {
    const user = await sql<UserType>`SELECT * FROM users WHERE username=${username}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.hashedpassword);
          if (passwordsMatch) return {
            ...user,
            name: user.username,
            image: user.userprofileurl
          };
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
