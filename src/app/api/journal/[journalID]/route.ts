import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/user/userActions";
import { Prisma, PrismaClient } from "@prisma/client";

type JournalIdType = {
    journalID?: string
}

export async function PUT(
    request: Request, {params}: {
        params: JournalIdType}
        ) {
            const prisma = new PrismaClient()
            const { journalID } = params
            const json = await request.json()
            const user = await getCurrentUser() 

            if(!user) {
                return NextResponse.error()
            }

            if(!journalID || typeof journalID !== 'string') {
                throw new Error('Invalid ID')
            }

            const updatedJournal = await prisma.journal.update({
                where: {
                    id: journalID
                },
                data: json
            })

            return NextResponse.json(updatedJournal)
}


export async function DELETE(
    request: Request, 
    { params }: { params: JournalIdType}
) {
    const prisma = new PrismaClient()
    const user = await getCurrentUser()
    
    if(!user) {
        return NextResponse.error()
    }

    const { journalID } = params

    if(!journalID || journalID !== 'string') {
        throw new Error('Invalid ID.')
    }

    const deletedJournal = await prisma.journal.deleteMany({
        where: {
            id: journalID,
            userId: user.id
        }
    })

    return NextResponse.json(deletedJournal)
}
