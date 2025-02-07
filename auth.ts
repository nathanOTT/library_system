import NextAuth, { CredentialsSignin, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import drizzleDb from "./database/drizzle";
import { registration } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import { hash } from "bcryptjs";

class InvalidCredentialsError extends CredentialsSignin {
  constructor() {
    super("Invalid credentials")
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new InvalidCredentialsError()
        }
        const existingUser = await drizzleDb
          .select()
          .from(registration)
          .where(eq(registration.email, credentials.email.toString()))
          .execute();
        if (existingUser.length === 0) {
          return null
        }

        const isPaasswordValid = await compare(
          credentials.password.toString(),
          existingUser[0].password
        );
        if (!isPaasswordValid) {
          return null
        }

        return {
          id: existingUser[0].id,
          email: existingUser[0].email,
          name: existingUser[0].fullName,
          role: existingUser[0].role,
          status: existingUser[0].status,
        } as User

      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        return session
      }
      return session
    },
  },
})