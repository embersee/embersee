import { OrbitControls, useContextBridge } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import cn from "clsx";
import { ASCIIEffect } from "@/components/utils/ascii-effect/index";
import { FontEditor } from "@/components/utils/font-editor";
import { useControls } from "leva";
import { text } from "@/lib/leva/text";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimationMixer, Group, MeshNormalMaterial } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import tunnel from "tunnel-rat";
import { AsciiContext } from "./context";
import { GUI } from "@/components/utils/gui";

const ui = tunnel();

function Scene() {
  const ref = useRef();

  const [asset, setAsset] = useState("/dragonfly.glb");

  const gltfLoader = useMemo(() => {
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://cdn.jsdelivr.net/npm/three@0.140.0/examples/js/libs/draco/",
    );
    loader.setDRACOLoader(dracoLoader);

    return loader;
  }, []);

  const [mixer, setMixer] = useState();

  useFrame((_, t) => {
    mixer?.update(t);
  });

  const gltf = useMemo(() => {
    if (!asset) return;
    let src = asset;

    if (
      src.startsWith("data:application/octet-stream;base64") ||
      src.includes(".glb")
    ) {
      const group = new Group();

      gltfLoader.load(src, ({ scene, animations }) => {
        const mixer = new AnimationMixer(scene);
        setMixer(mixer);
        const clips = animations;

        clips.forEach((clip) => {
          mixer.clipAction(clip).play();
        });

        group.add(scene);
        scene.traverse((mesh) => {
          mesh.material = new MeshNormalMaterial();
        });
      });

      return group;
    }
  }, [asset]);

  const { viewport, camera } = useThree();

  camera.position.set(500, 550, 1500);

  camera.updateProjectionMatrix();

  const { set } = useContext(AsciiContext);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      let scrollTop = window.scrollY;
      let docHeight = document.body.offsetHeight;
      let winHeight = window.innerHeight;
      let scrollPercent = scrollTop / (docHeight - winHeight);
      let scrollPercentRounded = Math.round(scrollPercent * 100);
      setOffset(scrollPercentRounded / 100);
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // console.log(offset);
  set({ time: offset });

  return (
    <>
      <group ref={ref}>
        {gltf && (
          <>
            <OrbitControls enabled={false} autoRotate enableZoom={false} />

            <group scale={200}>
              <primitive object={gltf} />
            </group>
          </>
        )}
      </group>
    </>
  );
}

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
  console.log("background", background);

  return (
    <EffectComposer>
      <ASCIIEffect
        charactersTexture={charactersTexture}
        granularity={granularity * viewport.dpr}
        charactersLimit={charactersLimit}
        fillPixels={fillPixels}
        color={color}
        fit={fit}
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
              powerPreference: "high-performance",
            }}
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
  characters: " . */^e.m.b.r",
  granularity: 8,
  charactersLimit: 12,
  fontSize: 72,
  fillPixels: false,
  setColor: false,
  color: "#ffffff",
  background: "#000000",
  greyscale: false,
  invert: false,
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
      fit,
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
      fit: {
        value: initialUrlParams.get("fit") || DEFAULT.fit,
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
          fit,
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
