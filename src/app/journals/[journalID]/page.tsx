
import { getJournalByID } from "@/app/actions/journal/journalActions";
import { Text } from '@chakra-ui/react';
import { useRouter } from "next/router";


async function SingleJournal({ params: { journalID }}) {
// async function SingleJournal(props) {
//     console.log('[SingleJournalPage]: ', props)
// console.log(await getJournalByID(journalID))
const journal = await getJournalByID(journalID)

console.log('[Journal from DB] :', journal)

    // console.log('Journal ID', typeof(journalID))
    return (
        <div>
            Single Journal Page
            <h1>{journal?.title}</h1>
            <p>{journal?.text}</p>
            {/* <h1>{journal}</h1> */}
            {/* <h1>{journal?.title}</h1>
            <p>{journal?.text}</p>
            <p>{router.query.journalID}</p> */}
        </div>
    );
}

export default SingleJournal;