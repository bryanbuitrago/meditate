// === 2nd Version ===
import { getJournalByID } from "@/app/actions/journal/journalActions";
import SingleJournal from "@/app/components/journal/SingleJournal";

type JournalType = {
    journalID: string;
}

async function SingleJournalPage({ params } : {params: JournalType} ) {

    const journal = await getJournalByID(params)
    const { title, text, id } = journal
    return (

        <SingleJournal title={title} text={text} id={id} />
    )
}
export default SingleJournalPage