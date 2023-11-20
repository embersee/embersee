import React, { useMemo, useState } from "react";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FontEditor } from "@/components/utils/font-editor";
import { useControls } from "leva";
import { text } from "@/lib/leva/text";
import tunnel from "tunnel-rat";
import { AsciiContext } from "./context";
import { GUI } from "@/components/utils/gui";
import { Scene } from "@/components/ascii/scene";
import { useGui } from "@/lib/store";
import { cn } from "@/components/utils/classnames";
import { Postprocessing } from "./postprocessing";

const ui = tunnel();

function Inner() {
  const ContextBridge = useContextBridge(AsciiContext);
  const { loading } = useGui();
  return (
    <>
      <div className={cn("flex h-screen", !loading && "hidden")}>
        <GUI />
        <div className="canvas">
          <Canvas
            flat
            linear
            orthographic
            camera={{ position: [0, 0, 500], near: 0.1, far: 10000 }}
            resize={{ debounce: 100 }}
            gl={{
              antialias: true,
              alpha: true,
              depth: false,
              stencil: false,
              powerPreference: "high-performance",
            }}
            className="canvas-el"
          >
            <ContextBridge>
              <Scene />
              <Postprocessing />
            </ContextBridge>
          </Canvas>
        </div>
      </div>
      <FontEditor />
      <ui.Out />
    </>
  );
}

const DEFAULT = {
  characters: " . *e$^/",
  granularity: 8,
  charactersLimit: 11,
  fontSize: 66,
  fillPixels: false,
  setColor: false,
  color: "#ffffff",
  background: "#000000",
  greyscale: true,
  invert: true,
  matrix: true,
  setTime: true,
  time: 0,
  fit: true,
};

export function ASCII() {
  const initialUrlParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  const [charactersTexture, setCharactersTexture] = useState(null);

  const [
    {
      characters,
      granularity,
      charactersLimit,
      fontSize,
      fillPixels,
      setColor,
      color,
      greyscale,
      invert,
      matrix,
      setTime,
      time,
      background,
    },
    _set,
  ] = useControls(
    () => ({
      characters: text(
        initialUrlParams.get("characters") || DEFAULT.characters,
      ),
      granularity: {
        min: 4,
        max: 32,
        value: initialUrlParams.get("granularity") || DEFAULT.granularity,
        step: 1,
        label: "granularity",
      },
      charactersLimit: {
        min: 1,
        max: 48,
        value:
          initialUrlParams.get("charactersLimit") || DEFAULT.charactersLimit,
        step: 1,
        label: "charLimit",
      },
      fontSize: {
        min: 1,
        max: 128,
        value: initialUrlParams.get("fontSize") || DEFAULT.fontSize,
        step: 1,
        label: "font size",
      },
      greyscale: {
        value:
          initialUrlParams.get("greyscale") === "true" || DEFAULT.greyscale,
      },
      invert: {
        value: initialUrlParams.get("invert") === "true" || DEFAULT.invert,
      },
      fillPixels: {
        value:
          initialUrlParams.get("fillPixels") === "true" || DEFAULT.fillPixels,
        label: "fill pixels",
      },

      matrix: {
        value: initialUrlParams.get("matrix") === "true" || DEFAULT.matrix,
      },
      setTime: {
        value: !!initialUrlParams.get("time") || DEFAULT.setTime,
        label: "set time",
        render: (get) => get("matrix") === true,
      },
      time: {
        min: 0,
        value: parseFloat(initialUrlParams.get("time")) || DEFAULT.time,
        max: 1,
        step: 0.01,
        render: (get) => get("setTime") === true,
        // optional: true,
        // disabled: !initialUrlParams.get('time'),
      },

      setColor: {
        value: !!initialUrlParams.get("color") || DEFAULT.setColor,
        label: "set color",
      },
      color: {
        value: initialUrlParams.get("color")
          ? "#" + initialUrlParams.get("color")
          : DEFAULT.color,
        // optional: true,
        label: "color",
        render: (get) => get("setColor") === true,
        // disabled: !initialUrlParams.get('color'),
      },
      background: {
        value: initialUrlParams.get("background")
          ? "#" + initialUrlParams.get("background")
          : DEFAULT.background,
        // optional: true,
        label: "background",
      },
    }),
    [],
  );

  function set({ charactersTexture, canvas, ...props }) {
    if (charactersTexture) setCharactersTexture(charactersTexture);

    _set(props);
  }

  return (
    <>
      <AsciiContext.Provider
        value={{
          characters: characters,
          granularity,
          charactersTexture,
          charactersLimit,
          fontSize,
          fillPixels,
          color: setColor ? color : undefined,
          fit: true,
          greyscale,
          invert,
          matrix,
          time: setTime ? time : undefined,
          background,
          set,
        }}
      >
        <Inner />
      </AsciiContext.Provider>
    </>
  );
}
