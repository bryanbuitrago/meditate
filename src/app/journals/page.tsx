import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { getJournals } from '../actions/journal/journalActions';
import JournalsList from '../components/journal/JournalsList';

type Session = {
  user: {
    id: string
  }
}

type JournalTypes = {
  // Define the structure of a journal entry
  // Example:
  id: string;
  title: string;
  text: string;
  userId: string
  createdAt: string;
  // ... other properties
};

async function JournalHistory() {

  const session = await getServerSession(authOptions)
  console.log('[Session] = ', session)
  if(!session) {
    return <div>Error or loading...</div>
  }
  const { user } = session

  const { id } = user

  // const JournalEntries = await getJournals(userId)

  const journals = await getJournals(id)

  console.log('[JournalEntries Data]= ', journals)
  return (
    <JournalsList journals={journals} />
  );
};

export default JournalHistory;