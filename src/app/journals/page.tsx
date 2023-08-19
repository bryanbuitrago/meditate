import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { getJournals } from '../actions/journal/journalActions';
import JournalEntriesList from '../components/journal/JournalList';

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