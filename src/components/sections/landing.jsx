import React from "react";
import { Page } from "@/components/ui/page";
import Button from "@/components/ui/button";
import CrossContainer from "@/components/ui/cross-container";
import { vhToPixels } from "@/components/utils/animations/scrollHeight";

export default function Landing() {
  return (
    <Page className="flex flex-col items-center justify-center">
      <div className="">
        <p className="mb-2 text-2xl">Hey, my name is </p>

        <CrossContainer>
          <h1 className=" text-7xl leading-none tracking-tighter sm:text-[12em]">
            embersee
          </h1>
        </CrossContainer>

        <p className="mt-8 text-2xl">Creating Cutting-Edge Web Experiences</p>
        <p>
          Explore my world of dynamic websites, seamless automation, and
          immersive 3D graphics.
        </p>

        <div className="mt-5 text-2xl ">
          {/* <Button href="#work">View My Work</Button> */}
          <Button
            onClick={() => {
              window.scrollTo({ top: vhToPixels(100), behavior: "smooth" });
            }}
          >
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </Page>
  );
}
