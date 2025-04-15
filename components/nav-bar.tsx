"use client"
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function NavBar() {

  const { isLoaded, isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-4">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-x-4">
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {isLoaded && (
              <Link href={`${isSignedIn ? "/dashboard" : "/sign-in"}`}>
                <Button size="sm" className="bg-gradient-to-b from-cyan-600 to-cyan-700 hover:from-cyan-600 hover:to-cyan-700 text-white hover:bg-tint">
                  {isSignedIn ? "Dashboard" : "Sign in"}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
