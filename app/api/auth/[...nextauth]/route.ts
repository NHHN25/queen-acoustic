import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  debug: false, // Disable debug mode in production
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const employee = await prisma.employee.findUnique({
            where: {
              email: credentials.email.toLowerCase()
            }
          });

          if (!employee) {
            console.log("No employee found");
            return null;
          }

          const passwordValid = await compare(
            credentials.password,
            employee.password
          );

          if (!passwordValid) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: employee.id,
            email: employee.email,
            role: 'EMPLOYEE'
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Verify the user exists in DB before adding to token
        const employee = await prisma.employee.findUnique({
          where: { id: user.id },
          select: { id: true }
        });

        if (employee) {
          token.id = employee.id;
          token.role = 'EMPLOYEE';
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = 'EMPLOYEE';
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
