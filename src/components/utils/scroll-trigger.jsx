import { useProgress } from "@/lib/store";
import { useScroll } from "@react-three/drei";
import { useEffect } from "react";

export const ScrollTrigger = () => {
  const { scrollTo } = useProgress();

  const scroll = useScroll();

  // console.log("rerender");

  useEffect(() => {
    scroll.el.scrollTo({
      top: scrollTo,
      behavior: "instant",
    });
  }, [scrollTo]);

  return <></>;
};
