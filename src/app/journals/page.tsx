// 'use client'

import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/utils/authOptions';
import { getJournals } from '../actions/journal/journalActions';
import JournalEntriesList from '../(components)/journal/JournalList';
// import Link from 'next/link';



// async function JournalEntriesList({ journals }) {
//   return(
//     <ul>
//       {journals.map(entry => (
//         <li key={entry.id}>
//             <Link href={`/journals/${entry.id}`}>
//             <h1>Title: {entry.title}</h1>
//             <p>Text: {entry.text}</p>
//         </Link>
//           </li>
//       ))}
//     </ul>
//   )
// }

async function JournalHistory() {

  const session = await getServerSession(authOptions)

  const { userId } = session?.user

  const JournalEntries = await getJournals(userId)

  console.log('JournalEntries Data', JournalEntries)
  return (
    <JournalEntriesList journals={JournalEntries} />
  );
};

export default JournalHistory;