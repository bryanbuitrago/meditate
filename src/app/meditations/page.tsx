import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions"
import { getMeditations } from "../actions/meditation/meditationActions"
import MeditationSessionList from "../components/meditation/MeditationsList"


async function JourneyPage() {

// Server Route protection
  const session = await getServerSession(authOptions)
  console.log('[Session] = ', session)

  const { id } = session?.user

  console.log('User ID ', id)

  const meditationEntries = await getMeditations(id)

  console.log('Meditations Data', meditationEntries)

  return ( 
      <div>

          <h1>Meditation Journey Page/History </h1>
          <MeditationSessionList meditations={meditationEntries} />
      </div>
  );
}

export default JourneyPage;


