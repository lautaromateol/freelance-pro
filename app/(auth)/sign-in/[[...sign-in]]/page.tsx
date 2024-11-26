import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function SignInPage() {

  return (
    <>
      <ClerkLoaded>
        <SignIn path="/sign-in" />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-4 animate-spin text-shade" />
      </ClerkLoading>
    </>
  )
}
