import EdgeWrapper from "@/components/ui/edge-wrapper";
import { useEffect, useRef } from "react";

export default function Button({ href, blank, children, ...props }) {
  const buttonRef = useRef(null);

  function mouseMoveEvent(e) {
    const { x, y } = buttonRef.current.getBoundingClientRect();
    buttonRef.current.style.setProperty("--x", e.clientX - x);
    buttonRef.current.style.setProperty("--y", e.clientY - y);
  }

  useEffect(() => {
    if (buttonRef) {
      buttonRef.current.addEventListener("mousemove", mouseMoveEvent);
    }

    return () =>
      buttonRef.current.removeEventListener("mousemove", mouseMoveEvent);
  }, [buttonRef]);

  return (
    <button ref={buttonRef} type="button" {...props} className="button shiny">
      <a href={href} target={blank && "_blank"}>
        <EdgeWrapper className="p-2 px-4">
          <span className="link ">{children}</span>
        </EdgeWrapper>
      </a>
    </button>
  );
}
