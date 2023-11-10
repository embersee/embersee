import { cn } from "@/components/utils/classnames";
import { Edge } from "./edge";

export default function EdgeWrapper({ children, className }) {
  return (
    <div className="group relative z-50 flex flex-col items-center justify-center ">
      <div className="absolute top-0 flex w-full justify-between transition group-hover:translate-y-[2px] group-hover:text-accent ">
        <Edge className="transition group-hover:translate-x-[2px] " />
        <Edge className="rotate-90 transition group-hover:-translate-x-[2px] " />
      </div>

      <div className={cn("", className)}>{children}</div>

      <div className="absolute bottom-0 flex w-full justify-between transition group-hover:-translate-y-[2px] group-hover:text-accent ">
        <Edge className="-rotate-90 transition group-hover:translate-x-[2px]" />
        <Edge className="rotate-180 transition group-hover:-translate-x-[2px]" />
      </div>
    </div>
  );
}
