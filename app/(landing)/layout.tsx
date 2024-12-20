import { NavBar } from "@/components/nav-bar";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>
        {children}
      </main>
    </>
  )
}