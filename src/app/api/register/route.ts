import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/utils/authUtils";

type UserCredentials = {
  username: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {

  const prisma = new PrismaClient();

  const { username, email, password }: UserCredentials = await req.json();

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    return NextResponse.json({
      message: 'Invalid input - Password should be at least 7 characters long.',
    })
  }
  
  const hashedPassword = await hashPassword(password)
  
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: 'Internal server error'
    }, {
        status: 500,
    })
  }
}
