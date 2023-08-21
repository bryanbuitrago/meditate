'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import JournalForm from '../components/journal/JournalForm';
import LoadingSpinner from '../components/LoadingSpinner';

function JournalPage() {

  return (
    <div>
      <h1>Meditation Journal Page</h1>
      <JournalForm />
    </div>
  );
}

export default JournalPage;