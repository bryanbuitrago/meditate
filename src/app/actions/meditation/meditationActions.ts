import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";

type MeditationTypes = {
    // user?: string
    userID?: string
}

type IdType = {
    meditationID: string
}

// Get all meditation sessions
export async function getMeditations(params: MeditationTypes) {
    const prisma = new PrismaClient()
    try {

        const { userID } = params

        let query: any = {}

        if(userID) {
            query.userID = userID
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

// Get Last meditation session
export async function getLastMeditationSession() {
    const prisma = new PrismaClient()
    try {
        const lastMeditation = prisma.meditation.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return lastMeditation
    } catch (error: any) {
        console.log('Error fetching the last meditation session: ', error)
        return null
    }
}