import prisma from '../../../lib/prismadb'


type MeditationTypes = {
    userID?: string
}

type IdType = {
    meditationID: string
}

// Get all meditation sessions
export async function getMeditations(params: any) {

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
            startDateTime: meditation.startDateTime.toISOString(),
        }))
        
        return meditationList
    }
    catch( error: any) {
        return null   
    }
    
}

// Get a single meditation
export async function getMeditationByID(params: IdType) {

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

        return meditation
        
    }
    catch( error: any) {
        return null   
    }
    
}

// Get Last meditation session
export async function getLastMeditationSession() {
    
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