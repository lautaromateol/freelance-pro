import { IconType } from "react-icons";
import { Separator } from "../ui/separator";

interface FeatureCardProps {
  title: string;
  icon: IconType;
  description: string;
}

export function FeatureCard({ title, icon, description }: FeatureCardProps) {

  const Icon = icon

  return (
    <div className="bg-cyan-100/50 p-4 rounded-md flex flex-col gap-y-2 shadow-sm">
      <div className="flex items-center gap-x-2">
        <div className="grid place-content-center rounded-full size-12 p-4 bg-cyan-100">
          <Icon className="size-6 text-cyan-500" />
        </div>
        <p className="text-xl font-semibold antialised text-cyan-700">{title}</p>
      </div>
      <Separator className="w-full text-cyan-400" />
      <p className="text-base font-medium antialised">{description}</p>
    </div>
  )
}
