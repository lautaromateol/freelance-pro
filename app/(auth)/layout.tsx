import Image from "next/image"

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        {children}
      </div>
      <div className="hidden lg:flex w-full min-h-screen items-center justify-center bg-shade">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={70}
            height={70}
          />
          <h1 className="ml-2 text-5xl font-extrabold italic text-tint">
            freelancepro
          </h1>
        </div>
      </div>
    </div>
  )
}
