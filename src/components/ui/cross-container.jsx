import { cn } from "@/components/utils/classnames";
import { Cross } from "./cross";

export default function CrossContainer({ children, className }) {
  return (
    <div className="relative z-50">
      <div className="top-0 flex w-full items-center justify-between">
        <Cross />
        <Cross />
        <Cross />
      </div>
      <div className={cn("", className)}>{children}</div>

      <div className="bottom-0 flex w-full items-center justify-between">
        <Cross />
        <Cross />
        <Cross />
      </div>
    </div>
  );
}
