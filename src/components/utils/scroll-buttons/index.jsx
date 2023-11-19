import React from "react";
import Button from "@/components/ui/button";
import { useGui } from "@/lib/store";

export function BackToTop() {
  return (
    <Button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      Back to top
    </Button>
  );
}

export function EnableExperimentation() {
  const { gui, setGui } = useGui();
  return <Button onClick={() => setGui(!gui)}>Experimentation</Button>;
}
