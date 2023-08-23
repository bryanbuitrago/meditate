import prisma from '../../../lib/prismadb'


type UserID = {
    userID?: string 
}

type IdType = {
    journalID: string
}

// Get all journals
export async function getJournals(params: any ) {

    try {

        const { userID }   = params

        let query: any = {}

        if(userID) {
            query.userID = userID
        }

        const journals = await prisma.journal.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const journalsList = journals.map((journal) => ({
            ...journal,
            createdAt: journal.createdAt.toISOString(),
        }))
        
        return journalsList
    }
    catch( error: any) {
        return null   
    }
    
}

// Get a single journal
export async function getJournalByID(params: IdType) {

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

// Get last submitted journal
export async function getLastSubmittedJournal() {

    try {
        const lastJournal = await prisma.journal.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return lastJournal
    } catch (error: any) {
        console.log('Error fetching the last submitted journal: ', error)
    }
    
}