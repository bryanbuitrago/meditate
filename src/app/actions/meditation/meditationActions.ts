import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";

type MeditationTypes = {
    // user?: string
    userId?: string
}

type IdType = {
    meditationID?: string
}

// Get all meditations
export async function getMeditations(params: MeditationTypes) {
    const prisma = new PrismaClient()
    try {

        const userId  = params

        let query: any = {}

        if(userId) {
            query.userId = userId
        }

        const meditations = await prisma.meditation.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const meditationList = meditations.map((meditation) => ({
            ...meditation,
            createdAt: meditation.createdAt.toISOString(),
        }))
        
        return meditationList
    }
    catch( error: any) {
        return null   
    }
    
}

// Get a single meditation
export async function getMeditationByID(params: IdType) {
    const prisma = new PrismaClient()
    try {
        const { meditationID } = params

        const meditation = await prisma.meditation.findUnique({
            where: {
                id: meditationID,
            }, 
            include: {
                user: true
            }
        })

        if(!meditation) {
            return null
        }

        return {
            ...meditation,
            createdAt: meditation.createdAt.toString()
        }
        
    }
    catch( error: any) {
        return null   
    }
    
}