'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";



// Receive current user as prop
function Navbar({ currentUser }) {
    return (
        <header>
            <div>{currentUser?.name}</div>

            <div>
                <Link href='/dashboard'>Home</Link>
                <Link href='/meditation-journal'>Journal</Link>
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