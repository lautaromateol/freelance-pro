import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <Hero />
      <Separator className="w-full" />
      <Features />
    </div>
  )
}