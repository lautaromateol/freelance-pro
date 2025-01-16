import { FaCalendar, FaChartBar, FaFolder } from "react-icons/fa6";
import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <div className="flex justify-start w-[1280px] mx-auto pt-8 pb-6">
      <div className="w-full flex flex-col gap-y-4">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold uppercase text-cyan-600">Features</p>
          <h2 className="text-cyan-900 text-3xl font-bold antialised"> Manage your expenses, projects, track relevant information and more <i><u>effortlesly</u></i></h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <FeatureCard
            title="Powerful Analytics at Your Fingertips"
            description="Easily visualize your financial data with intuitive graphs and charts. Track your income, expenses, and trends to make informed decisions and optimize your freelance business."
            icon={FaChartBar}
          />
          <FeatureCard
            title="Seamless CSV Import"
            description="Save time by importing your transaction history in just a few clicks. Our system processes your CSV files effortlessly, so you can focus on what matters most."
            icon={FaFolder}
          />
          <FeatureCard
            title="Project Deadlines Calendar"
            description="Stay on top of your projects with a built-in calendar that highlights upcoming deadlines. Never miss a delivery date and manage your workload like a pro."
            icon={FaCalendar}
          />
        </div>
      </div>
    </div>
  )
}
