import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions"
import { getMeditations } from "../actions/meditation/meditationActions"
// import MeditationSessionList from "../components/meditation/MeditationsList"
import MeditationsList from "../components/meditation/MeditationsList"


async function MeditationsPage() {

// Server Route protection
  const session = await getServerSession(authOptions)
  console.log('[Session] = ', session)

  const { id } = session?.user

  const meditationEntries = await getMeditations(id)

  console.log('Meditations Data', meditationEntries)

  return ( 
     <MeditationsList meditations={meditationEntries} />
  );
}

export default MeditationsPage;


