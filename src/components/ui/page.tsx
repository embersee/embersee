import { cn } from "../utils/classnames";
import { animated, useInView } from "@react-spring/web";
import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
};
export const Page = ({ children, className }: Props) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        scale: 0.7,
        opacity: 0,
        y: 200,
      },
      to: {
        scale: 1,
        opacity: 1,
        y: 0,
      },
    }),
    {
      rootMargin: "20% 0%",
    },
  );
  return (
    <animated.div ref={ref} style={springs} className={cn("page", className)}>
      {children}
    </animated.div>
  );
};
