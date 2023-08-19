'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import JournalForm from '../components/journal/JournalForm';
import LoadingSpinner from '../components/LoadingSpinner';

function JournalPage() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === 'loading') {
  //   // Optional: Show a loading spinner or skeleton UI
  //   // return <div>Loading...</div>;
  //   return <LoadingSpinner />
  // }

  // if (!session) {
  //   // User is not authenticated, redirect to login page
  //   router.push('/');
  //   return null;
  // }

  return (
    <div>
      <h1>Meditation Journal Page</h1>
      <JournalForm />
    </div>
  );
}

export default JournalPage;