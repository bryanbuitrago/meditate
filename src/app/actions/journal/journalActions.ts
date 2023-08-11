import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";

type JournalTypes = {
    // user?: string
    userId?: string
}

type IdType = {
    journalID: string
}

// Get all journals
export async function getJournals(params: JournalTypes) {
    const prisma = new PrismaClient()
    try {

        const userId  = params

        let query: any = {}

        if(userId) {
            query.userId = userId
        }

        const journals = await prisma.journal.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const journalList = journals.map((journal) => ({
            ...journal,
            createdAt: journal.createdAt.toISOString(),
        }))
        
        return journalList
    }
    catch( error: any) {
        return null   
    }
    
}

// Get a single journal
export async function getJournalByID(params: IdType) {
    const prisma = new PrismaClient()
    try {
        const { journalID } = params

        const journal = await prisma.journal.findUnique({
            where: {
                id: journalID,
            }
        })

        if(!journal) {
            return null
        }

        return journal
        
    }
    catch( error: any) {
        return null   
    }
    
}
