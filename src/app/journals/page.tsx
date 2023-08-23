import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { getJournals } from '../actions/journal/journalActions';
import JournalsList from '../components/journal/JournalsList';

async function JournalHistory() {

  const session = await getServerSession(authOptions)
  console.log('[Session] = ', session)
  if(!session) {
    return <div>Error or loading...</div>
  }

  const userID = session?.user?.id

  if(!userID) {
    return <div>Something wrong or loading...</div>
  }

  const journals = await getJournals(userID)
  if (!journals || !journals.length) {
    return <div>No journal entries found</div>
  }

  console.log('[JournalEntries Data]= ', journals)
  return (
    <JournalsList journals={journals} />
  );
};

export default JournalHistory;