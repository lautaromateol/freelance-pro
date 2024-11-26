"use client";
import { Logo } from "@/components/logo";
import { SignIn, useSignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {

  const { isLoaded } = useSignIn()

  if(isLoaded) {
    return (
      <div className="flex flex-col items-center rounded-md shadow-md px-2 py-6">
        <Logo />
        <SignIn appearance={{
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
        <Link href="/sign-up" className="text-sm text-neutral-500 underline">
          Don&apos;t you have an account? Sign up now
        </Link>
      </div>
    )
  }

  return null

}
