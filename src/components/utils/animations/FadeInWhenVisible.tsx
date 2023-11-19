import React, { ReactNode } from "react";
import { animated, useInView } from "@react-spring/web";

export const FadeInWhenVisible = ({ children }: { children: ReactNode }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        scale: 0.9,
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
    <animated.div ref={ref} style={springs}>
      {children}
    </animated.div>
  );
};
