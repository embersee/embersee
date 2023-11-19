import React, { useContext, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { AsciiContext } from "@/components/ascii/context";
import { EffectComposer } from "@react-three/postprocessing";
import { ASCIIEffect } from "@/components/utils/ascii-effect/index";

export function Postprocessing() {
  const { gl, viewport } = useThree();
  const { set } = useContext(AsciiContext);

  useEffect(() => {
    set({ canvas: gl.domElement });
  }, [gl]);

  const {
    charactersTexture,
    granularity,
    charactersLimit,
    fillPixels,
    color,
    greyscale,
    invert,
    matrix,
    time,
    background,
  } = useContext(AsciiContext);

  return (
    <EffectComposer>
      <ASCIIEffect
        charactersTexture={charactersTexture}
        granularity={granularity * viewport.dpr}
        charactersLimit={charactersLimit}
        fillPixels={fillPixels}
        color={color}
        fit={true}
        greyscale={greyscale}
        invert={invert}
        matrix={matrix}
        time={time}
        background={background}
      ></ASCIIEffect>
    </EffectComposer>
  );
}
