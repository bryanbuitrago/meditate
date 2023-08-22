import DashBoard from "../components/dashboard/DashBoard";
import { getLastSubmittedJournal } from "../actions/journal/journalActions"
import { getLastMeditationSession } from "../actions/meditation/meditationActions"

export default async function DashBoardPage() {
    
    const journal = await getLastSubmittedJournal()
    const meditation = await getLastMeditationSession()

    return (
            <DashBoard journal={journal} meditation={meditation} />
    );
}