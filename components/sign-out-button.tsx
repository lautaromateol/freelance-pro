"use client"
import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function SignOutButton() {

  const { signOut } = useClerk()

  return (
    <Button variant="outline" onClick={() => signOut({ redirectUrl: "/sign-in" })}>
      Sign out
    </Button>
  )
}
