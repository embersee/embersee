import { useProgress } from "@/lib/store";
import { Edge } from "./edge";

function padWithLeadingZeros(num, totalLength) {
  return String(Math.round(num * 100)).padStart(totalLength, "0");
}

export default function Progress() {
  const { progress } = useProgress();

  return (
    <div className="absolute right-0 top-[25vh] hidden sm:block">
      <div className="relative mr-1">
        <div className=" absolute top-0 flex w-full justify-between ">
          <Edge />
          <Edge className="rotate-90" />
        </div>
        <div className=" h-[50vh] p-1">
          <div
            className=" outline-accent text-accent relative select-none rounded-[1px] p-1 text-xs outline outline-1 backdrop-blur-sm"
            style={{ top: `${progress * 100}%` }}
          >
            {padWithLeadingZeros(progress, 3)}%
          </div>
        </div>
        <div className="absolute -bottom-[24px] flex w-full justify-between ">
          <Edge className="-rotate-90" />
          <Edge className="rotate-180" />
        </div>
      </div>
    </div>
  );
}
