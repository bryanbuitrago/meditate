import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { format, parse, parseISO } from "date-fns";
import { start } from "repl";

type SessionFieldTypes = {
    time: number
    startDateTime: string
    email: string
};

export async function POST(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();

  const { time, startDateTime, email }: SessionFieldTypes = await req.json();
  console.log('startDateTime= ', startDateTime)
  console.log('startDateTime Typeof= ', typeof(startDateTime))
  console.log('Timer API Values= ', time, startDateTime, email)

  //   Save [Date/Time] As A String Format 
  const stringFormatDateTime = format(new Date(startDateTime), "yyyy-MM-dd HH:mm:ss");
  console.log('Formatted start time:', stringFormatDateTime);

  // Save [Date/Time] As Date Time Object Format
  const dateTimeFormat = parse(stringFormatDateTime, "yyyy-MM-dd HH:mm:ss", new Date());
  console.log('Type of parsed start time:', typeof dateTimeFormat);
  console.log('Parsed start time:', dateTimeFormat);

// const dateTimeFormat = new Date(stringFormatDateTime)
// console.log(typeof(dateTimeFormat))
// console.log(dateTimeFormat)
// console.log(parsedStartTimeDate)
// const parsedDateTime = parseISO(startTimeDate)
// console.log(parsedDateTime)



  try {
    const sessionEntry = await prisma.session.create({
      data: {
        time,
        startDateTime: dateTimeFormat,
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