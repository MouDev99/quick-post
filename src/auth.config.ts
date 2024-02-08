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
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      return session // The return type will match the one returned in `useSession()`
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
