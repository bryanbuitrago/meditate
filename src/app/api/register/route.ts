import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

type UserCredentials = {
  username: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest, res: NextResponse) {

  const prisma = new PrismaClient();

  const { username, email, password }: UserCredentials = await req.json();
  console.log('credentials=', username, email, password);
  
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: 'Internal server error'
    }, {
        status: 500,
    })
  }
}
