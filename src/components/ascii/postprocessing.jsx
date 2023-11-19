import React, { useContext, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { AsciiContext } from "@/components/ascii/context.js";
import { EffectComposer } from "@react-three/postprocessing";
import { ASCIIEffect } from "@/components/utils/ascii-effect/index.jsx";

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
      />
      {/*<DepthOfField*/}
      {/*  focusDistance={0}*/}
      {/*  focalLength={0.02}*/}
      {/*  bokehScale={2}*/}
      {/*  height={480}*/}
      {/*/>*/}
      {/*/!*<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />*!/*/}
      {/*<Noise opacity={0.1} />*/}
      {/*<Vignette eskil={false} offset={0.1} darkness={1.1} />*/}
    </EffectComposer>
  );
}
