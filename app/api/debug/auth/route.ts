import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "No user ID in session" }, { status: 401 });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: userId },
      select: { id: true, email: true }
    });

    return NextResponse.json({
      session,
      employee,
      debug: {
        userId,
        employeeFound: !!employee,
        idType: typeof userId
      }
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
