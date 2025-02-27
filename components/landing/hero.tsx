export function Hero() {
  return (
    <section className="flex items-center justify-center py-20 md:py-44">
      <div className="w-full lg:w-1/2 mx-auto flex flex-col gap-y-4 px-4 lg:px-0">
        <div className="w-full lg:w-1/2 text-center font-semibold text-sm md:text-base lg:mx-auto bg-cyan-100/80 text-tint md:px-4 md:py-2 rounded-md shadow">
          #1&apos;s freelancing expenses management APP
        </div>
        <h1 className="pb-2 text-center text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-cyan-900">
          Manage your expenses in an efficient way with FreelancePRO
        </h1>
      </div>
    </section>
  )
}
