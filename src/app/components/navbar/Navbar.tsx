'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";



// Receive current user as prop
function Navbar({ currentUser }) {
    return (
        <header>
            <div>{currentUser?.name}</div>

            <div>
                <Link href='/meditation-journal'>Journal</Link>
                <Link href='/journals'>Journals</Link>
                <Link href='/meditation-timer'>Timer</Link>
                <Link href='/meditation-history'>Timer History</Link>
                <Link href='/dashboard'>Dashboard</Link>
                {
                    currentUser ? 
                        <button onClick={() => signOut()}>Sign out</button>
                    :
                        <Link href='/register'>Register</Link>
                }
            </div>
        </header>
    );
}

export default Navbar;