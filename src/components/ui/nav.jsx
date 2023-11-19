import React from "react";
import Button from "./button";
import { FadeInWhenVisible } from "@/components/utils/animations/FadeInWhenVisible";

export const Nav = () => {
  return (
    <FadeInWhenVisible>
      <div className="absolute top-0 flex w-full justify-between p-2 text-lg">
        <Button href="/">embersee</Button>

        <div className="flex space-x-4">
          <Button href="/about">about</Button>

          <Button href="/about">contact</Button>
        </div>
      </div>
    </FadeInWhenVisible>
  );
};
