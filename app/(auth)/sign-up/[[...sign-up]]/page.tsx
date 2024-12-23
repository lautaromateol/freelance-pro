"use client"
import { Logo } from "@/components/logo";
import { SignUp, useSignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {

  const { isLoaded } = useSignUp()

  if (isLoaded) {
    return (
      <div className="flex flex-col items-center rounded-md bg-white shadow-md px-2 py-6 min-h-56">
        <Logo />
        <SignUp appearance={{
          elements: {
            card: {
              paddingTop: "8px",
              boxShadow: "none",
              border: "none"
            },
            cardBox: {
              boxShadow: "none",
              border: "none"
            },
            footer: {
              display: "none"
            }
          }
        }} />
        <Link href="/sign-in" className="text-sm text-neutral-500 underline">
          Already registered? Sign in now
        </Link>
      </div>
    )
  }

  return null
}
