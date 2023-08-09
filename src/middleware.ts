import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
export { default } from 'next-auth/middleware'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
    matcher: ['/journal-history']
}

