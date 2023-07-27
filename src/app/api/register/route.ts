import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { hashPassword } from "@/utils/authUtils";

type UserCredentials = {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const prisma = new PrismaClient();

  const { username, email, password }: UserCredentials = await req.json();

  // Validate user data
  if (
      !email || 
      !email.includes('@') || 
      !password ||
      password.trim().length < 7
     ) 
    {
    return NextResponse.json({
      message: 'Invalid input - Password should be at least 7 characters long.',
    }, {
      status: 422
    });
  }

  // Check if user exists in DB
  const isUserInDB: User | null = await prisma.user.findUnique({
    where: {
      email
    }
  });

  // If user exists throw an error
  if(isUserInDB) {
    return NextResponse.json({
      message: 'User already exists!',
    }, {
      status: 422
    });
  }

  // Hash password 
  const hashedPassword: string = await hashPassword(password);

  // Attempt to create user in DB 
  try {
    const user: User = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      },
    });
    // User successfully created
    return NextResponse.json({
      message: 'User successfully created!'
    }, {
      status: 201
    });
    
    // Server Error
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error'
    }, {
      status: 500,
    });
  }
}