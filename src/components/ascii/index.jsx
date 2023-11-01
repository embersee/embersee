import {
  OrbitControls,
  useContextBridge,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { ASCIIEffect } from "@/components/utils/ascii-effect/index";
import { FontEditor } from "@/components/utils/font-editor";
import { useControls } from "leva";
import { text } from "@/lib/leva/text";
import { useGui } from "@/lib/store";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimationMixer,
  Group,
  LoadingManager,
  MeshNormalMaterial,
  MathUtils,
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import tunnel from "tunnel-rat";
import { AsciiContext } from "./context";
import { GUI } from "@/components/utils/gui";

const ui = tunnel();

function Scene() {
  const ref = useRef();

  const { gui } = useGui();

  const [asset, setAsset] = useState("/Porsche_Carrera_GT_2003.glb");

  const loadingManager = new LoadingManager();

  loadingManager.onStart = (url) => {
    console.log("started: ", url);
  };

  loadingManager.onProgress = (url, loaded, total) => {
    const progressBar = document.getElementById("progress-bar");

    progressBar.value = (loaded / total) * 100;
  };

  loadingManager.onLoad = () => {
    const progressContainer = document.getElementById("progress-container");
    progressContainer.style.display = "none";
  };

  const gltfLoader = useMemo(() => {
    const loader = new GLTFLoader(loadingManager);

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
    let src = asset;

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
  }, [asset]);

  const { viewport, camera, scene } = useThree();

  const defCamera = {
    x: 1500,
    y: 550,
    z: 1500,
  };

  camera.position.set(defCamera.x, defCamera.y, defCamera.z);

  camera.updateProjectionMatrix();

  const { set } = useContext(AsciiContext);

  const model = useRef();

  const scroll = useScroll();

  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 5, 1 / 5);
    const r2 = scroll.range(1 / 5, 4 / 5);
    const r3 = scroll.range(2 / 5, 3 / 5);
    const r4 = scroll.range(4 / 5, 1 / 5);
    const r5 = scroll.range(9 / 10, 1 / 10);

    // Break down each rotation component
    const initialRotation = Math.PI;
    const r1Rotation = (Math.PI / 2) * rsqw(r1);
    const r2Rotation = r2 * Math.PI;
    const constantRotation = Math.PI / 2;
    const r3Rotation = r3 * Math.PI * rsqw(r3);

    // Combine all components for the final rotation value
    model.current.rotation.y =
      initialRotation - r1Rotation - r2Rotation - constantRotation - r3Rotation;

    let targetScale = 1 + 0.54 * (1 - rsqw(r1) + r3 * 2); // Adjust this as per your zoom out requirement

    const dampenedScale = MathUtils.damp(
      ref.current.scale.z,
      targetScale,
      4,
      delta,
    );

    ref.current.scale.x = dampenedScale;
    ref.current.scale.y = dampenedScale;
    ref.current.scale.z = dampenedScale;

    set({
      time: r4,
      charactersLimit: DEFAULT.charactersLimit - r5 * 11,
    });
  });

  return (
    <>
      <group ref={ref}>
        <OrbitControls enabled={gui} enableZoom={false} />

        <group ref={model} scale={200}>
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
  console.log("background", background);

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
            <ScrollControls pages={8}>
              <ContextBridge>
                <Scene />
                <Postprocessing />
              </ContextBridge>
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
  characters: " . */^e.m.b.r",
  granularity: 6,
  charactersLimit: 12,
  fontSize: 72,
  fillPixels: false,
  setColor: false,
  color: "#ffffff",
  background: "#000000",
  greyscale: false,
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
