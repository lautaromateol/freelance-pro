"use client"
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function NavBar() {

  const { isLoaded, isSignedIn } = useUser()

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between w-full h-14 px-4 py-6">
        <Logo />
        <ul className="md:flex items-center gap-x-4 text-sm font-medium text-main">
          {isLoaded && (
            <Link href={`${isSignedIn ? "/dashboard" : "/sign-in"}`}>
              <Button size="sm" className="bg-gradient-to-b from-cyan-600 to-cyan-700 hover:from-cyan-600 hover:to-cyan-700 text-white hover:bg-tint">
                {isSignedIn ? "Dashboard" : "Sign in"}
              </Button>
            </Link>
          )}
        </ul>
      </header>
    </>
  )
}