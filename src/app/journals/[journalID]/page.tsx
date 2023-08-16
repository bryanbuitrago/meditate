// === 2nd Version ===

import SingleJournal from "@/app/(components)/journal/SingleJournal";
import { getJournalByID } from "@/app/actions/journal/journalActions";
import UpdateJournal from "@/app/(components)/journal/UpdateJournal";

type JournalType = {
    journalID: string;
}

async function SingleJournalPage({ params } : {params: JournalType} ) {

    const journal = await getJournalByID(params)
    const { title, text, id } = journal
    return (
        // <SingleJournal title={title} text={text}/>
        <UpdateJournal title={title} text={text} id={id} />

    )
}
export default SingleJournalPage


// === 1st Version ===
// import { getJournalByID } from "@/app/actions/journal/journalActions";


// type JournalType = {
//     journalID: string
// }


// async function SingleJournal({ params } : { params: JournalType }) {

// const journal = await getJournalByID(params)

//     return (
//         <div>
//             Single Journal Page
//             <h1>{journal?.title}</h1>
//             <p>{journal?.text}</p>
//         </div>
//     );
// }

// export default SingleJournal;