import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
export { default } from 'next-auth/middleware'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const token = await getToken({ req })

    if(!token) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: ['/journal', '/journals/:path*', '/timer', '/meditations/:path*', '/dashboard']
}

