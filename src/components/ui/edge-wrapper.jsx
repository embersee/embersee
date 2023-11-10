import { cn } from "@/components/utils/classnames";
import { Edge } from "./edge";

export default function EdgeWrapper({ children, className }) {
  return (
    <div className="group relative z-50 flex flex-col items-center justify-center">
      <div className=" group-hover:text-accent absolute top-0 flex w-full justify-between transition-colors delay-100 ">
        <Edge />
        <Edge className="rotate-90" />
      </div>

      <div className={cn("", className)}>{children}</div>

      <div className="group-hover:text-accent absolute bottom-0 flex w-full justify-between  transition-colors delay-100">
        <Edge className="-rotate-90" />
        <Edge className="rotate-180" />
      </div>
    </div>
  );
}
