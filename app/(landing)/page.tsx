import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, CreditCard, DollarSign, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage your{" "}
                    <span className="bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
                      expenses
                    </span>{" "}
                    with ease, focus on your{" "}
                    <span className="underline decoration-cyan-600 decoration-4 underline-offset-4">freelance</span>{" "}
                    work
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The all-in-one expense management platform designed specifically for freelancers to track, organize,
                    and optimize their finances.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700" asChild>
                    <Link href="/sign-in">
                      Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/dashboard.png"
                  width={800}
                  height={600}
                  alt="FreelancePRO Dashboard"
                  className="rounded-2xl border shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-cyan-100 px-3 py-1 text-sm text-cyan-600 dark:bg-cyan-900/30">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything you need to{" "}
                  <span className="relative">
                    <span className="relative z-10">manage</span>
                    <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-cyan-200 dark:bg-cyan-800/60"></span>
                  </span>{" "}
                  your finances
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform simplifies expense tracking, invoicing, and financial reporting so you can focus on what
                  you do best.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Expense Tracking</h3>
                  <p className="text-muted-foreground">
                    Automatically categorize and track all your business expenses in one place.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Financial Reports</h3>
                  <p className="text-muted-foreground">
                    Generate detailed reports to understand your financial health at a glance.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Secure Storage</h3>
                  <p className="text-muted-foreground">
                    Keep all your financial documents and receipts securely stored in the cloud.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-cyan-100 px-3 py-1 text-sm text-cyan-600 dark:bg-cyan-900/30">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Trusted by{" "}
                  <span className="bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
                    freelancers
                  </span>{" "}
                  worldwide
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  See what other freelancers are saying about how FreelancePRO has transformed their financial
                  management.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex gap-0.5 text-cyan-600">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    &rdquo;FreelancePRO has completely changed how I manage my finances. I used to spend hours each month
                    organizing receipts and tracking expenses. Now it&apos;s all automated!&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Graphic Designer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex gap-0.5 text-cyan-600">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    &rdquo;The tax preparation features alone are worth the subscription. I saved so much time and stress
                    during tax season, and the reports helped me identify deductions I would have missed.&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Web Developer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex gap-0.5 text-cyan-600">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    &rdquo;As someone who juggles multiple clients, FreelancePRO has been a game-changer. I can easily track
                    expenses by project and client, making invoicing so much simpler.&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div>
                    <p className="font-medium">Emma Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Marketing Consultant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-cyan-600 py-20 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to <span className="underline decoration-white decoration-4 underline-offset-4">transform</span>{" "}
                  how you manage your freelance finances?
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed">
                  Join thousands of freelancers who have simplified their expense management and taken control of their
                  finances.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:justify-center">
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100" asChild>
                    <Link href="/sign-in">
                      Start for free now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {/* <p className="text-sm text-white/80">No credit card required. 14-day free trial.</p> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-12 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-cyan-600" />
                <span className="text-xl font-bold">FreelancePRO</span>
              </div>
              <p className="max-w-[400px] text-muted-foreground">
                Simplifying expense management for freelancers worldwide. Track, organize, and optimize your finances
                with ease.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-cyan-600">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FreelancePRO. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

