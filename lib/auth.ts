import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const inputEmail = credentials.email.trim().toLowerCase();
        const inputPassword = credentials.password.trim();
        const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
        const adminPassword = (process.env.ADMIN_PASSWORD || "").trim();

        const isValidUser =
          inputEmail === adminEmail && inputPassword === adminPassword;

        if (isValidUser) {
          return {
            id: "1",
            name: "Admin",
            email: credentials.email.trim(),
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page path
  },
  session: {
    strategy: "jwt", // JSON Web Token strategy (stateless)
  },
  secret: process.env.NEXTAUTH_SECRET,
};