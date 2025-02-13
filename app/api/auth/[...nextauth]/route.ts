import NextAuth, { Session } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcryptjs';
import { z } from 'zod';
import type { User } from '@prisma/client';
import type { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient();

// Validation schema for credentials
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          const parsedCredentials = credentialsSchema.parse(credentials);
          
          // Authenticate with CUKCUK API
          const cukcukAuth = await authenticateWithCukCuk(
            parsedCredentials.email,
            parsedCredentials.password
          );

          if (!cukcukAuth) return null;

          // Find or create user in local database
          let user = await prisma.user.findUnique({
            where: {
              email: parsedCredentials.email
            }
          });

          if (!user) return null;

          const isPasswordValid = await compare(
            parsedCredentials.password,
            user.password
          );

          if (!isPasswordValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
