import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isNotOnHomePage = nextUrl.pathname !== '/';

      if (isNotOnHomePage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to home page so they can log in
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/feed', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;