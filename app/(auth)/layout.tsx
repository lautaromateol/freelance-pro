type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {children}
    </main>
  )
}
