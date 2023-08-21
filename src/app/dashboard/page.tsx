import DashBoard from "../components/dashboard/DashBoard";
import SingleJournal from '../components/journal/SingleJournal';
import SingleMeditation from "../components/meditation/SingleMeditation";
import { getLastSubmittedJournal } from "../actions/journal/journalActions";
import { getLastMeditationSession } from "../actions/meditation/meditationActions";

export default async function DashBoardPage() {
    
    const journal = await getLastSubmittedJournal()
    const meditation = await getLastMeditationSession()
    const { title, text, id, createdAt } = journal

    return (
        <div>
            <DashBoard />
            <SingleJournal title={title} text={text} id={id} createdAt={createdAt} />
            <SingleMeditation meditation={meditation} />
        </div>
    );
}