export default function LandingPage() {
  return (
    <section className="flex items-center justify-center py-28 md:py-44">
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-y-4">
        <div className="w-3/4 md:w-full lg:w-1/2 text-center font-semibold text-base mx-auto bg-shade text-tint px-4 py-2 rounded-md shadow">
          #1&apos;s freelancing expenses management APP
        </div>
        <h1 className="pb-2 text-center text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-main to-tint">
          Manage your expenses in an efficient way with FreelancePRO
        </h1>
        <p className="text-center text-tint">Manage your expenses, projects, track relevant information and more effortlesly</p>
      </div>
    </section>
  )
}