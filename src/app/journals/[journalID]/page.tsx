// === 2nd Version ===
import { getJournalByID } from "@/app/actions/journal/journalActions";
import SingleJournal from "@/app/components/journal/SingleJournal";

type ParamsJournalID = {
    journalID: string;
}

type Journal = {
    id: string
    title: string
    text: string
    createdAt: Date
}

async function SingleJournalPage({ params } : {params: ParamsJournalID} ) {

    const journal: Journal | null = await getJournalByID(params)

    if(!journal) {
        return <div>Loading or error message... </div>
    }

    // Format the createdAt Date object to a string
    const formatCreatedAt = journal.createdAt.toISOString()
    return (

        <SingleJournal 
            title={journal.title} 
            text={journal.text} 
            id={journal.id} 
            createdAt={formatCreatedAt} 
        />
    )
}
export default SingleJournalPage