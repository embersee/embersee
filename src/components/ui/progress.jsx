import { useProgress } from "@/lib/store";

function padWithLeadingZeros(num, totalLength) {
  return String(Math.round(num * 100)).padStart(totalLength, "0");
}

export default function Progress() {
  const { progress } = useProgress();

  return (
    <div className="absolute right-0 top-[25vh] ">
      <div className="mr-1 h-[50vh]">
        <div
          className="relative select-none rounded-[2px] bg-emerald p-1 text-xs text-background"
          style={{ top: `${progress * 100}%` }}
        >
          {padWithLeadingZeros(progress, 3)}%
        </div>
      </div>
    </div>
  );
}
