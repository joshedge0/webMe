'use client'

import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import SignInDialog from "@/components/SignInDialog"

export default function SignInButton() {
  const { data: session } = useSession()
  const [showDialog, setShowDialog] = useState(false)

  if (session) {
    return (
      <div>
        <p>{session.user?.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }

  return (
    <>
      <button onClick={() => setShowDialog(true)}>Sign In</button>
      {showDialog && (
        <SignInDialog onClose={() => setShowDialog(false)} />
      )}
    </>
  )
}