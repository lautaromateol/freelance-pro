"use client"
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useUser } from "@clerk/nextjs";

export function NavBar() {

  const { isLoaded, isSignedIn } = useUser()

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between w-full h-14 px-4 py-6">
        <Logo />
        <ul className="md:flex items-center gap-x-4 text-sm font-medium text-main">
          {isLoaded && (
            <Link href={`${isSignedIn ? "/dashboard" : "/sign-in"}`}>
              <li className="px-2 py-1 rounded-md bg-gradient-to-r from-main to-tint text-white hover:bg-tint">
                {isSignedIn ? "Dashboard" : "Sign in"}
              </li>
            </Link>
          )}
        </ul>
      </header>
    </>
  )
}