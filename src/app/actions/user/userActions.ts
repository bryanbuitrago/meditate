import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import prisma from '../../../lib/prismadb'

export default async function getCurrentUser() {

    try {
        const serverSession = await getServerSession(authOptions)

        if(!serverSession?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: serverSession.user.email as string,
            }
        })

        if(!currentUser) {
            return null
        }

        return  {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
        }
    }
    catch( error: any) {
        return null   
    }
    
}