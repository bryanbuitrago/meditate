'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import JournalForm from '../components/JournalForm';

function JournalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    // Optional: Show a loading spinner or skeleton UI
    return <div>Loading...</div>;
  }

  if (!session) {
    // User is not authenticated, redirect to login page
    router.push('/');
    return null;
  }

  return (
    <div>
      <h1>Meditation Journal Page</h1>
      <JournalForm />
    </div>
  );
}

export default JournalPage;