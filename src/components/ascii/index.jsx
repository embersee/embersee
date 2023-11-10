import {
  OrbitControls,
  useContextBridge,
  ScrollControls,
  useScroll,
  Scroll,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { ASCIIEffect } from "@/components/utils/ascii-effect/index";
import { FontEditor } from "@/components/utils/font-editor";
import { useControls } from "leva";
import { text } from "@/lib/leva/text";
import { useGui, useProgress } from "@/lib/store";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Group, MeshNormalMaterial, MathUtils } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import tunnel from "tunnel-rat";
import { AsciiContext } from "./context";
import { GUI } from "@/components/utils/gui";

import { Page } from "@/components/ui/page";
import Landing from "@/components/sections/landing";
import ContactForm from "@/components/sections/contact-form";

const ui = tunnel();

function Scene() {
  const { gui } = useGui();
  const { setProgress } = useProgress();

  const src = "/Porsche_Carrera_GT_2003.glb";

  const gltfLoader = useMemo(() => {
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);

    return loader;
  }, []);

  const gltf = useMemo(() => {
    const group = new Group();

    gltfLoader.load(src, ({ scene }) => {
      group.add(scene);
      scene.traverse((mesh) => {
        mesh.material = new MeshNormalMaterial();
      });
    });

    return group;
  }, [src]);

  const { camera } = useThree();

  const defCamera = {
    x: 1500,
    y: 550,
    z: 1500,
  };

  camera.position.set(defCamera.x, defCamera.y, defCamera.z);

  const { set } = useContext(AsciiContext);

  const group = useRef();
  const model = useRef();

  const scroll = useScroll();

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
    set({ greyscale: false });
  }

  useFrame((state, delta) => {
    const r0 = scroll.range(0 / 5, 0.8 / 5);
    const r1 = scroll.range(0.8 / 5, 1.5 / 5, 0.05);
    const r2 = scroll.range(2 / 5, 1 / 5, 0.05);
    const r3 = scroll.range(3 / 5, 1 / 5);
    const r4 = scroll.range(4 / 5, 1 / 5, 0.01); // matrix state
    const r5 = scroll.range(4.5 / 5, 0.5 / 5); // dissolving stage
    const fullRange = scroll.range(0 / 5, 5 / 5);

    setProgress(fullRange);

    // Break down each rotation component
    const r1Rotation = Math.PI - (Math.PI / 2) * rsqw(r1);
    const r2Rotation = r2 * (Math.PI - Math.PI / 2) * rsqw(r2);
    const r3Rotation = r3 * (Math.PI * rsqw(r3)) + r4;

    // Combine all components for the final rotation value
    model.current.rotation.y = r1Rotation - r2Rotation - r3Rotation;

    let targetScale = 1 + 0.54 * (1 - rsqw(r2) + r3 * 2); // Adjust this as per your zoom out requirement

    const dampenedScale = MathUtils.damp(
      group.current.scale.z,
      targetScale,
      4,
      delta,
    );

    group.current.scale.x = dampenedScale;
    group.current.scale.y = dampenedScale;
    group.current.scale.z = dampenedScale;

    set({
      time: r4 + (1 - r0),
      charactersLimit:
        r0 * DEFAULT.charactersLimit - //fade in
        r5 * DEFAULT.charactersLimit, //fade out
    });
  });

  return (
    <>
      <group ref={group}>
        <OrbitControls enable={gui} enableRotate={gui} enableZoom={false} />

        <group ref={model} scale={200} position={-100}>
          <primitive object={gltf} />
        </group>
      </group>
    </>
  );
}

const rsqw = (t, delta = 0.2, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

function Postprocessing() {
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
    </EffectComposer>
  );
}

function Inner() {
  const ContextBridge = useContextBridge(AsciiContext);
  const pages = 4;
  return (
    <>
      <div className="ascii">
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
              powerPreference: "low-power",
            }}
            className="canvas-el"
          >
            <ScrollControls
              pages={pages}
              className="scroll-controls"
              maxSpeed={0.4}
            >
              <ContextBridge>
                <Scene />
                <Postprocessing />
              </ContextBridge>
              <Scroll className="w-full" html>
                <Landing />

                <Page />
                <Page />

                <ContactForm />
              </Scroll>
            </ScrollControls>
          </Canvas>
        </div>
      </div>
      <FontEditor />
      <ui.Out />
    </>
  );
}

const DEFAULT = {
  characters: " . */^$#",
  granularity: 7,
  charactersLimit: 12,
  fontSize: 86,
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
