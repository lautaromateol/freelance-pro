import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center"
    >
      <div className="relative size-8">
        <Image
          src="/logo.svg"
          fill
          className="object-cover"
          alt="FreelancePro logo"
        />
      </div>
    </Link>
  )
}