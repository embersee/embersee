import { useProgress } from "@/lib/store";
import { Edge } from "./edge";
import { useRef, useState, useEffect } from "react";

function padWithLeadingZeros(num, totalLength) {
  return String(Math.round(num * 100)).padStart(totalLength, "0");
}

export default function Progress() {
  const {
    pages,
    progress,
    setProgress,
    setInteract,
    scrollControlsRef,
    setScrollTo,
  } = useProgress();
  const [isDragging, setIsDragging] = useState(false);

  const progressBarRef = useRef(null); // useRef for the progress bar container
  const scrollerRef = useRef(null); // useRef for the scroller
  // const scrollerCurrentRef = useRef(null); // useRef for the current pos scroller

  // const handleMouseDown = (e) => {
  //   setInteract(true);
  //   setIsDragging(true);

  //   const offsetY = e.clientY - scrollerRef.current.getBoundingClientRect().top;
  //   scrollerRef.current.setAttribute("data-offset-y", offsetY); // Store the offset in the element
  // };

  // const handleMouseMove = (e) => {
  //   if (!isDragging || !progressBarRef.current) return;

  //   const offsetY = parseFloat(
  //     scrollerRef.current.getAttribute("data-offset-y"),
  //   );
  //   const relativeY =
  //     e.clientY - progressBarRef.current.getBoundingClientRect().top - offsetY;

  //   let newProgress = relativeY / progressBarRef.current.clientHeight;
  //   newProgress = Math.max(0, Math.min(newProgress, 1));

  //   setProgress(newProgress);
  //   // Calculate the Y-offset in pixels
  //   updateScrollContainer(newProgress);
  // };

  // const updateScrollContainer = (newProgress) => {
  //   const yOffset = newProgress * scrollControlsRef.clientHeight;
  //   // Update the offset of the Scroll container
  //   setScrollTo(yOffset);
  // };

  // const handleMouseUp = () => {
  //   setInteract(false);
  //   setIsDragging(false);
  // };

  // useEffect(() => {
  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [isDragging]); // Re-run the effect only if isDragging changes

  // // const translateYValue =
  // //   currentProgress * progressBarRef.current?.clientHeight || 0;

  return (
    <div className="absolute right-0 top-[25vh] hidden select-none sm:block">
      <div className="relative mr-1">
        <div className=" absolute top-0 flex w-full justify-between ">
          <Edge />
          <Edge className="rotate-90" />
        </div>
        <div className="absolute bottom-0 flex h-full w-full justify-center pt-[24px]">
          <div className="flex flex-col justify-between">
            {Array.from(Array(pages - 1).fill(0)).map((v, i) => (
              <div key={i}>...</div>
            ))}

            {/* <div className="">.</div>
            <div className="">.</div> */}
          </div>
        </div>
        <div className=" h-[50vh] p-1" ref={progressBarRef}>
          <div
            className=" relative cursor-grab select-none rounded-[1px] p-1 text-xs text-accent outline outline-1 outline-accent backdrop-blur-sm active:cursor-grabbing"
            style={{
              top: `${progress * 100}%`,
            }}
            // onMouseDown={handleMouseDown}
            ref={scrollerRef}
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
