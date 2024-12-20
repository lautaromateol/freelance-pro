"use client"
import Link from "next/link";
import { Logo } from "@/components/logo";

export function NavBar() {

  return (
    <>
      <header className="sticky top-0 bg-white flex items-center justify-between w-full h-14 px-4 py-6">
        <Logo />
        <ul className="md:flex items-center gap-x-4 text-sm font-medium text-main">
          <Link href="/sign-in">
            <li className="px-2 py-1 rounded-md bg-gradient-to-r from-main to-tint text-white hover:bg-tint">
              Sign in
            </li>
          </Link>
        </ul>
      </header>
    </>
  )
}