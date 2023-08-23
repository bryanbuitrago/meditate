import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions"
import { getMeditations } from "../actions/meditation/meditationActions"
import MeditationsList from "../components/meditation/MeditationsList"


async function MeditationsPage() {

  const session = await getServerSession(authOptions)
  console.log('[Session] = ', session)
  
  if(!session) {
    return <div>Error or loading...</div>
  }

  const userID = session?.user?.id

  if(!userID) {
    return <div>Something wrong or loading...</div>
  }


  const meditations = await getMeditations(userID)
  if (!meditations || !meditations.length) {
    return <div>No Meditation entries found</div>
  }

  console.log('[MeditationsList Data]= ', meditations)

  return ( 
     <MeditationsList meditations={meditations} />
  );
}

export default MeditationsPage;


