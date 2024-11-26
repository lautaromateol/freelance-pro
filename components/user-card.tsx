"use client"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { Skeleton } from "./ui/skeleton"

export function UserCard() {

  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-x-2 px-2 mt-6">
        <Skeleton className="rounded-full size-10" />
        <div className="space-y-0.5">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-28 h-4" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-x-2 px-2 mt-6">
      <Image
        src={user?.imageUrl || ""}
        alt={user?.firstName || ""}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="space-y-0">
        <p className="text-sm">{user?.firstName} {user?.lastName}</p>
        <p className="text-xs text-neutral-500">{user?.emailAddresses[0].emailAddress}</p>
      </div>
    </div>
  )
}
