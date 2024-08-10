import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { signout } from '@/actions/auth/signout'
import { signin } from '@/actions/auth/signin'

export default async function Navbar() {
    const session = await auth()
  return (
    <nav className='flex justify-between items-center py-4 px-4 shadow-md'>
        <div>
            <Link className='font-bold text-2xl' href="/">Reddit</Link>
        </div>
        <div>
            {
                session?.user ? (
                    <form action={signout}>
                        <Button>
                            Logout
                        </Button>
                    </form>
                ): (
                    <form action={signin}>
                        <Button>Login</Button>
                    </form>
                )
            }
        </div>
    </nav>
  )
}
