import DashBoard from "../(components)/dashboard/DashBoard";
import UpdateJournal from '../(components)/journal/UpdateJournal';
import { getLastSubmittedJournal } from "../actions/journal/journalActions";

async function DashBoardPage() {
    const journal = await getLastSubmittedJournal()

    console.log('[Journal from DB]= ', journal)

    const { title, text, id } = journal

    return (
        <>
            <DashBoard />
            <UpdateJournal title={title} text={text} id={id} />
        </>
    );
}

export default DashBoardPage;