import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

type JournalFieldTypes = {
  title: string;
  text: string;
  email: string; // Add the 'email' property to the JournalFieldTypes type
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
          connect: { email }, // Connect the journal entry to the user by their email
        },
      },
    });

    console.log(journalEntry)
    return NextResponse.json({ journalEntry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: 'Internal server error'
    }, {
        status: 500,
    })
  }
}



// import { NextResponse, type NextRequest } from "next/server";
// import { PrismaClient } from "@prisma/client";

// type JournalFieldTypes = {
//   title: string;
//   text: string;
// };

// export async function POST(req: NextRequest, res: NextResponse) {

//   const prisma = new PrismaClient();

//   const { title, text, }: JournalFieldTypes = await req.json();
//   console.log('credentials=', title, text) ;
  
//   try {

//     const journalEntry = await prisma.journal.create({
//       data: {

//         title,
//         text,
//       },
//     });

//     return NextResponse.json({ data });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//         message: 'Internal server error'
//     }, {
//         status: 500,
//     })
//   }
// }