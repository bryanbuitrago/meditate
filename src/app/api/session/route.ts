import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

type SessionFieldTypes = {
    time: number
    email: string
};

export async function POST(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();

  const { time, email }: SessionFieldTypes = await req.json();

  console.log('Timer API Values= ', time, email)

  try {
    const sessionEntry = await prisma.session.create({
      data: {
        time,
        user: {
          connect: { email },
        },
      },
    });

    // Update the user to include the journal entry ID in the 'journals' field
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { sessions: { connect: { id: sessionEntry.id } } },
    });

    const user = await prisma.user.findUnique({
      where: { email },
      include: { sessions: true }
    })


    console.log(sessionEntry)
    console.log('=================')
    console.log(user?.sessions)
    return NextResponse.json({ sessionEntry, updatedUser, user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: 'Internal server error'
    }, {
        status: 500,
    })
  }
}