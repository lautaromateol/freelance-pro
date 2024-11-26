import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function SignUpPage() {

  return (
    <>
      <ClerkLoaded>
        <SignUp path="/sign-up" />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-4 animate-spin text-shade" />
      </ClerkLoading>
    </>
  )
}
