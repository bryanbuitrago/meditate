import { get } from "http";
import DashBoard from "../components/dashboard/DashBoard";
import SingleJournal from '../components/journal/SingleJournal';
import SingleMeditation from "../components/meditation/SingleMeditation";
import { getLastSubmittedJournal } from "../actions/journal/journalActions";
import { getLastMeditationSession } from "../actions/meditation/meditationActions";

async function DashBoardPage() {
    const journal = await getLastSubmittedJournal()
    const meditation = await getLastMeditationSession()


    console.log('[Journal from DB]= ', journal)
    console.log('[Meditation from DB= ', meditation)


    const { title, text, id } = journal

    return (
        <div>
            <DashBoard />
            <SingleJournal title={title} text={text} id={id} />
            <SingleMeditation meditation={meditation} />
        </div>
    );
}

export default DashBoardPage;