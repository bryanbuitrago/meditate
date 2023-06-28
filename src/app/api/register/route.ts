
import { NextResponse } from "next/server";
// import 

export async function POST(req: Request, res: NextResponse) {
    const body = await req.json()
    console.log(body)

    return res.json({ body: string })
}
