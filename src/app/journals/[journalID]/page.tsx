// === 2nd Version ===
import { getJournalByID } from "@/app/actions/journal/journalActions";
import SingleJournal from "@/app/components/journal/SingleJournal";

type JournalType = {
    journalID: string;
}

async function SingleJournalPage({ params } : {params: JournalType} ) {

    const journal = await getJournalByID(params)
    console.log(journal)
    const { title, text, id, createdAt } = journal
    return (

        <SingleJournal 
            title={title} 
            text={text} 
            id={id} 
            createdAt={createdAt} 
        />
    )
}
export default SingleJournalPage