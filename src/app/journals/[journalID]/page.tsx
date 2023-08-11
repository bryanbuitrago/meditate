
import { getJournalByID } from "@/app/actions/journal/journalActions";
import { Text } from '@chakra-ui/react';
import { useRouter } from "next/router";


type JournalType = {
    journalID: string
}


async function SingleJournal({ params } : { params: JournalType }) {

const journal = await getJournalByID(params)

    return (
        <div>
            Single Journal Page
            <h1>{journal?.title}</h1>
            <p>{journal?.text}</p>
        </div>
    );
}

export default SingleJournal;