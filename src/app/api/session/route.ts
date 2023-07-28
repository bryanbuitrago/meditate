import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { format, parse} from "date-fns";



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

  try {
    const meditationSession = await prisma.meditation.create({
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
      data: { meditations: { connect: { id: meditationSession.id } } },
    });
    return NextResponse.json({ meditationSession, updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: 'Internal server error'
    }, {
        status: 500,
    })
  }
}