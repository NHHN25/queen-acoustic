import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Employee Credentials",
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
              email: credentials.email
            },
            select: {
              id: true,
              email: true,
              password: true,
            },
          });

          if (!employee?.password) {
            throw new Error("Invalid credentials");
          }

          const isValid = await compare(credentials.password, employee.password);

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: employee.id,
            email: employee.email,
            role: 'EMPLOYEE'
          };
        } catch (error) {
          throw new Error("Authentication error");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
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
