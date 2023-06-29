'use client'

import Timer from '../components/Timer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function TimerPage() {
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
            <h1>Meditation Timer Page</h1>
            <Timer />
        </div>
    );
}

export default TimerPage;