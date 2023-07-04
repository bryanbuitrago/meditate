import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

type JournalFieldTypes = {
  title: string;
  text: string;
  email: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();

  const { title, text, email }: JournalFieldTypes = await req.json();

  console.log('Journal API Values= ', title, text, email)

  try {
    const journalEntry = await prisma.journal.create({
      data: {
        title,
        text,
        user: {
          connect: { email },
        },
      },
    });

    // Update the user to include the journal entry ID in the 'journals' field
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { journals: { connect: { id: journalEntry.id } } },
    });

    const user = await prisma.user.findUnique({
      where: { email },
      include: { journals: true }
    })

    // const { journals } = user


    console.log(journalEntry)
    console.log('=================')
    console.log(user?.journals)
    return NextResponse.json({ journalEntry, updatedUser, user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: 'Internal server error'
    }, {
        status: 500,
    })
  }
}